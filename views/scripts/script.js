var current_lat;
var current_lon;
var pos;
navigator.geolocation.getCurrentPosition(function(location) {
      current_lat = location.coords.latitude;
      current_lon = location.coords.longitude;
      pos = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
      window.onload = function() {
        //when the document is finished loading, replace everything
        //between the <a ...> </a> tags with the value of splitText
        document.getElementById("mylink").href="geo:"+current_lat+","+current_lon+"?z=19";
      }
    });
