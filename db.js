//requires
const pg = require('pg');
const chalk = require('chalk');
const client = new pg.Client(process.env.DATABASE_URL);

//client connection
client.connect(function(err){
  if (err){
    return console.log(chalk.red(err));
  };
  console.log(chalk.blue('connected to acmeusers db'));
});

//functions
function query(sql, params, cb){
  return new Promise(function(resolve, reject){
    client.query(sql, params, function(err, result){
      if(err){
        return reject(err);
      }
      resolve(result);
    });
  });
}

function sync(){
  const sql = require('./seed.js');
  return query(sql, null);
}

function list(){
  return query('SELECT name, isManager, id from users', null)
    .then(function(result){
      return result.rows;
    });
}

function listManagers(){
  return query('SELECT name, isManager, id from users WHERE ismanager = true', null)
    .then(function(result){
      return result.rows;
    });
}

function add(name, isManager){
  return query('INSERT INTO users (name, isManager) values ($1, $2) RETURNING ID', [name, isManager])
    .then(function(result){
      return result.rows[0].id;
    });
}

function deleteUser(id){
  return query('DELETE from users where id = $1', [id]);
}

function updateUser(id){
  return query('SELECT isManager FROM users WHERE id = $1', [id])
  .then(function(result){
    console.log('result:')
    console.log(result.rows[0])
    if (result.rows[0].ismanager === false){
      return query('UPDATE users SET isManager = TRUE  WHERE id = $1', [id])
    } else{
      return query('UPDATE users SET isManager = FALSE WHERE id = $1', [id])
    }
  });
}

//exports
module.exports = {
  add,
  deleteUser,
  list,
  listManagers,
  updateUser,
  sync
}
