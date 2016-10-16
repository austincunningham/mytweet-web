/**
 * Created by austin on 16/10/2016.
 */
/**
 * Created by austin on 05/10/2016.
 */
'use strict';

const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  email: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;