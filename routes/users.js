//requires
const express = require('express');
const router = express.Router();
const db = require('../db');
const chalk = require('chalk');

//main routes

//list users
router.get('/', function(req, res, next){
  db.list()
    .then(function(users){
      res.render('users', { users, nav: 'users' });
    })
    .catch(function(err){
      next(err);
    });
});

//list managers
router.get('/managers', function(req, res, next){
    db.listManagers()
    .then(function(users){
      res.render('managers', { users, nav: 'managers' });
    })
    .catch(function(err){
      next(err);
    });
});


//add users
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
});

//delete user
router.delete('/:id', function(req, res, next){
  console.log(req.params.id)
  db.deleteUser(req.params.id*1)
    .then(function(){
      res.redirect('/users');
    })
    .catch(function(err){
      next(err);
    });
});

//update user from manager/user
router.put('/:id', function(req, res, next){
  console.log(req.params.id)
  db.updateUser(req.params.id*1)
    .then(function(){
      res.redirect('/users');
    })
    .catch(function(err){
      next(err);
    });
});

//exports
module.exports = router;
