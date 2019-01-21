# Chat - In progress...
[![laravel version](https://img.shields.io/badge/Laravel-5.7-orange.svg)](https://laravel.com/docs/5.7)
[![vue version](https://img.shields.io/badge/Vue.js-2.5-green.svg)](https://vuejs.org)
[![foundation version](https://img.shields.io/badge/Foundation-6.5-blue.svg)](https://foundation.zurb.com/sites)

I am a junior developer and this is my chat project.
The purpose of this project is to gain practice.

More about me https://piemeram.lv/about

![chat.piemeram.lv](https://raw.githubusercontent.com/narkoze/chat/master/README.png)

## Demo

https://chat.piemeram.lv

## Features

- Authentication [Passport](https://laravel.com/docs/passport)
  - Registration
  - Login
- Route management [Vue Router](https://router.vuejs.org)
- State management [VueX](https://vuex.vuejs.org/)
- Icons [Font Awesome](https://fontawesome.com)
- Vue.js for frontend
- Laravel for backend
- Foundation for style

## Build and Launch

``` bash
# For production ./bin/build.production.sh
# For development
./bin/build.sh

# Laravel
mv .env.example .env
./artisan key:generate

# Database (make sure you have correct DB_ configurations)
./artisan migrate

# Passport
./artisan passport:install
echo PASSPORT_ENDPOINT=\"\${APP_URL}/oauth/token\" >> .env
```

## License
[MIT](http://opensource.org/licenses/MIT)
