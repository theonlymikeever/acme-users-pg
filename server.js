//requires
const express = require('express');
const nunjucks = require('nunjucks');
const  path = require('path');
const morgan = require('morgan');
const db = require('./db');

//app instanct and config
const app = express();
nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//static routes
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

//middleware
app.use(morgan('tiny')); //logging
app.use(require('body-parser').urlencoded({ extended: false })); //for parsing form posts
app.use(require('method-override')('_method')); //for creating delete methods
app.use(function(req, res, next){
  db.list()
    .then(function(users){
      res.locals.count = users.length; //total user count
      return db.listManagers();
    })
    .then(function(managers){
      res.locals.managerCount = managers.length;
      next();
    })
    .catch(function(err){
      next(err);
    });
}); //counter


//routes
app.get('/', function(req, res, next){
    db.list()
        .then(function(results){
          console.log(results);
        })
        .catch(function(err){
          res.send(err);
        });
    res.render('index', { nav: 'home' });
}); //index

app.use('/users', require('./routes/users.js')); //other pages
app.use(function(err, req, res, next){
  res.render('error', { error: err });
}) //err page

//port set up
const port = process.env.PORT || 3000;
app.listen(port, function(req, res, next){
  console.log(`listing on port ${ port }`);
    db.sync()
    .then(function(){
      db.list()
        .then(function(results){
          console.log('inital db:');
          console.log(results);
          // res.send(results);
        })
        .catch(function(err){
          res.send(err);
        });
    })
    .catch(function(err){
      console.log(err);
    });
});
