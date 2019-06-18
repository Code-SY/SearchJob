console.log("I see you")
// app.js
$(document).ready(function () {
  $("#search").click(function (evt) {
      evt.preventDefault();

      var searchTerms = $("#searchTerms").val();

      var criteria = {
          keywords: searchTerms,
          location: ""
      };

      searchJobs(criteria, showOnMapHandler);
  });
});

// Map integration point, this handler is attached to
// click event on job posting area.
// Parameter job has all available data for job posting
var showOnMapHandler = function(job) {
  $(".job-selected").removeClass("job-selected");

  $(this).addClass("job-selected");
  $("#job-description").html(job.description);

  console.log(job);
}
// searchAPI js file
//***********Added the searchAPI.js to index.html */
// Moved to app.js
//$(document).ready(function () {
//    $("#search").click(function () {
//        searchJobs(criteria, clickHandler);
//    });
//});
//var criteria = {
//    keywords: "javascript, php, ruby",
//    location: ""
//}
// *************Why the name containerID?
var containerId = "#search-results";
console.log(containerId);

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



// map.js file
//<script src="searchAPI.js"></script>

var queryMap = "https://maps.googleapis.com/maps/api/js?";

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


var MapLimit = {
  api_key: "AIzaSyDfFFVUbCIclbpQ-QWoduSm8uPzbeNQBBA",
  page: 1,
  method: "callback=initMap",
  // removed the coma after json
  format: "json"
};

var MAP = $.get(
  {
    url: queryMap + MapLimit,
    method: "GET",
    dataType: "json"
  });

function initMap(Starbucks, Bothell, WA) {
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