//Isn't going to be button on click just placeholder

$("button").on("click", function () { 
    var queryURL = "https://maps.googleapis.com/maps/api/js?" + map 
 + "&api_key=AIzaSyDfFFVUbCIclbpQ-QWoduSm8uPzbeNQBBA&callback=initMap";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) { 
        console.log(response);
        var results = response.data;
    });
});

function initMap() {
  var options = {
    zoom: 8, //highest value is 14
    center: {lat: ,lng:- }//latitude and longitude go here. 
  }
  //creates the map
  var map = new google.maps.Map(document.getElementById('map'), options);
  //create the marker
  var marker = new google.maps.Marker({
    position: {lat: ,lng:- }
    map: map,
    image: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  });
var infoWindow = new google.maps.InfoWindow({
    content: '<h1></h1>'
});
}
