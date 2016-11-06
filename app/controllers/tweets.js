'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');
const Joi = require('joi');

//route to render view
exports.home = {

  handler: function (request, reply) {
    reply.view('home', { title: 'Make a MyTweet' });
  },

};

// submit a tweet , validation restricts to 140 characters
exports.submit = {

  validate: {

    payload: {
      message: Joi.string().max(170),
    },

    options: {
      abortEarly: true,
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
    User.find({email: data.name}).then(foundUser => {
      data.tweeter = foundUser[0]._id;
      const tweet = new Tweet(data);
      tweet.save()
    }).then(newTweet => {
      reply.redirect('/mytweetlist');
    }).catch(err => {
      reply.redirect('/');
    });
  },
}

//find all tweets and render
exports.report = {
  auth: false,
  handler: function (request, reply) {
    Tweet.find({}).exec().then(allTweets => {
      reply.view('report', {
        title: 'MyTweets to Date',
        tweet: allTweets,
      });
    }).catch(err => {
      console.log(err);
      reply.redirect('/');
    });
  },


};

//find the tweets by the loggedInUserEmail
exports.mytweetlist = {

  handler: function (request, reply) {
    var loggedInUserEmail = request.auth.credentials.loggedInUser;
    Tweet.find({name : loggedInUserEmail}).exec().then(allTweets => {
      reply.view('mytweetlist', {
        title: 'MyTweets to Date',
        tweet: allTweets,
      });
    }).catch(err => {
      console.log(err);
      reply.redirect('/');
    });
  },
};

//route to render view finduser
exports.finduser = {

  handler: function (request, reply) {
    reply.view('finduser', { title: 'Search for user Tweets' });
  },

};

//find all tweet by users email address
exports.findusersearch = {

  handler: function (request, reply) {
      var findUserEmail = request.payload.name;
      console.log("do i ever get here?" + findUserEmail);
      Tweet.find({name: findUserEmail}).exec().then(allTweets => {
        reply.view('finduser', {
          title: 'MyTweets by Tweeter',
          tweet: allTweets,
        });

      }).catch(err => {
        reply.redirect('/');
      });
    },
};

// delete tweet by id
exports.delete = {
  handler: function (req, res) {
    for (let i = 0; i < Object.keys(req.payload).length; i++) {
      let id = Object.keys(req.payload)[i];
      console.log (Object.keys(req.payload).length);
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
        //can't render report every time
        // using the same function for admin delete
        if (i  == Object.keys(req.payload).length -1) {
            res.redirect('/mytweetlist');

        }
      });
    }
  }
};










