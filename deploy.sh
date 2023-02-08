#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

# инициализация репозитория и загрузка в GitHub

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:isavlex-n/catalog-ghp.git master:gh-pages

cd -