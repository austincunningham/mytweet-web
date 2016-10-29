/**
 * Created by austin on 19/10/2016.
 */
'use strict';

const User = require('../models/user');
const Boom = require('boom');

exports.find = {
  auth: false,

  handler: function (req,res) {
    User.find({}).exec().then(users => {
      res(users);
    }).catch(err =>{
      reply(Boom.badImplemetation('error accessing Mongo db'))
    });
  },
};

exports.findOne = {
  auth: false,
  handler: function(req, res) {
    User.findOne({_id: req.params.id}).then(user =>{
    if(!user){
      return res.status(404).end();
    }
      res(user);
    }).catch (err => {
      res(Boom.notFound('id not found'));
    });
  },
};

exports.delete = {
  auth: false,
  handler: function(req, res) {
    User.findOneAndRemove({ _id: req.params.id }, function (err, user) {
      if (err) {
        return (Boom.resbadImplemetation('error accessing Mongo db'));
      }

      if (!user) {
        res(Boom.notFound('id not found'));
      }

      res(user);
    });
  }
}

exports.findUserByEmail = {
  auth: false,

  handler: function (req, res) {
    console.log(req.params.email);
    User.findOne({email: req.params.email}).then(user => {
      console.log(user.firstName);
      res(user);
    }).catch(err => {
      res(Boom.badImplemetation('error accessing Mongo db'));
    });
  },
};

exports.DeleteUserByEmail = {
  auth: false,

  handler: function (req, res) {
    console.log("email.params"+req.params.email);
    console.log('do i get here?')
    User.findOneAndRemove({email: req.params.email}).then(user => {
      console.log(user.firstName);
      res(user);
    }).catch(err => {
      res(Boom.badImplemetation('error accessing Mongo db'));
    });
  },
};