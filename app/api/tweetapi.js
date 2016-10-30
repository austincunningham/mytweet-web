/**
 * Created by austin on 19/10/2016.
 */
'use strict';

const Tweet = require('../models/tweet');
const User = require('../models/user')
const Boom = require('boom');

exports.find = {
  auth: false,

  handler: function (req,res) {
    Tweet.find({}).exec().then(tweets => {
      res(tweets);
    }).catch(err =>{
      reply(Boom.badImplemetation('error accessing Mongo db'));
    });
  },
};

exports.findTweetById= {
  auth: false,
  handler: function (req, res) {
    console.log("do i enter findTweetById");
    Tweet.findOne({_id: req.params.id}).then(tweet => {
      if(!tweet){
        return res.status(404);
      }
      res(tweet);
      }).catch(err => {
      res(Boom.notFound('id not found'));
    });
  },
};

//counting number of tweets function
function counting(tweets, email ,count) {
  let i = 0;
  while (i < tweets.length){
  //for (var i = 0; i < tweets.length; i++) {
    if (tweets[i].name === email ) {
      count ++;

    }
    i++;
  }
  return count;
};


//API to return an array[{email:value, count:value},{...etc}]

exports.findUserTweetCount = {
  auth:false,

  handler: function(req, res) {
    const tweetCount = [];
    let count = 0 ;
    let exists;
    Tweet.find({}).exec().then(tweets => {
      console.log('\ntweets : '+ tweets);
      for(let i = 0; i< tweets.length;i++) {
        let email = tweets[i].name;
        console.log('\nemail :' + email);
        count = counting(tweets, email, count);
        console.log('\ncount :' + count);
        //check to see if email exists in new object tweetCount, if it does don't add obj
        for (var j = 0; j < tweetCount.length; j++){
          if(tweetCount[j].email === email){
             exists = true;
             count = 0;
             break;
          }else{
            exists = false;
          }
        }
        if ( exists ){
          console.log('dont push');
        } else {
          tweetCount.push({email, count});
          count = 0;
          exists = false;
        }
        console.log('\ntweetCount array : ' + tweetCount);
      }
      return res(tweetCount);
      });

    }
  }

exports.findUserTweetById = {
  auth: false,

  handler: function (req, res) {
    console.log("do i enter findUserTweetById");
    Tweet.find({tweeter: req.params.id}).then(tweets => {
      console.log(tweets);
      return res(tweets);
    }).catch(err => {
      res(Boom.badImplemetation('error accessing Mongo db'));
    });
  },
};


exports.findUserTweetByEmail = {
  auth: false,

  handler: function (req, res) {
    Tweet.find({name: req.params.email}).then(tweets => {
      res(tweets);
    }).catch(err => {
      res(Boom.badImplemetation('error accessing Mongo db'));
    });
  },
};


exports.delete = {
  auth: false,
  handler: function(req, res) {
    Tweet.findOneAndRemove({ _id: req.params.id }, function (err, tweet) {
      if (err) {
        return (Boom.resbadImplemetation('error accessing Mongo db'));
      }

      if (!tweet) {
        res(Boom.notFound('id not found'));
      }

      res(tweet);
    });
  }
};


