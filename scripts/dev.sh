#!/bin/sh

set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$ROOT_DIR"

if ! command -v docker >/dev/null 2>&1 || ! docker compose version >/dev/null 2>&1; then
  echo "Docker with the Compose plugin is required to run the app." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required to run the frontend." >&2
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Frontend dependencies are missing. Run 'npm install' first." >&2
  exit 1
fi

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example"
fi

cleanup() {
  echo "Stopping backend and database containers..."
  docker compose down
}

trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

echo "Starting PostgreSQL and backend..."
docker compose up --build --wait db backend

echo "Starting frontend at http://localhost:3000"
echo "Backend API: http://localhost:3001"
npm start
