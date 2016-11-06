/**
 * Created by austin on 27/09/2016.
 */
'use strict';
const User = require('../models/user');
const Tweet = require('../models/tweet');
const Joi = require('joi');

//default render for /
exports.main = {
  auth: false,
  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to MyTweet' });
  },

};

//route to administrator home, only admin can login
exports.adminhome = {
  handler: function (request, reply) {
    if (request.auth.credentials.loggedInUser == 'admin@mytweet.com') {
      User.find({}).exec().then(allUsers => {
        reply.view('adminhome', {
          title: 'Welcome to Administrator MyTweet',
          user: allUsers,
        });
      }).catch(err => {
        reply.redirect('/');
      });
    }
  },
};

//upload picture to mongodb
exports.userPicUpload = {
  payload: {
    maxBytes: 209715200,
    output: 'stream',
    parse: true,
    allow: 'multipart/form-data'
  },
  handler: function (req, res) {
    var data = req.payload.img;
    var userEmail = req.auth.credentials.loggedInUser;
    User.findOne({email: userEmail}).then(user => {
      user.img.data = data._data;
      user.img.contentType = 'image/jpeg';
      user.save((err, user) => {
        res.redirect('/settings')
      });
    });
  }
}

// render picture from database
exports.getUserPic = {
  handler : function (req ,res) {
    //console.log(req.payload);
    var userEmail = req.auth.credentials.loggedInUser;
    User.findOne({email: userEmail}).then(user => {
      //console.log(user.img.data);
      res(user.img.data).type('image');
    });
  }
}

//render pictures by user id
exports.getUserPicId = {
  handler : function (req ,res) {
    console.log(req.params.id);
    const id = req.params.id;
    console.log (id);
    //var userEmail = req.auth.credentials.loggedInUser;
    User.findOne({_id: id}).then(user => {
      //console.log(user.img.data);
      res(user.img.data).type('image');
    });
  }
}

//route to render signup
exports.signup = {
  auth: false,
  handler: function (request, reply) {
    reply.view('signup', {
      title: 'Sign up for MyTweet'

    });
  },

};


//should delete user and tweets
exports.deleteUser ={
  handler: function (req, res) {
    const email = req.payload.deleteUser;
    console.log (req.payload);
    User.findOneAndRemove({email: email}, function (err, tweet) {
      if (err) {
        return res({
          error: 'Error reading tweet: ' + err,
        });
      }

      if (!tweet) {
        return res({message: '404 not found'});
      }

      //res({ message: `deleted tweet ${req.params.id}` });
      //can't render report every time
      // using the same function for admin delete
      User.find({}).exec().then(allUser => {
        res.view('adminhome', {
          title: 'Welcome to Administrator MyTweet',
          user: allUser,
        });
    })
    });
  }
};

//render login page
exports.login = {
  auth: false,
  handler: function (request, reply) {
    reply.view('login', {
      title: 'Login to MyTweet',
    });
  },
};

// authenticate users , will render user home, authenticate admin will render adminhome
exports.authenticate = {
  validate: {

    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    failAction: function (request, reply, source, error) {
      reply.view('login', {
        title: 'Login error',
        errors: error.data.details,
      }).code(400);
    },

  },
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    if (user.email == 'admin@mytweet.com' && user.password == 'secret') {
      request.cookieAuth.set({
        loggedIn: true,
        loggedInUser: user.email,
      });
      reply.redirect('/adminhome');
    }
    User.findOne({ email: user.email }).then(foundUser => {
      if (foundUser && foundUser.password === user.password) {
        request.cookieAuth.set({
          loggedIn: true,
          loggedInUser: user.email,
        });
        reply.redirect('/home');
      } else {
        reply.redirect('/signup');
      }
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

//route to logout, render route /
exports.logout = {
  auth: false,
  handler: function (request, reply) {
    request.cookieAuth.clear();
    reply.redirect('/');
  },

};

//add user to database , validation on form
exports.register = {
  validate: {

    payload: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    failAction: function (request, reply, source, error) {
      reply.view('signup', {
        title: 'Sign up error',
        errors: error.data.details,
      }).code(400);
    },

  },
  auth: false,
  handler: function (request, reply) {
    const user = new User(request.payload);
    user.save().then(newUser => {
        reply.redirect('/login');
    }).catch(err => {
      //console.log(request.auth.credentials.loggedInUser);
      reply.redirect('/');
    });
  },
};

//render current users in settings page
exports.viewSettings = {

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(foundUser => {
      reply.view('settings', { title: 'Edit Account Settings', user: foundUser });
    }).catch(err => {
      reply.redirect('/');
    });
  }

};

//update current users settings.
exports.updateSettings = {
  validate: {

    payload: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    failAction: function (request, reply, source, error) {
      reply.view('settings', {
        title: 'Settings error',
        errors: error.data.details,
      }).code(400);
    },

  },
  handler: function (request, reply) {
    const editedUser = request.payload;
    var loggedInUserEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: loggedInUserEmail }).then(user => {
      user.firstName = editedUser.firstName;
      user.lastName = editedUser.lastName;
      user.email = editedUser.email;
      user.password = editedUser.password;
      return user.save();
    }).then(user => {
      reply.view('settings', { title: 'Edit Account Settings', user: user });
    });
  }
};
