'use strict';
const Tweet = require('../models/tweet');


exports.home = {

  handler: function (request, reply) {
    reply.view('home', { title: 'Make a MyTweet' });
  },

};

exports.tweet = {

  handler: function (request, reply) {
    let data = request.payload;
    data.donor = request.auth.credentials.loggedInUser;
    const tweet = new MyTweet(data);
    tweet.save().then(newMyTweet => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.report = {

  handler: function (request, reply) {
    Donation.find({}).exec().then(allTweets => {
      reply.view('report', {
        title: 'MyTweets to Date',
        donations: allTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};


