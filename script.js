//default values
$("#remove").hide();
$("#searchBar").css("cursor", "pointer");

function getResults() {
  // puts # of results in array
  var count = [];
  // the total # of search results
  var total;
  // pulls search text
  var searchVal = $("#searchBar").val();
  // Wikipedia API
  var apiURL =
    "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
    searchVal +
    "&limit=30&format=json&callback=?";
  // pulls API
  $.getJSON(apiURL, function(data) {
    // resets search results & info with each search
    $("#searchResults").html("");
    $("#searchInfo").html("");
    // loops through API
    for (var i = 0; i < data[1].length; i++) {
      // <li><a (link)><h1 (title)><p (text)>
      $("#searchResults").append(
        "<li><a href=" +
          data[3][i] +
          " target='_blank'><h1>" +
          data[1][i] +
          "</h1><p>" +
          data[2][i] +
          "</p></a></li>"
      );
      // pushes each iteration into an array
      count.push(i);
      // converts array into one total #
      total = count.pop() + 1;
    }

    if (total === undefined) {
      total = 0;
    }
    $("#searchInfo").html(
      "<p>Showing " + total + ' results for "' + searchVal + '"</p>'
    );

    // truncates paragraphs with ellipsis
    $("li p").addClass("ellipsis");
    $(".ellipsis").dotdotdot({
      watch: "window",
      ellipsis: "...",
      wrap: "word",
      fallbackToLetter: true,
      height: 75,
      tolerance: 0
    });
  });
}

$(document).ready(function() {
  // link for "random wiki" button
  $("#random").on("click", function() {
    var randomLink = "https://en.wikipedia.org/wiki/Special:Random";
    window.open(randomLink, "_blank");
  });

  // click "search" icon to expand searchbar
  $("#searchBar").on("click", function() {
    $(this).css("cursor", "auto");
    $("#searchLine").slideUp(200);
    $("#remove").delay(200).show(0);
  });
  // click "x" or document to collapse searchbar
  $("#searchBar").focusout(function() {
    $("#remove").hide();
    $(this).val("").css("cursor", "pointer");
    $("#searchLine").slideDown(500);
  });

  // press enter key to submit search
  $("#submit").on("click", function(e) {
    // prevents <form> from interfering with getting results
    e.preventDefault();

    // hide "Click to Search" text
    $(".staticText").hide();
    // move search bar up
    $("#searchDiv").css({ "margin-top": "10px" });
    $("hr").hide();
    // put "random" button in border box
    $("#randomDiv").css({
      "margin-top": "0px",
      "margin-bottom": "20px",
      border: "5px inset whitesmoke",
      padding: "20px",
      width: "220px"
    });

    getResults();
  });
});
