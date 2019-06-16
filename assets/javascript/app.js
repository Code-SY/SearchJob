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