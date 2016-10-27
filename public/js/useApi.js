/**
 * Created by austin on 20/10/2016.
 */

/**
 * Clears the table data
 */
function clearTable() {
  document.getElementById('tablebody').innerHTML = '';
}

function populateTable(tweetList) {
  for (var i = 0; i < tweetList.length; i++) {
    $('.tablebody ').append('<tr><td><b>' + tweetList[i].name + '</b>  </td><td>'
        + tweetList[i].message + '</td><td ><input class=\"delCheck\"  value="'+tweetList[i]._id+'" type=\"checkbox\"><label>Delete</label></div></td></tr>');

    console.log(tweetList[i]._id);
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
  var id ;
  //id = $('.delCheck:checked').val();
  //id = document.querySelector('.delCheck:checked').value;
  id = document.getElementsByClassName('delCheck');
  //id = $('#checkbox').is('checked');
  console.log("id content message "+id);
  console.log("do i get here")

    for (let i = 0; i < id.length; i++) {
      if (id[i].checked) {
        console.log ("should be true "+ id[i].checked);
        console.log("should be an id "+ id[i].value);
        $.ajax({
          dataType: 'json',
          url: 'http://lap-austin:4000/api/tweets/' + id[i].value,
          type: "DELETE",

          success: function (data) {
            console.log('success');
            console.log(data);

          },

          error: function (err) {
            console.log('fail');
            console.log(err.statusText);
            //updateResult(userName + ' ' + err.statusText);
        },
      });
    }
  }

  //
  var tweetList = [];
  console.log("there should still be id : " + id);
  for (let i = 0; i < id.length; i++) {
    console.log("this should be false " + id[i].checked)
    $.ajax({
      dataType: 'json',
      url: 'http://lap-austin:4000/api/tweet/' + id[i].value,
      type: "GET",

      success(data){
        clearTable();
        tweetList.push(data);
        console.log('success');
        console.log('tweetlist : ' + tweetList);
        populateTable(tweetList);
        console.log(data);
      },
      error: function (err) {
        console.log(err.statusText);
      }

    });
  }

}

