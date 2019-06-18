var queryMap = "https://maps.googleapis.com/maps/api/js?";

var MapLimit = {
  api_key: "AIzaSyDfFFVUbCIclbpQ-QWoduSm8uPzbeNQBBA",
  page: 1,
  method: "callback=initMap",
  // removed the coma after json on line 24. mh
  format: "json"
};

var MAP = $.get(
  {
    url: queryMap + MapLimit,
    method: "GET",
    dataType: "json"
  });

function initMap(Starbucks, Bothell, WA) { //this is just an example. Will remove for name, city, state
  var options = {
    zoom: 8, //highest value is 14
    center: { lat: 42, lng: -70 }//latitude and longitude go here. 
  }
  //creates the map
  var map = new google.maps.Map(document.getElementById('map'), options);
  google.maps.event.addListener(map, 'click',
    function (event) {
      addMarker({name, city, state});
});
//creates the marker
markers = [
  addMarker({name, city, state })
];

for (var i = 0; i < markers.length; i++) { //for every new location given, add a marker
  addMarker([i]);
}

function addMarker(coords) { //coords is whatever variable is used in searchAPI
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  });
}
}