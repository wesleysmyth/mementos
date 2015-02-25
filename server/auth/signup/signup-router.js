var express = require('express');
var signupRouter = express.Router();
// var db = app.get('db');

signupRouter.get('/', function(req, res) {
  'use strict';
  //console.log('Request', req);
  // res.redirect('/');
  res.status(200).send('reached the signup page');
});   

// FIXME: needs proper response after successful authentication
signupRouter.post('/', 
  // passport.authenticate('local'),
  function(req, res) {
    'use strict';
    var user = new req.db.Users({email: req.body.email});

    user.fetch()
    .then(function(model) {
      if (!model) {        
        user.setPass(req.body.password)
        .then(function(dbUser) {
          return dbUser.save();
        })
        .then(function(savedUser) {
          res.cookie('sessionID', req.sessionID);
          res.status(201).send('User created!');
        });
      } else {
        res.status(409).send('User Already Exists.');
      }
    });
  }); 

module.exports = signupRouter;
