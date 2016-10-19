/**
 * Created by austin on 19/10/2016.
 */

const UserApi = require('./app/api/userapi');
const TweetApi = require('./app/api/tweetapi');

module.exports = [
  { method: 'GET', path:'/api/users', config:UserApi.find },
  { method: 'GET', path:'/api/users/{id}', config:UserApi.findOne },

  { method: 'GET', path:'/api/tweets', config:TweetApi.find },

]