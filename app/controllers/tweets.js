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


exports.delete = {
  handler: function (req, res) {
    for (let i = 0; i < Object.keys(req.payload).length; i++) {
      let id = Object.keys(req.payload)[i];
      console.log (Object.keys(req.payload).length)
      console.log(id, i);
      Tweet.findOneAndRemove({_id: id}, function (err, tweet) {
        if (err) {
          return res({
            error: 'Error reading tweet: ' + err,
          });
        }

        if (!tweet) {
          return res({message: '404 not found'});
        }

        //res({ message: `deleted tweet ${req.params.id}` });
        if (i  == Object.keys(req.payload).length -1) {
           res.redirect('/report');
        }
      });
    }
  }
};











