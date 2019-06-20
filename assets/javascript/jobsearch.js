
// app.js
$(document).ready(function () {
  $("#searchBtn").click(function (evt) {
    evt.preventDefault();

    var searchTerms = $("#searchTerms").val();
    var searchLocation = $("#searchLocation").val();

    var criteria = {
      keywords: searchTerms,
      location: searchLocation
    };

    searchJobs(criteria, showOnMapHandler);
  });
});

/*
var marker = new google.maps.Marker({
  position: { lat: 44, lng: -122 },
  map: map,
  title: "hello world",

});


marker.addListener('click', function () {
  infowindow.open(map, marker);
});
*/
// Map integration point, this handler is attached to
// click event on job posting area.
// Parameter job has all available data for job posting
var showOnMapHandler = function (job) {
  $(".job-selected").removeClass("job-selected");

  $(this).addClass("job-selected");
  $("#job-description").html(job.description);
  $("#job-description").dialog({
    title: job.title,
    width: 600,
    height: 500,
    closeOnEscape: true,
    resizable: true,
    classes: {
      "ui-dialog": "modal-content",
      "ui-dialog-titlebar": "modal-header",
      "ui-dialog-title": "modal-title",
      "ui-dialog-content": "modal-body"
    }
  });

  console.log(job);
}
// searchAPI js file

var containerId = "#search-results";
var searchJobs = function (searchCriteria, clickHandler) {
  // Validate input
  if (searchCriteria.keywords === "") {
    return false;
  }

  $(containerId).empty();
  $("#job-description").empty();


  $(containerId).append($("#searchingTemplate").clone());

  var apiUri = "https://authenticjobs.com/api/?";

  var apiDefaultParams = {
    api_key: "bb8a31ba26b539d961b7737f24ea371c",
    page: 1,
    method: "aj.jobs.search",
    perpage: 20,
    format: "json",
    //category: 4, // Front End Development
  };

  var apiParams = mergeObjects(apiDefaultParams, searchCriteria);

  var apiQuery = $.param(apiParams);

  var response = $.get(
    {
      url: apiUri + apiQuery,
      method: "GET",
      dataType: "jsonp"
    });

  response.done(function (response) {
    var searchResult = response;

    var jobs = [];

    for (var i = 0; i < searchResult.listings.listing.length; i++) {
      var searchItem = searchResult.listings.listing[i];

      var locationTemp = searchItem.company.location;
      console.log(locationTemp);
      var location = "Unknown";

      if (locationTemp) {
        location = locationTemp.name;

        location = location.replace(/(",")|(", ")/gm, " or ");
        location = location.split(" or ")[0];
        location = location.replace(/"/gm, "");
      }

      var job = {
        id: searchItem.id,
        title: searchItem.title,
        description: searchItem.description,
        postDate: searchItem.post_date,
        type: searchItem.type.name,
        location: location,
        company: {
          name: searchItem.company.name,
          logoUrl: searchItem.company.logo
        }
      };

      jobs.push(job);
    }

    var containerRef = $(containerId);
    containerRef.empty();

    if (jobs.length > 0) {
      for (var i = 0; i < jobs.length; i++) {
        var job = jobs[i];

        var jobRef = $("<div class='card'>");
        var jobBodyRef = $("<div class='card-body'>");
        jobRef.append(jobBodyRef);

        jobBodyRef.append($("<h5 class='card-title' style='font-weight:bold;'>" + job.title + "</h5>"));
        jobBodyRef.append($("<div style='font-size:0.8em;font-style:italic;'>" + job.type + "</div>"));
        jobBodyRef.append($("<div style='font-weight:bold;'>" + job.company.name + "</div>"));
        jobBodyRef.append($("<div style='font-style:italic;'>" + job.location + "</div>"));
        jobBodyRef.append($("<div style='font-size:0.5em;font-style:italic;'>" + job.postDate + "</div>"));

        jobRef.click(clickHandler.bind(jobRef, job));

        containerRef.append(jobRef);
      };
    }
    else {
      $(containerId).append($("#noResultsTemplate").clone());
    }

  });

  response.fail(function (req, status, error) {
    var containerRef = $(containerId);
    containerRef.empty();

    $(containerId).append($("#errorTemplate").clone());
  });

  return true;
}

var clickHandler = function (job) {
  $(".job-selected").removeClass("job-selected");

  $(this).addClass("job-selected");
  $("#job-description").html(job.description);
}

function mergeObjects(obj1, obj2) {
  var result = {};

  for (var attrName in obj1) {
    result[attrName] = obj1[attrName];
  }
  for (var attrName in obj2) {
    result[attrName] = obj2[attrName];
  }

  return result;
}
//end searchAPI file//

//=========== map.js file==============================================
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

var geocoder;
var map;
var marker, i;
var markers = [];

function initateGeo() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(39.0119, 98.4842);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == 'OK') {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      alert(latitude);
      alert(longitude);
    }
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

$(("<div class='card-body'>")).on("click", function () {
  console.log(containerRef.splice(0, 2));
  for (i = 0; i < containerRef.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(containerRef[i][1], containerRef[i][2]),
      map: map,
      icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    });

    markers.push(marker);

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infowindow.setContent(containerRef[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

})

function initMap() {
  var options = {
    zoom: 3, //highest value is 14
    center: { lat: 39.0119, lng: 98.4842 }//latitude and longitude go here. 
  }
  //creates the map
  map = new google.maps.Map(document.getElementById('map'), options);
}
