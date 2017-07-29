//requires
const express = require('express');
const router = express.Router();
const db = require('../db');
const chalk = require('chalk');

//may need to build a resuable function here
//routes
router.get('/', function(req, res, next){
  res.send('users!');
  // res.redirect('/');
})

router.post('/', function(req, res, next){
  let manager = false;
  if (req.body.manager){
    manager = true;
  }
  console.log(chalk.green('adding ' + req.body.name + ' manager: ' + manager))
  db.add(req.body.name, manager)
    .then(function(user){
      res.redirect('/');
    });
})

//exports
module.exports = router;
