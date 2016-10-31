/**
 * Created by austin on 20/10/2016.
 */

$('#deleteUser').dropdown();

//Host name will have be changed in URL if hosted elsewhere like Heroku
//may be a way to setup relative path

//deletes a user from the dropdown list
function deleteUser(){
  var email =$('#deleteUser').dropdown('get text');
  console.log("user : "+ email);
  $.ajax({
    dataType: 'json',
    url: 'http://localhost:4000/api/users/email/' + email,
    type: 'DELETE',

    success: function (data){
      console.log('Success removed : '+ email);
      console.log(data);
      refreshlist(email)
    },
    error: function(err){
      console.log('fail to remove' + email);
      console.log(err.statusText);
    }
  });
  var del= $.ajax({
    dataType: 'json',
    url: 'http://localhost:4000/api/tweets/email/' + email,
    type: 'DELETE',

    success: function (data){
      console.log('Success removed users tweets : '+ email);
      console.log(data);
    },
    error: function(err){
      console.log('fail');
      //console.log(err.statusText);
    }
  });
  //del.abort();//forcing ajax to abort if no tweets exist

  function refreshlist(email) {
    let $obj = $('.item.userlist');
    for (let i = 0; i < $obj.length; i += 1) {
      console.log('dropdown loop number :' + i);
      if ($obj[i].getAttribute('data-value').localeCompare(email) === 0) {
        $obj[i].remove();
        $('#deleteUser').dropdown('clear');
        break;
      }
    }
  };
}
/**
 * Clears the table data
 */
function clearTable() {
  document.getElementById('tablebody').innerHTML = '';
}
//populates the table with data
function populateTable(tweetList) {
  for (var i = 0; i < tweetList.length; i++) {
    $('.tablebody ').append('<tr><td><b>' + tweetList[i].name + '</b>  </td><td>'
        + tweetList[i].message + '</td><td ><input class=\"delCheck\"  value="'+tweetList[i]._id+'" type=\"checkbox\"><label>Delete</label></div></td></tr>');

    console.log(tweetList[i]._id);
  }
}

//searches for a users tweets by email
function searchUserTweets(){
  var email = $('.search-input').val();
    console.log(email);
    $.ajax({
      dataType: 'json',
      url: 'http://localhost:4000/api/tweets/email/' + email,

      success: function (data) {
        clearTable();
        console.log('success');
        console.log(data);
        populateTable(data);
      },

      error: function (err) {
        console.log('fail');
        console.log(err.statusText);
      },

    });
  };

// delete tweets by id
function delSelectedTweets(){

  var id ;
  id = document.getElementsByClassName('delCheck');
  console.log("id content message "+id);
  console.log("do i get here");

  for (let i = 0; i < id.length; i++) {
      if (id[i].checked) {
        console.log ("should be true "+ id[i].checked);
        console.log("should be an id "+ id[i].value);
        $.ajax({
          dataType: 'json',
          url: 'http://localhost:4000/api/tweets/' + id[i].value,
          type: "DELETE",

          success: function (data) {
            console.log('success');
            console.log(data);

          },

          error: function (err) {
            console.log('fail');
            console.log(err.statusText);
        },
      });
    }
  }

  //find tweets by user id
  var tweetList = [];
  console.log("there should still be id : " + id);
  for (let i = 0; i < id.length; i++) {
    console.log("this should be false " + id[i].checked);
    $.ajax({
      dataType: 'json',
      url: 'http://localhost:4000/api/tweet/' + id[i].value,
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
        //edge case only hits when removing the last tweet
        if (tweetList.length === 0) {
          clearTable();
          populateTable(tweetList);
        }
        console.log(err.statusText);
      }

    });
  }

}

