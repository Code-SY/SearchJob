<script src="searchAPI.js"></script>

var queryMap = "https://maps.googleapis.com/maps/api/js?";
<<<<<<< HEAD
$("button").on("click", function () { 
    var map = $(this).attr("data-map");
    var queryURL = "https://maps.googleapis.com/maps/api/js?" + map 
+ "&api_key=AIzaSyDfFFVUbCIclbpQ-QWoduSm8uPzbeNQBBA&libraries=places";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) { 
        console.log(response);
        var results = response.data;
    });
});
=======
>>>>>>> 88dc6a08df25956eae5d78d2f664a4f72b404d7e

var MapLimit = {
  api_key: "AIzaSyDfFFVUbCIclbpQ-QWoduSm8uPzbeNQBBA",
  page: 1,
  method: "callback=initMap",
  format: "json",
};

var MAP = $.get(
  {
    url: queryMap + MapLimit,
    method: "GET",
    dataType: "jsonp"
  });

function initMap() {
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
  //create the marker
  /*
  var marker = new google.maps.Marker({
    position: { lat: , lng: - },
    map: map,
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  });
  var infoWindow = new google.maps.InfoWindow({
    content: '<h1></h1>'
  });
  marker.addListener('click', function () {
    infoWindow.open(map, marker);
  });
  */

markers = [
  addMarker({ name, city, state })
];

for (var i = 0; i < markers.length; i++) {
  addMarker([i]);
}

function addMarker(coords) {
  var marker = new google.maps.Marker({
    position: props.coords,
    map: map,
    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  });
}
}