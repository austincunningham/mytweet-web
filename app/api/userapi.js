/**
 * Created by austin on 19/10/2016.
 */
'use strict';

const User = require('../models/user');
const Boom = require('boom');

//api to find all users
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

//api to find a single user by id
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

//api delete a single user by id
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

//api find user by email
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

//api find user by email and delete
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

//api add new user
exports.register = {
  auth: false,
  handler: function (request, reply) {
    const user = new User(request.payload);
    user.save().then(newUser => {
      reply.redirect('/adminhome');
    }).catch(err => {
      //console.log(request.auth.credentials.loggedInUser);
      reply(Boom.badImplementation('error creating user '));
    });
  },
};