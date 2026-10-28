# Личные финансы: запуск, сборка и размещение

Проект состоит из React frontend, Express backend и PostgreSQL. Для локальной
разработки frontend запускается через npm, а backend и база данных — в Docker.
Production-вариант запускает все три сервиса в Docker Compose.

## Требования

### Локальная разработка

- Node.js 20 или новее и npm
- Docker Engine/Desktop с Docker Compose plugin
- Git, если проект клонируется из репозитория

### Linux-сервер

Рекомендуется Ubuntu Server 22.04/24.04 или Debian 12 x86-64:

- Git
- Docker Engine
- Docker Compose plugin (`docker compose`)
- доступ сервера в интернет для загрузки Docker-образов и отправки SMTP
- доменное имя, направленное на сервер, и открытые порты 80/443 для HTTPS

Node.js/npm и PostgreSQL на сервер отдельно устанавливать не требуется, если
проект запускается через Docker Compose: они находятся в контейнерах.
Node.js/npm нужны на сервере только для разработки frontend вне Docker.

## Локальный запуск

В корне проекта:

```sh
npm ci
cp .env.example .env
```

При необходимости отредактируйте `.env`. Чтобы включить письма, заполните
SMTP-переменные:

```dotenv
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=полный-адрес-ящика@yandex.ru
SMTP_PASS=пароль-приложения-для-SMTP
SMTP_FROM=полный-адрес-ящика@yandex.ru
```

Используйте пароль приложения/SMTP, а не основной пароль аккаунта. Не
публикуйте `.env` и не добавляйте его в Git. Затем запустите весь проект:

```sh
npm run dev:all
```

Frontend будет доступен на <http://localhost:3000>, backend API — на
<http://localhost:3001>. `Ctrl+C` останавливает frontend и backend/DB
контейнеры. Данные PostgreSQL сохраняются в Docker volume `postgres_data`.

Если письма сейчас не нужны, SMTP-переменные можно оставить пустыми: в режиме
разработки ссылки подтверждения и сброса пароля выводятся в логи backend.
Посмотреть логи:

```sh
docker compose logs -f backend
```

## Production-сборка

### Собрать Docker-образы

Создайте файл с production-настройками:

```sh
cp .env.production.example .env.production
```

Заполните в `.env.production` публичный адрес сайта (без `/` в конце),
случайные длинные значения `POSTGRES_PASSWORD` и `JWT_SECRET`, SMTP-настройки
и при публикации в registry — имена образов. Секреты не помещайте в Git.
Случайные значения можно создать так:

```sh
openssl rand -hex 32
```

Собрать frontend и backend:

```sh
docker compose --env-file .env.production -f docker-compose.prod.yml build
```

Или использовать npm-скрипт `npm run build:docker` (он ожидает файл
`.env.production`). Сам frontend без Docker можно собрать командой
`npm run build:prod`; результат появится в `build/`.

Для публикации образов:

```sh
docker login registry.example.com
docker compose --env-file .env.production -f docker-compose.prod.yml push
```

Перед публикацией замените `registry.example.com/your-user/...` на адрес
доступного вам Docker Registry.

## Размещение на Linux-сервере

Ниже — вариант для Ubuntu/Debian, когда сервер сам собирает контейнеры.

### 1. Установить Docker, Compose и Git

Установите пакеты и добавьте официальный репозиторий Docker:

```sh
sudo apt update
sudo apt install -y ca-certificates curl git
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

Эти команды рассчитаны на Ubuntu. Для Debian используйте инструкцию установки
Docker Engine для Debian на <https://docs.docker.com/engine/install/debian/>.
Проверить установку:

```sh
sudo docker --version
sudo docker compose version
```

Можно запускать Docker через `sudo`. Чтобы запускать его без `sudo`, добавьте
пользователя в группу `docker` и заново войдите в систему:

```sh
sudo usermod -aG docker "$USER"
```

Участники группы `docker` фактически имеют права root.

### 2. Получить проект и настроить секреты

```sh
git clone <URL-репозитория> personal-finance
cd personal-finance
cp .env.production.example .env.production
nano .env.production
```

Укажите свои значения как минимум для:

- `PUBLIC_URL=https://ваш-домен`
- `POSTGRES_PASSWORD` — уникальный пароль базы данных
- `JWT_SECRET` — уникальное случайное значение
- `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` — реквизиты Яндекс SMTP
- `SMTP_HOST=smtp.yandex.ru`, `SMTP_PORT=465`, `SMTP_SECURE=true`

`SMTP_USER` и `SMTP_FROM` обычно являются полным адресом Яндекс почты.
Используйте пароль приложения для SMTP. SMTP доступ к серверу должен быть
разрешен сетевой политикой хостинга.

Установите права на файл с секретами:

```sh
chmod 600 .env.production
```

Не добавляйте `.env.production` в Git и не отправляйте его в Docker Registry.

### 3. Собрать и запустить

```sh
sudo docker compose --env-file .env.production \
  -f docker-compose.prod.yml up -d --build
```

Проверить состояние контейнеров и журнал:

```sh
sudo docker compose --env-file .env.production \
  -f docker-compose.prod.yml ps
sudo docker compose --env-file .env.production \
  -f docker-compose.prod.yml logs -f backend
```

Сайт доступен на порту `HTTP_PORT` (по умолчанию `8080`). PostgreSQL и backend
не публикуются на внешние порты; frontend Nginx проксирует `/api` в backend.
Данные базы сохраняются в Docker volume `postgres_data`.

Для публичного сайта настройте HTTPS reverse proxy (например, Caddy или Nginx
с сертификатом Let's Encrypt), проксирующий запросы на `127.0.0.1:8080`.
Откройте в firewall только необходимые порты 80/443 и SSH; не открывайте
PostgreSQL порт 5432 в интернет. После настройки DNS и TLS используйте
`PUBLIC_URL` с `https://`.

### 4. Обновить или остановить

Чтобы получить изменения из Git и пересобрать сервисы:

```sh
git pull
sudo docker compose --env-file .env.production \
  -f docker-compose.prod.yml up -d --build
```

Остановить контейнеры, сохранив данные:

```sh
sudo docker compose --env-file .env.production \
  -f docker-compose.prod.yml down
```

Не используйте `down -v`, если необходимо сохранить базу данных.

## Проверка email-сценариев

Убедитесь, что в локальном `.env` или на сервере в `.env.production` заданы
`SMTP_USER`, `SMTP_PASS` и `SMTP_FROM`, затем перезапустите backend:

```sh
docker compose --env-file .env.production \
  -f docker-compose.prod.yml up -d --force-recreate backend
```

Для проверки регистрации укажите адрес почты, к которой у вас есть доступ,
и проверьте письмо подтверждения. Ссылка должна открыть страницу приложения и
подтвердить адрес. Затем запросите сброс пароля для этой учетной записи,
перейдите по ссылке из письма и задайте новый пароль. Для диагностики ошибок:

```sh
docker compose --env-file .env.production \
  -f docker-compose.prod.yml logs --since=10m backend
```

Если SMTP-переменные не заданы в локальном режиме, backend выводит ссылки в
журнал вместо отправки писем. Для реальной проверки нужен действующий SMTP
пароль приложения; тестовые письма отправляются только на адрес, указанный при
регистрации/сбросе пароля.
