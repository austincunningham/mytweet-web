/**
 * Created by austin on 20/10/2016.
 */


function populateTable(tweetList) {
  for (var i = 0; i < tweetList.length; i++) {
    $('#tweet_table tbody ').append('<tr><td><b>' + tweetList[i].name + '</b>  </td><td>'
        + tweetList[i].message + '</td></tr>');
  }
}

$('#search_btn').click(function () {
  var userName = $('#email').val();
  console.log(userName);
  $.ajax({
    dataType: 'json',
    url: 'http://localhost:4000/api/tweets/email/' + email ,

    success: function (data) {
      console.log('success');
      //updateResult(data.length + ' repos');
      populateTable(data);
    },

    error: function (err) {
      //console.log('fail');
      //console.log(err.statusText);
      updateResult(userName + ' ' + err.statusText);
    },

  });
});


