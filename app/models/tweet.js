/**
 * Created by austin on 05/10/2016.
 */
const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  amount: Number,
  method: String,
  donor: String,
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;