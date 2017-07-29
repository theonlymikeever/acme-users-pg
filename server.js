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
//add your static route here


//middleware


//index
app.get('/', function(req, res, next){
  res.send('hello there!');
});

//port set up
const port = process.env.PORT || 3000;
app.listen(port, function(res, res, next){
  console.log(`listing on port ${ port }`);
});
