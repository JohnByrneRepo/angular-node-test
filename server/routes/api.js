var express = require('express'),
    router = express.Router(),
    passport = require('passport');
    User = require('../models/user.js');
    Log = require('../models/log.js');


router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username.toUpperCase() }),
    req.body.password,
      function(err, account) {
        if (err) {
          return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({status: 'Registration successful!'});
        });
      });
    });

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {

    function saveLoginAttemptLog(action, username) {
      var log = {
          ip: req.connection.remoteAddress,
          datetime: new Date().getTime(),
          action: action,
          username: req.body.username
        };

        var loginAttemptLog =	new Log(log).save(function(success){
      		console.log('Saved log:');
          console.log(JSON.stringify(log, null, 2));
      	});
    }

    if (err) {
      saveLoginAttemptLog('AUTH_FAILURE', user.username);
      return res.status(500).json({err: err});
    }
    if (!user) {
      saveLoginAttemptLog('AUTH_FAILURE', user.username);
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        saveLoginAttemptLog('AUTH_FAILURE', user.username);
        return res.status(500).json({err: 'Could not log in user'});
      }
      saveLoginAttemptLog('AUTH_SUCCESS', user.username);
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

module.exports = router;
