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
  res(Boom.notFound('id not found'))
});
},
};