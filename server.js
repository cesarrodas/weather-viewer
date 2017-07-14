var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');

var app = express();
const PORT = process.env.PORT || 3000;

app.use(favicon(path.join(__dirname, 'public', 'assets', 'weather_icon.ico')));
app.use(express.static('public'));

app.listen(PORT, function(){
  console.log('Listening on port ' + PORT);
});