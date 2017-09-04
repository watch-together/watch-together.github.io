var loading = '<div class="loading"><div class="lds-css ng-scope">';
loading += '<div style="width:100%;height:100%" class="lds-ball">';
loading += "<div></div>";
loading += "</div></div>";

function generateResultRow(item) {
  var img = item.img;
  var id = item.id;
  var name = item.name;

  var html = "<div class='result-row' data-id='" + id + "'>";
  html += "<img src='" + img + "'>";
  html += "<div>";
  html += "<h4>" + name + "</h4>";
  html += "";
  html += "</div>";
  html += "</div>";
  return html;
}

function restrucSearchResult(array) {
  return array.map(function(item, index) {
    return {
      img: item.snippet.thumbnails.medium.url,
      id: item.id.videoId,
      name: item.snippet.title
    };
  });
}

function loadYT(id) {
  $("#youtube-container").html(
    '<iframe width="480" height="270" src="https://www.youtube.com/embed/' +
      id +
      '?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;enablejsapi=1&amp;origin=http://www.youtube.com" frameborder="0" allowfullscreen></iframe>'
  );
  //   var url =
  //     "http://www.youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v" +
  //     id;
  //   var player = "<audio controls autoplay>";
  //   player += '<source src="' + url + '" type="audio/mpeg">';
  //   player += "Your browser does not support the audio element.";
  //   player += "</audio>";
  //   $("#youtube-container").html(player);
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

var roomId = getQueryVariable("room");
if (!!roomId) {
  $("#room-title").text("Room: " + roomId);
}

$("form").submit(function(e) {
  e.preventDefault();
  $("#search-result").html(loading);
  var keyword = $("#search").val();
  var url =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" +
    keyword +
    "&key=AIzaSyBi9HPXMwr_6aqeEvsWfOGV3lEivJCBzTE";
  $.get(url, function(data) {
    $("#search-result").empty();
    console.log(data);
    var listResult = restrucSearchResult(data.items);
    listResult.forEach(function(item) {
      $("#search-result").append(generateResultRow(item));
    });
  });
});

$(document).on("click", ".result-row", function() {
  var id = $(this).data("id");

  loadYT(id);
});
