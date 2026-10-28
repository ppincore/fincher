# Backend приложения «Личные финансы»

API покрывает используемые фронтендом разделы: авторизацию и профиль,
счета, транзакции, поиск и пагинацию. Таблицы PostgreSQL создаются
автоматически при запуске backend.

Полная инструкция по локальному запуску, production-сборке и размещению на
Linux-сервере находится в [корневом README](../README.md).

## Запуск всего проекта

Из корня проекта установите зависимости фронтенда и выполните:

```sh
npm install
npm run dev:all
```

Скрипт поднимет PostgreSQL и backend в Docker, затем запустит frontend на
`http://localhost:3000`. API доступен на `http://localhost:3001`.
Если файла `.env` еще нет, он будет создан из `.env.example`. При завершении
работы frontend (например, по `Ctrl+C`) скрипт остановит контейнеры.
Данные БД сохраняются в Docker volume `postgres_data`.

Можно запускать компоненты отдельно:

```sh
docker compose up --build -d db backend
npm start
```

В `.env.example` задан адрес API `http://localhost:3001`. Backend разрешает
локальные источники webpack dev server на порту 3000.

## Production-сборка и деплой

Подготовьте production-переменные:

```sh
cp .env.production.example .env.production
```

Задайте в `.env.production` публичный адрес сайта без завершающего `/`,
уникальный `POSTGRES_PASSWORD`, случайный `JWT_SECRET` и имена образов в
своем Docker Registry. Секреты не помещайте в Git. Например, секреты можно
сгенерировать командами `openssl rand -hex 32`.

Соберите frontend и backend образы:

```sh
npm run build:docker
```

Для публикации образов авторизуйтесь в Docker Registry и отправьте образы:

```sh
docker login registry.example.com
npm run push:docker
```

На сервере с Docker Compose разместите `docker-compose.prod.yml` и
`.env.production` с теми же именами образов и настройками, затем выполните:

```sh
docker compose --env-file .env.production -f docker-compose.prod.yml pull frontend backend
docker compose --env-file .env.production -f docker-compose.prod.yml up -d
```

Либо передайте исходный код на сервер и выполните там сборку и запуск:

```sh
npm run build:docker
docker compose --env-file .env.production -f docker-compose.prod.yml up -d
```

Сайт слушает порт `HTTP_PORT` (по умолчанию `8080`). Настройте домен и HTTPS
на стороне хостинга или reverse proxy и направьте трафик на этот порт.
Nginx внутри frontend образа передает запросы `/api/...` backend контейнеру;
PostgreSQL и backend не публикуются наружу. Данные БД остаются в volume
`postgres_data`. Для обновления используйте `docker compose ... up -d` с новой
версией образов; не удаляйте volume, если нужно сохранить данные.

## Подтверждение почты и сброс пароля

Для отправки писем задайте SMTP-переменные в `.env` (или в environment вашего
хостинга):

```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yandex.ru
SMTP_PASS=your-yandex-app-password
SMTP_FROM=your-email@yandex.ru
```

Для Яндекс почты обычно подходит SMTP `smtp.yandex.ru` на порту `465` с SSL,
а логин — полный адрес ящика. Пароль должен быть SMTP/приложением паролем,
не основным паролем от аккаунта. Если SMTP-переменные не заданы, backend
останется в безопасном режиме и только логирует ссылки в консоль вместо реальной
отправки.

После регистрации или запроса сброса пароля backend отправит письмо через
Nodemailer, а в случае отсутствия настроек вы увидите ссылку в логах:

```sh
docker compose logs -f backend
```

Задайте собственные пароль БД и `JWT_SECRET` перед публикацией сервиса.
Значения в `docker-compose.yml` предназначены только для локальной разработки.
