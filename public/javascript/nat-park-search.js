var searchParkEl = $("#park-search");


function dashboardAndParkSearch(searchInput) {
    location.replace(`/dashboard?parkname=${searchInput}`)
}

// begin national park name search on button click
$("#search-btn").click(function (event) {
    event.preventDefault()
    var searchInput = searchParkEl.val();
    dashboardAndParkSearch(searchInput)
    // parkSearch(searchInput);
});
