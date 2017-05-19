var ObjectId = require('mongoose').Types.ObjectId;
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const user = require('../models/users');

let controllers = {}

controllers.findOne = function(req, res, next) {
  console.log(req)
  // let data = user ({
  //   username : req.body.username,
  //   password : passwordHash.generate(req.body.password),
  //   email : req.body.email,
  //   phone : req.body.phone
  // })
  // data.save((err, result)=>{
  //   if(err) throw err
  //   res.send('Create Success')
  // })
}

module.exports = controllers;