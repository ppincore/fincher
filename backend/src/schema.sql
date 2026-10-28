CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  email_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique
  ON users (LOWER(email));

CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  balance NUMERIC(14, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL CHECK (currency IN ('RUB', 'USD', 'EUR', 'JPY', 'CNY', 'BYN')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS accounts_user_id_idx ON accounts (user_id);

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('Expense', 'Income')),
  date_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  description TEXT NOT NULL DEFAULT '',
  amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
  source TEXT,
  fn INTEGER,
  fp INTEGER,
  fd INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS transactions_user_id_date_idx
  ON transactions (user_id, date_time DESC);
CREATE INDEX IF NOT EXISTS transactions_account_id_idx
  ON transactions (account_id);
