/**
 * Created by austin on 20/10/2016.
 */

/**
 * Clears the table data
 */
function clearTable() {
  document.getElementById('.tablebody').innerHTML = '';
}

function populateTable(tweetList) {
  for (var i = 0; i < tweetList.length; i++) {
    $('.tablebody ').append('<tr><td><b>' + tweetList[i].name + '</b>  </td><td>'
        + tweetList[i].message + '</td><td class=\"delCheck\" class=\"ui checkbox\"><input name="+_id+" type=\"checkbox\"><label>Delete</label></div></td></tr>');
  }
}

 // $('#search-btn').click(function () {
   // var userName = $('.search-input').val();
function searchUserTweets(){
  var email = $('.search-input').val();
    console.log(email);
    $.ajax({
      dataType: 'json',
      url: 'http://lap-austin:4000/api/tweets/email/' + email,

      success: function (data) {
        console.log('success');
        console.log(data);
        //updateResult(data.length + ' repos');
        populateTable(data);
      },

      error: function (err) {
        console.log('fail');
        console.log(err.statusText);
        //updateResult(userName + ' ' + err.statusText);
      },

    });
  };

function delSelectedTweets(){
  var ids =[];
  ids = $('.delCheck').val();
  console.log(ids);
  console.log("do i get here")
  /*for (let i =0; i < ids.length; i++){
    $.ajax({
      dataType: 'json',
      url: 'http://lap-austin:4000/api/tweet/'+ids[i],
      type : "DELETE",
    })
  }*/
}

