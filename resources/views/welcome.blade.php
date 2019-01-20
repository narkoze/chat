<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Chat</title>

    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
  </head>
  <body>
    <Chat id="Chat"></Chat>
    <script src="{{ mix('js/app.js') }}"></script>
  </body>
</html>
