$(document).ready(function() {
  var lat;
  var lon;
  var celcius;
  var fahrenheit;
  var img;
  var icon;
  var cityName;
  var country;
  var weather;
  var init = true;

  $.getJSON('https://ipinfo.io', function(location){
    var loc = location.loc.split(",");
    lat = loc[0];
    lon = loc[1];
    cityName = location.city;
    country = location.country;

    img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=13&size=400x400&sensor=false&key=AIzaSyCwI4u11z0tUf47aq9JDRZxOa3ukhh5bYE";
    $("#map").append(img);
    weather = String(window.location.href) + "weather/" + cityName;
    console.log("WEATHER LINK: ", weather);
  $.getJSON(weather, function(data){
      console.log('json', data);
      icon = new Image();
      icon.src = "https:" + data.current.condition.icon;
      icon.setAttribute("class", "icon");

      $("#location").append("<p class='info'>"+ cityName + ", " + country +"</p>");

      $("#description").append("<p class='info'>" + data.current.condition.text + "</p>");
      $("#description").append(icon);

      // This is the temperature
      celcius = Math.floor(data.current.temp_c);
      fahrenheit = Math.floor(((celcius * 9)/5) + 32);
      toggle();

      // Sets up correct weather
      var background = data.current.condition.text;

      switch(background) {
        case "Sunny":
        case "Clear":
          $("body").removeClass();
          $("body").addClass("clear");
          break;
        case "Mist":
        case "Fog":
        case "Freezing fog":
          $("body").removeClass();
          $("body").addClass("mist");
          break;
        case "Moderate rain at times":
        case "Moderate rain":
        case "Heavy rain at times":
        case "Heavy rain":
        case "Moderate or heavy freezing rain":
          $("body").removeClass();
          $("body").addClass("rain");
          break;
        case "Overcast":
        case "Partly cloudy":
          $("body").removeClass();
          $("body").addClass("scattered");
          break;
        case "Patchy rain possible":
        case "Patchy freezing drizzle possible":
        case "Patchy light rain":
        case "Light rain":
        case "Light freezing rain":
        case "Patchy heavy rain":
        case "Light rain shower":
        case "Light showers of ice pellets":
          $("body").removeClass();
          $("body").addClass("shower");
          break;
        case "Patchy snow possible":
        case "Patchy sleet possible":
        case "Blowing snow":
        case "Blizzard":
        case "Moderate or heavy sleet":
        case "Patchy light snow":
        case "Light snow":
        case "Patchy moderate snow":
        case "Moderate snow":
        case "Heavy snow":
        case "Ice pellets":
        case "Light sleet showers":
        case "Moderate or heavy sleet showers":
        case "Light snow showers":
        case "Moderate or heavy snow showers":
          $("body").removeClass();
          $("body").addClass("snow");
          break;
        case "Thundery outbreaks possible":
        case "Patchy light rain with thunder":
        case "Moderate or heavy rain with thunder":
        case "Patchy light snow with thunder":
        case "Moderate or heavy snow with thunder":
          $("body").removeClass();
          $("body").addClass("thunder");
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
