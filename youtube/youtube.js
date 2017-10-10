// Searchbar Handler
$(function(){
  var searchField = $("#query");
  var icon = $("#search-btn");

  // Focus Handler
  $(searchField).on('focus', function(){
    $(this).animate({
      width: '100%'
    }, 400);
    $(icon).animate({
      right: '10px'
    }, 400);
  });

  // Blur Event
  $(searchField).on('blur', function(){
    if (searchField.val() == '') {
      $(searchField).animate({
        width:'45%'
      },400, function(){});
      $(icon).animate({
        right:'360p'
      },400,function(){});
  }
});
$('#search-form').submit(function(e){
    e.preventDefault();
  })
});

function search (){
  // Clear Results
  $('#results').html('');
  $('#buttons').html('');

  //Get Form Input
  q = $('#query').val();

  // Run Get Request on API
  $.get(
    'https://www.googleapis.com/youtube/v3/search',{
      part: 'snippet, id',
      q: q,
      type: 'video',
      key: 'AIzaSyAghahzVBFUBnUha93r2oK7QwBnhUuxh2k'},

      function(data) {
        var nextPageToken = data.nextPageToken;
        var previousPageToken = data.previousPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          // Get Ouput
          var output = getOutput(item);

          // Display results
          $('#results').append(output);
        });

        var buttons = getButtons(previousPageToken, nextPageToken);

        // Display Buttons
        $('#buttons').append(buttons);
      }
  )
}

// Next Page Funtion
function nextPage(){
  var token = $('#next-button').data('token');
  var q = $('#next-button').data('query')

  // Clear Results
  $('#results').html('');
  $('#buttons').html('');

  //Get Form Input
  q = $('#query').val();

  // Run Get Request on API
  $.get(
    'https://www.googleapis.com/youtube/v3/search',{
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyAghahzVBFUBnUha93r2oK7QwBnhUuxh2k'},

      function(data) {
        var nextPageToken = data.nextPageToken;
        var previousPageToken = data.previousPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          // Get Ouput
          var output = getOutput(item);

          // Display results
          $('#results').append(output);
        });

        var buttons = getButtons(previousPageToken, nextPageToken);

        // Display Buttons
        $('#buttons').append(buttons);
      }
  )

}

//Previous Page Function
function prevPage(){
  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query')

  // Clear Results
  $('#results').html('');
  $('#buttons').html('');

  //Get Form Input
  q = $('#query').val();

  // Run Get Request on API
  $.get(
    'https://www.googleapis.com/youtube/v3/search',{
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyAghahzVBFUBnUha93r2oK7QwBnhUuxh2k'},

      function(data) {
        var nextPageToken = data.nextPageToken;
        var previousPageToken = data.previousPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          // Get Ouput
          var output = getOutput(item);

          // Display results
          $('#results').append(output);
        });

        var buttons = getButtons(previousPageToken, nextPageToken);

        // Display Buttons
        $('#buttons').append(buttons);
      }
  )

// Build output
function getOutput(item){
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  // Build OutPut String
  var output = '<li>' +
  '<div class="list-left">' +
  '<img src="'+ thumb +'">' +
  '</div>' +
  '<div class="list-right">' +
  '<h3>'+title+'</h3>' +
  '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
  '<p>'+description+'</p>' +
  '</div>' +
  '</li>' +
  '<div class="cleafix"></div>'+
  '';

  return output;
}

// Build the buttons

function getButtons(previousPageToken, nextPageToken){
  if(!previousPageToken) {
    var btnOutput = '<div class="button-container">' +
                    '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
                    'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnOutput = '<div class="button-container">' +
                    '<button id="prev-button" class="paging-button" data-token="'+previousPageToken+'" data-query="'+q+'"' +
                    'onclick="prevPage();"><Previous Page</button></div>' +
                    '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
                    'onclick="nextPage();"><Next Page</button></div>';
  };


  return btnOutput;

}
}
