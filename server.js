require('dotenv').config();
var express = require('express');
var router = express.Router();
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var path = require('path');
var axios = require('axios');
var weatherKey = process.env.WEATHER;

var app = express();
const PORT = process.env.PORT || 3000;

app.use(favicon(path.join(__dirname, 'public', 'assets', 'weather', 'weather_icon.ico')));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, function(){
  console.log('Listening on port ' + PORT);
});

router.route('/weather/:city')
  .get(function(req, res) {
    var url = "https://api.apixu.com/v1/current.json?key=" + weatherKey + "&q=" + req.params.city;
    axios.get(url)
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        res.send({ error: "Failed to retrieve weather.", data: error });
      });
  });

router.route('*')
  .get(function (req, res) {
    res.redirect('/');
  });
