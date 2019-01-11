#!/usr/bin/env bash
cd "$(dirname $0)/.."

./bin/cleanup.sh

composer install --no-dev

php artisan config:cache

yarn install --prod
yarn run prod

cd -
