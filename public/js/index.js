$(document).ready(function() {
  var lat;
  var lon;
  var celcius;
  var fahrenheit;
  var img;
  var icon;
  var cityName;
  var country;
  var init = true;

  $.getJSON('https://ipinfo.io', function(location){
    var loc = location.loc.split(",");
    lat = loc[0];
    lon = loc[1];
    cityName = location.city;
    country = location.country;
    //console.log(lat, lon, cityName, country );

    img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=13&size=400x400&sensor=false";
    $("#map").append(img);

  $.getJSON("https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=5ff25fbbab9159e9c404d8172c519d34", function(json){
      console.log('json', json);
      icon = new Image();
       //icon.addClass("icon");
      icon.src = "https://crossorigin.me/http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
      icon.setAttribute("class", "icon");

      $("#location").append("<p class='info'>"+ cityName + ", " + country +"</p>");

      $("#description").append("<p class='info'>" + json.weather[0].main + "</p>");
      $("#description").append(icon);

      // This is the temperature
      celcius = Math.floor(json.main.temp - 273.15);
      fahrenheit = Math.floor(((celcius * 9)/5) + 32);
      toggle();

      // Sets up correct weather
      var background = json.weather[0].description;

      switch(background) {
        case "clear sky":
          $("body").removeClass();
          $("body").addClass("clear");
          break;
        case "few clouds":
          $("body").removeClass();
          $("body").addClass("few");
          break;
        case "scattered clouds":
          $("body").removeClass();
          $("body").addClass("scattered");
          break;
        case "broken clouds":
          $("body").removeClass();
          $("body").addClass("broken");
          break;
        case "shower rain":
          case "light rain":
          $("body").removeClass();
          $("body").addClass("shower");
          break;
        case "rain":
          $("body").removeClass();
          $("body").addClass("rain");
          break;
        case "thunderstorm":
          $("body").removeClass();
          $("body").addClass("thunder");
          break;
        case "snow":
          $("body").removeClass();
          $("body").addClass("snow");
          break;
        case "mist":
          $("body").removeClass();
          $("body").addClass("mist");
          break;
        default:
          $("body").removeClass();
          $("body").addClass("weather");
          break;
      }
    });
  })
  .error(function() { alert("No location Available"); });

  function toggle() {
    if(init){
      $("#temp").html( "<p class='text-center par' id='temp'>Temperature:</p>" +
                       "<p class='info deg'>" + fahrenheit + " &#8457; </p>");
    } else {
      $("#temp").html( "<p class='text-center par' id='temp'>Temperature:</p>" +
                       "<p class='info deg'>" + celcius + " &#8451; </p>");
    }
  }

  $('#temp').on("click", function(){
    console.log("clock");
    init = !init;
    toggle();
  });
});

//https://crossorigin.me/
