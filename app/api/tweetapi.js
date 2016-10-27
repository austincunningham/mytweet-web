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

/*exports.deleteAll = {
  auth: false,
  handler: function(req, res){
    Tweet.find({}).exec().then(tweets => {

    }

}*/
