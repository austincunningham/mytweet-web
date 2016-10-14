'use strict';
const Tweet = require('../models/tweet');
const Joi = require('joi');

exports.home = {

  handler: function (request, reply) {
    reply.view('home', { title: 'Make a MyTweet' });
  },

};

exports.submit = {

  validate: {

    payload: {
      message: Joi.string().max(170),
    },

    options: {
      abortEarly: false,
    },

    failAction: function (request, reply, source, error) {
      reply.view('home', {
        title: 'more that 140 characters',
        errors: error.data.details,
      }).code(400);
    },
  },
  handler: function (request, reply) {
    let data = request.payload;
    data.name = request.auth.credentials.loggedInUser;
    const tweet = new Tweet(data);
    tweet.save().then(newTweet => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.report = {

  handler: function (request, reply) {
    Tweet.find({}).exec().then(allTweets => {
      reply.view('report', {
        title: 'MyTweets to Date',
        tweet: allTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};


