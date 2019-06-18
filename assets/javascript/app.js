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




// Map integration point, this handler is attached to
// click event on job posting area.
// Parameter job has all available data for job posting
var showOnMapHandler = function(job) {
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
            "ui-dialog-titlebar-close": "close",
            "ui-dialog-title": "modal-title",
            "ui-dialog-content": "modal-body"
        }
    });

    console.log(job);
}