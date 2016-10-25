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


exports.findUserTweetById = {
  auth: false,

  handler: function (req, res) {
    console.log(req.name);
    Tweet.find({tweeter: req.params.id}).then(tweets => {
      console.log(tweets);
      res(tweets);
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
