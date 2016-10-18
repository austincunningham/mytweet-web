/**
 * Created by austin on 05/10/2016.
 */
const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  message: String,
  name : String,
  tweeter: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  }
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;