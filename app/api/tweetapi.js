/**
 * Created by austin on 19/10/2016.
 */
'use strict';

const Tweet = require('../models/tweet');
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

exports.findUserTweets = {
  auth: false,

  handler: function (req, res) {
    Tweet.find({tweeter: req.params.id}).then(tweets => {
      console.log(tweets);
      res(tweets);
    }).catch(err => {
      res(Boom.badImplemetation('error accessing Mongo db'));
    });
  },
};

