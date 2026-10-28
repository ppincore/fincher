/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');
const express = require('express');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');

const PORT = Number(process.env.PORT || 3001);
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production');
}
const JWT_SECRET = process.env.JWT_SECRET || 'local-development-secret';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.yandex.ru';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = process.env.SMTP_SECURE !== 'false';
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'no-reply@example.com';
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.PGHOST || 'localhost',
      port: Number(process.env.PGPORT || 5432),
      database: process.env.PGDATABASE || 'finance',
      user: process.env.PGUSER || 'finance',
      password: process.env.PGPASSWORD || 'finance_dev_password',
    });
const app = express();

const transporter = SMTP_USER && SMTP_PASS
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

async function sendEmail({ to, subject, text, html }) {
  if (!transporter || !to) {
    console.info(`Email skipped: ${subject} -> ${to || 'no-recipient'}`);
    if (text) {
      console.info(text);
    }
    return false;
  }

  try {
    await transporter.sendMail({
      from: SMTP_FROM,
      to,
      subject,
      text,
      html,
    });
    return true;
  } catch (error) {
    console.error(`Email sending failed for ${to}:`, error.message);
    throw error;
  }
}

app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));
app.use((req, res, next) => {
  const origin = req.get('origin');
  if (origin && allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Vary', 'Origin');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  return next();
});

function sendError(res, status, message) {
  return res.status(status).json({ message });
}

function signToken(payload, expiresInSeconds = 7 * 24 * 60 * 60) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    .toString('base64url');
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + expiresInSeconds }),
  ).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  const [header, body, signature] = token.split('.');
  if (!header || !body || !signature) {
    throw new Error('Invalid token');
  }
  const expected = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest();
  const actual = Buffer.from(signature, 'base64url');
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
    throw new Error('Invalid token');
  }
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  if (typeof payload.exp !== 'number' || payload.exp <= Date.now() / 1000) {
    throw new Error('Expired token');
  }
  return payload;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function isPasswordValid(password, storedHash) {
  const [salt, expectedHex] = storedHash.split(':');
  if (!salt || !expectedHex) {
    return false;
  }
  const actual = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, 'hex');
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

function requireAuth(req, res, next) {
  const authorization = req.get('authorization') || '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return sendError(res, 401, 'Authentication required');
  }
  try {
    const payload = verifyToken(match[1]);
    if (payload.scope || typeof payload.id !== 'string') {
      return sendError(res, 401, 'Invalid access token');
    }
    req.userId = payload.id;
    return next();
  } catch {
    return sendError(res, 401, 'Invalid or expired access token');
  }
}

function parseAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 && /^\d+(\.\d{1,2})?$/.test(String(value))
    ? amount.toFixed(2)
    : null;
}

function parseOptionalInteger(value) {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
}

function toProfile(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    created_at: Math.floor(new Date(user.created_at).getTime() / 1000),
  };
}

function createAccessToken(user) {
  return signToken(toProfile(user));
}

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function getPagination(query, defaultPageSize = 10) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, Number.parseInt(query.pageSize, 10) || defaultPageSize),
  );
  return { page, pageSize, offset: (page - 1) * pageSize };
}

function serializeAccount(row) {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    balance: String(row.balance),
    currency: row.currency,
  };
}

function serializeTransaction(row) {
  const result = {
    id: row.id,
    transactionType: row.transaction_type,
    dateTime: row.date_time,
    description: row.description,
    amount: String(row.amount),
    accountId: row.account_id,
  };
  if (row.source !== null) result.source = row.source;
  if (row.fn !== null) result.fn = row.fn;
  if (row.fp !== null) result.fp = row.fp;
  if (row.fd !== null) result.fd = row.fd;
  if (row.account_name) {
    result.account = {
      id: row.account_id,
      userId: row.user_id,
      name: row.account_name,
      balance: String(row.account_balance),
      currency: row.account_currency,
    };
  }
  return result;
}

const transactionSelect = `
  SELECT t.*, a.name AS account_name, a.balance AS account_balance,
         a.currency AS account_currency
  FROM transactions t
  JOIN accounts a ON a.id = t.account_id
`;

function transactionDelta(type, amount) {
  return type === 'Income' ? Number(amount) : -Number(amount);
}

async function updateAccountBalance(client, accountId, delta) {
  await client.query(
    'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
    [delta.toFixed(2), accountId],
  );
}

app.get('/health', asyncRoute(async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ status: 'ok' });
}));

app.post('/auth/signup', asyncRoute(async (req, res) => {
  const { email, password, username } = req.body || {};
  if (
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof password !== 'string' ||
    password.length < 8 ||
    typeof username !== 'string' ||
    !username.trim()
  ) {
    return sendError(res, 400, 'Valid email, username, and password (at least 8 characters) are required');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const userId = crypto.randomUUID();
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (id, email, username, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, username, created_at`,
      [userId, normalizedEmail, username.trim(), hashPassword(password)],
    );
    const confirmationToken = signToken(
      { id: userId, scope: 'email-confirm' },
      24 * 60 * 60,
    );
    const confirmUrl = `${FRONTEND_URL}/email-confirm?token=${confirmationToken}`;
    await sendEmail({
      to: rows[0].email,
      subject: 'Подтверждение email для личных финансов',
      text: `Для подтверждения email перейдите по ссылке: ${confirmUrl}`,
      html: `<p>Для подтверждения email перейдите по ссылке:</p><p><a href="${confirmUrl}">${confirmUrl}</a></p>`,
    });
    return res.status(201).json({ email: rows[0].email });
  } catch (error) {
    if (error.code === '23505') {
      return sendError(res, 409, 'An account with this email already exists');
    }
    throw error;
  }
}));

app.post('/auth/login', asyncRoute(async (req, res) => {
  const { email, password } = req.body || {};
  if (typeof email !== 'string' || typeof password !== 'string') {
    return sendError(res, 400, 'Email and password are required');
  }
  const { rows } = await pool.query(
    `SELECT id, email, username, password_hash, created_at
     FROM users WHERE LOWER(email) = LOWER($1)`,
    [email.trim()],
  );
  const user = rows[0];
  if (!user || !isPasswordValid(password, user.password_hash)) {
    return sendError(res, 401, 'Incorrect email or password');
  }
  return res.json({ accessToken: createAccessToken(user), profile: toProfile(user) });
}));

app.post('/auth/email-confirm', asyncRoute(async (req, res) => {
  const token = req.body?.token;
  if (typeof token !== 'string') {
    return sendError(res, 400, 'Confirmation token is required');
  }
  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    return sendError(res, 400, 'Invalid or expired confirmation token');
  }
  if (payload.scope !== 'email-confirm' || typeof payload.id !== 'string') {
    return sendError(res, 400, 'Invalid confirmation token');
  }
  const result = await pool.query('UPDATE users SET email_confirmed = TRUE WHERE id = $1', [payload.id]);
  if (!result.rowCount) {
    return sendError(res, 404, 'User not found');
  }
  return res.sendStatus(204);
}));

app.post('/auth/password-reset', asyncRoute(async (req, res) => {
  const email = req.body?.email;
  if (typeof email !== 'string') {
    return sendError(res, 400, 'Email is required');
  }
  const { rows } = await pool.query(
    'SELECT id, email FROM users WHERE LOWER(email) = LOWER($1)',
    [email.trim()],
  );
  if (rows[0]) {
    const token = signToken({ id: rows[0].id, scope: 'password-reset' }, 60 * 60);
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${token}`;
    await sendEmail({
      to: rows[0].email,
      subject: 'Сброс пароля для личных финансов',
      text: `Для сброса пароля перейдите по ссылке: ${resetUrl}`,
      html: `<p>Для сброса пароля перейдите по ссылке:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });
  }
  return res.sendStatus(204);
}));

app.post('/auth/password-reset-confirm', asyncRoute(async (req, res) => {
  const { token, password } = req.body || {};
  if (typeof token !== 'string' || typeof password !== 'string' || password.length < 8) {
    return sendError(res, 400, 'A reset token and password of at least 8 characters are required');
  }
  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    return sendError(res, 400, 'Invalid or expired reset token');
  }
  if (payload.scope !== 'password-reset' || typeof payload.id !== 'string') {
    return sendError(res, 400, 'Invalid reset token');
  }
  const result = await pool.query(
    'UPDATE users SET password_hash = $1 WHERE id = $2',
    [hashPassword(password), payload.id],
  );
  if (!result.rowCount) {
    return sendError(res, 404, 'User not found');
  }
  return res.sendStatus(204);
}));

app.use(requireAuth);

app.get('/users/:id', asyncRoute(async (req, res) => {
  if (req.params.id !== req.userId) {
    return sendError(res, 404, 'User not found');
  }
  const { rows } = await pool.query(
    'SELECT id, email, username, created_at FROM users WHERE id = $1',
    [req.userId],
  );
  if (!rows[0]) return sendError(res, 404, 'User not found');
  return res.json(toProfile(rows[0]));
}));

app.post('/accounts', asyncRoute(async (req, res) => {
  const { name, balance, currency } = req.body || {};
  const parsedBalance = parseAmount(balance);
  if (
    typeof name !== 'string' ||
    !name.trim() ||
    parsedBalance === null ||
    !['RUB', 'USD', 'EUR', 'JPY', 'CNY', 'BYN'].includes(currency)
  ) {
    return sendError(res, 400, 'Name, non-negative balance, and valid currency are required');
  }
  const { rows } = await pool.query(
    `INSERT INTO accounts (id, user_id, name, balance, currency)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [crypto.randomUUID(), req.userId, name.trim(), parsedBalance, currency],
  );
  return res.status(201).json(serializeAccount(rows[0]));
}));

app.get('/accounts/search', asyncRoute(async (req, res) => {
  const { page, pageSize, offset } = getPagination(req.query, 100);
  const values = [req.userId];
  const conditions = ['user_id = $1'];
  for (const key of ['name', 'currency']) {
    if (typeof req.query[key] === 'string' && req.query[key]) {
      values.push(key === 'name' ? `%${req.query[key]}%` : req.query[key]);
      conditions.push(`${key} ${key === 'name' ? 'ILIKE' : '='} $${values.length}`);
    }
  }
  const ids = req.query.ids;
  if (ids) {
    const idList = (Array.isArray(ids) ? ids : String(ids).split(',')).filter(Boolean);
    if (idList.length) {
      values.push(idList);
      conditions.push(`id = ANY($${values.length}::uuid[])`);
    }
  }
  const where = conditions.join(' AND ');
  const countResult = await pool.query(`SELECT COUNT(*) FROM accounts WHERE ${where}`, values);
  const sortColumns = { name: 'name', balance: 'balance', currency: 'currency' };
  const sortBy = sortColumns[req.query.sortBy] || 'created_at';
  const sort = String(req.query.sort).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  const listValues = [...values, pageSize, offset];
  const { rows } = await pool.query(
    `SELECT * FROM accounts WHERE ${where}
     ORDER BY ${sortBy} ${sort}, id ASC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    listValues,
  );
  const totalCount = Number(countResult.rows[0].count);
  return res.json({
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
    items: rows.map(serializeAccount),
  });
}));

app.get('/accounts/:id', asyncRoute(async (req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM accounts WHERE id = $1 AND user_id = $2',
    [req.params.id, req.userId],
  );
  if (!rows[0]) return sendError(res, 404, 'Account not found');
  return res.json(serializeAccount(rows[0]));
}));

app.put('/accounts/:id', asyncRoute(async (req, res) => {
  const { name, balance, currency } = req.body || {};
  const parsedBalance = parseAmount(balance);
  if (
    typeof name !== 'string' ||
    !name.trim() ||
    parsedBalance === null ||
    !['RUB', 'USD', 'EUR', 'JPY', 'CNY', 'BYN'].includes(currency)
  ) {
    return sendError(res, 400, 'Name, non-negative balance, and valid currency are required');
  }
  const { rows } = await pool.query(
    `UPDATE accounts SET name = $1, balance = $2, currency = $3
     WHERE id = $4 AND user_id = $5 RETURNING *`,
    [name.trim(), parsedBalance, currency, req.params.id, req.userId],
  );
  if (!rows[0]) return sendError(res, 404, 'Account not found');
  return res.json(serializeAccount(rows[0]));
}));

app.delete('/accounts/:id', asyncRoute(async (req, res) => {
  const result = await pool.query(
    'DELETE FROM accounts WHERE id = $1 AND user_id = $2',
    [req.params.id, req.userId],
  );
  if (!result.rowCount) return sendError(res, 404, 'Account not found');
  return res.sendStatus(204);
}));

app.post('/transactions', asyncRoute(async (req, res) => {
  const body = req.body || {};
  const amount = parseAmount(body.amount);
  const fn = parseOptionalInteger(body.fn);
  const fp = parseOptionalInteger(body.fp);
  const fd = parseOptionalInteger(body.fd);
  if (
    !['Expense', 'Income'].includes(body.transactionType) ||
    amount === null ||
    Number(amount) <= 0 ||
    typeof body.accountId !== 'string' ||
    !body.accountId ||
    fn === undefined ||
    fp === undefined ||
    fd === undefined ||
    (body.transactionType === 'Income' &&
      (typeof body.source !== 'string' || !body.source.trim()))
  ) {
    return sendError(res, 400, 'Valid transaction type, amount, account, and transaction details are required');
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const accountResult = await client.query(
      'SELECT id FROM accounts WHERE id = $1 AND user_id = $2 FOR UPDATE',
      [body.accountId, req.userId],
    );
    if (!accountResult.rowCount) {
      await client.query('ROLLBACK');
      return sendError(res, 404, 'Account not found');
    }
    const dateTime = body.dateTime ? new Date(body.dateTime) : new Date();
    if (Number.isNaN(dateTime.getTime())) {
      await client.query('ROLLBACK');
      return sendError(res, 400, 'Invalid transaction date');
    }
    const { rows } = await client.query(
      `INSERT INTO transactions
       (id, user_id, account_id, transaction_type, date_time, description, amount, source, fn, fp, fd)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        crypto.randomUUID(),
        req.userId,
        body.accountId,
        body.transactionType,
        dateTime,
        typeof body.description === 'string' ? body.description : '',
        amount,
        typeof body.source === 'string' ? body.source : null,
        fn,
        fp,
        fd,
      ],
    );
    await updateAccountBalance(client, body.accountId, transactionDelta(body.transactionType, amount));
    await client.query('COMMIT');
    const fullResult = await pool.query(`${transactionSelect} WHERE t.id = $1`, [rows[0].id]);
    return res.status(201).json(serializeTransaction(fullResult.rows[0]));
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}));

app.get('/transactions/search', asyncRoute(async (req, res) => {
  const { page, pageSize, offset } = getPagination(req.query);
  const values = [req.userId];
  const conditions = ['t.user_id = $1'];
  if (['Expense', 'Income'].includes(req.query.transactionType)) {
    values.push(req.query.transactionType);
    conditions.push(`t.transaction_type = $${values.length}`);
  }
  if (typeof req.query.accountId === 'string' && req.query.accountId) {
    values.push(req.query.accountId);
    conditions.push(`t.account_id = $${values.length}`);
  }
  if (typeof req.query.dateTime === 'string' && req.query.dateTime) {
    const date = new Date(req.query.dateTime);
    if (!Number.isNaN(date.getTime())) {
      values.push(date);
      conditions.push(`t.date_time >= $${values.length}`);
    }
  }
  const where = conditions.join(' AND ');
  const countResult = await pool.query(
    `SELECT COUNT(*) FROM transactions t WHERE ${where}`,
    values,
  );
  const sortColumns = {
    transactionType: 't.transaction_type',
    dateTime: 't.date_time',
    amount: 't.amount',
    accountId: 't.account_id',
    createdAt: 't.created_at',
  };
  const sortBy = sortColumns[req.query.sortBy] || 't.date_time';
  const sort = String(req.query.sort).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  const { rows } = await pool.query(
    `${transactionSelect} WHERE ${where}
     ORDER BY ${sortBy} ${sort}, t.id ASC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
    [...values, pageSize, offset],
  );
  const totalCount = Number(countResult.rows[0].count);
  return res.json({
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
    items: rows.map(serializeTransaction),
  });
}));

app.get('/transactions/:id', asyncRoute(async (req, res) => {
  const { rows } = await pool.query(
    `${transactionSelect} WHERE t.id = $1 AND t.user_id = $2`,
    [req.params.id, req.userId],
  );
  if (!rows[0]) return sendError(res, 404, 'Transaction not found');
  return res.json(serializeTransaction(rows[0]));
}));

app.put('/transactions/:id', asyncRoute(async (req, res) => {
  const body = req.body || {};
  const amount = parseAmount(body.amount);
  const fn = parseOptionalInteger(body.fn);
  const fp = parseOptionalInteger(body.fp);
  const fd = parseOptionalInteger(body.fd);
  if (
    !['Expense', 'Income'].includes(body.transactionType) ||
    amount === null ||
    Number(amount) <= 0 ||
    typeof body.accountId !== 'string' ||
    !body.accountId ||
    fn === undefined ||
    fp === undefined ||
    fd === undefined ||
    (body.transactionType === 'Income' &&
      (typeof body.source !== 'string' || !body.source.trim()))
  ) {
    return sendError(res, 400, 'Valid transaction type, amount, account, and transaction details are required');
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const previousResult = await client.query(
      'SELECT * FROM transactions WHERE id = $1 AND user_id = $2 FOR UPDATE',
      [req.params.id, req.userId],
    );
    const previous = previousResult.rows[0];
    if (!previous) {
      await client.query('ROLLBACK');
      return sendError(res, 404, 'Transaction not found');
    }
    const lockedAccounts = await client.query(
      `SELECT id FROM accounts
       WHERE id = ANY($1::uuid[]) AND user_id = $2
       ORDER BY id FOR UPDATE`,
      [[...new Set([previous.account_id, body.accountId])], req.userId],
    );
    if (!lockedAccounts.rows.some((account) => account.id === body.accountId)) {
      await client.query('ROLLBACK');
      return sendError(res, 404, 'Account not found');
    }
    const dateTime = body.dateTime ? new Date(body.dateTime) : new Date();
    if (Number.isNaN(dateTime.getTime())) {
      await client.query('ROLLBACK');
      return sendError(res, 400, 'Invalid transaction date');
    }
    const { rows } = await client.query(
      `UPDATE transactions
       SET account_id = $1, transaction_type = $2, date_time = $3, description = $4,
           amount = $5, source = $6, fn = $7, fp = $8, fd = $9
       WHERE id = $10 RETURNING *`,
      [
        body.accountId,
        body.transactionType,
        dateTime,
        typeof body.description === 'string' ? body.description : '',
        amount,
        typeof body.source === 'string' ? body.source : null,
        fn,
        fp,
        fd,
        req.params.id,
      ],
    );
    await updateAccountBalance(
      client,
      previous.account_id,
      -transactionDelta(previous.transaction_type, previous.amount),
    );
    await updateAccountBalance(
      client,
      body.accountId,
      transactionDelta(body.transactionType, amount),
    );
    await client.query('COMMIT');
    const fullResult = await pool.query(`${transactionSelect} WHERE t.id = $1`, [rows[0].id]);
    return res.json(serializeTransaction(fullResult.rows[0]));
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}));

app.delete('/transactions/:id', asyncRoute(async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows } = await client.query(
      'DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.userId],
    );
    if (!rows[0]) {
      await client.query('ROLLBACK');
      return sendError(res, 404, 'Transaction not found');
    }
    await updateAccountBalance(
      client,
      rows[0].account_id,
      -transactionDelta(rows[0].transaction_type, rows[0].amount),
    );
    await client.query('COMMIT');
    return res.sendStatus(204);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}));

app.use((req, res) => sendError(res, 404, `Route not found: ${req.method} ${req.path}`));
app.use((error, _req, res, _next) => {
  console.error(error);
  if (error.type === 'entity.parse.failed') {
    return sendError(res, 400, 'Invalid JSON body');
  }
  if (['22P02', '23503', '23514'].includes(error.code)) {
    return sendError(res, 400, 'Invalid request data');
  }
  return sendError(res, 500, 'Internal server error');
});

async function start() {
  const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8');
  await pool.query(schema);
  app.listen(PORT, '0.0.0.0', () => {
    console.info(`Finance API listening on port ${PORT}`);
  });
}

start().catch((error) => {
  console.error('Could not start the Finance API', error);
  process.exitCode = 1;
});

process.on('SIGTERM', async () => {
  await pool.end();
  process.exit(0);
});
