//Isn't going to be button on click just placeholder

$("button").on("click", function () { 
    var map = $(this).attr("data-map");
    var queryURL = "https://maps.googleapis.com/maps/api/js?" + map 
 + "&api_key=AIzaSyDfFFVUbCIclbpQ-QWoduSm8uPzbeNQBBA&libraries=places";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) { git
        console.log(response);
        var results = response.data;
    });
});

var map;
var service;
var infowindow;

//--this is just an example
function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '500',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}