/**
 * Created by austin on 19/10/2016.
 */

const UserApi = require('./app/api/userapi');
const TweetApi = require('./app/api/tweetapi');

module.exports = [
  { method: 'GET', path:'/api/users', config:UserApi.find },
  { method: 'GET', path:'/api/users/{id}', config:UserApi.findOne },
  { method: 'DELETE', path:'/api/users/{id}', config:UserApi.delete },
  { method: 'GET', path:'/api/users/email/{email}', config:UserApi.findUserByEmail },

  { method: 'GET', path:'/api/tweets', config:TweetApi.find },
  { method: 'GET', path:'/api/tweets/{id}', config:TweetApi.findUserTweetById },
  { method: 'GET', path:'/api/tweets/email/{email}', config:TweetApi.findUserTweetByEmail },
  { method: 'DELETE', path:'/api/tweets/{id}', config:TweetApi.delete },
  //{ method: 'DELETE', path:'/api/tweets', config:TweetApi.deleteAllTweets },
]