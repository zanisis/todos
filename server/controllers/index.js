var ObjectId = require('mongoose').Types.ObjectId;
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const axios = require('axios');
const querystring = require('querystring');

require('dotenv').config({
    path: '../.env'
})

let controllers = {}

controllers.signIn_facebook = function(req, res, next) {
    console.log('kesini datanya***', req.user)
    let facebook = req.user
    User.findOne({
      facebook_id : facebook.id
    },(err, user)=>{
      if(err) throw err

      if(!user){
        var newUser = new User()

        newUser.username = facebook.name.givenName;
        newUser.email = facebook.emails[0].value;
        newUser.password = passwordHash.generate(facebook.name.givenName)
        newUser.facebook_id = facebook.id;
        newUser.facebook_token = facebook.token;


        console.log('data baru',newUser);
        newUser.save((err)=>{
          if(err) throw err

          res.redirect('http://localhost:8080/home.html')
        })
      } else {
        res.redirect('http://localhost:8080/home.html')
      }
    })
    // console.log('query datanya***', req.query.code)
    // respon = req.query.user

    // let obj = req.user
    // if (obj.hasOwnProperty('message')) {
    //     res.json(obj.message)
    // } else {
    //     let token = jwt.sign({
    //         token: obj.facebook.token,
    //         name: obj.facebook.name
    //     }, process.env.SIGN, {
    //         expiresIn: '1h'
    //     })
      // res.redirect('/profile')
        // res.redirect('http://127.0.0.1:8080/home.html')
    // }


}

// https://www.facebook.com/v2.9/dialog/oauth?client_id=365158910552559&redirect_uri=http://localhost:3000/auth/facebook
// https://graph.facebook.com/v2.9/oauth/access_token?client_id=365158910552559&redirect_uri=http://localhost:3000/auth/facebook&client_secret=fe65edd554aeb30b2ae4451cec5a289c&code=AQBonIBy0aPXh8Qd7fl_nB2kUXD0g6CPKiwX9qUuukxAwJMbIIO6X2jikX40JLh9h1ckCHZzkIHRwy3ZheVTIcOg9RJs7RiZS6DryMT9NOd3Vg6DQdP6MJQYnXTsVd2mJFXgMgV0egLuDPzGyZFRPkP5FUs9j3oFS4
module.exports = controllers;