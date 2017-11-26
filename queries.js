var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
const cn = {
  host: 'ec2-23-21-189-181.compute-1.amazonaws.com', // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: 'db32m348ed6gsi',
  user: 'lfkmdwrycxmxrs',
  password: '54c776c77f59fb4a8e86e2fec893078b0a8f8843a7dd27580475d4fcb454dc1d'
};
var connectionString = 'postgres://lfkmdwrycxmxrs:54c776c77f59fb4a8e86e2fec893078b0a8f8843a7dd27580475d4fcb454dc1d@ec2-23-21-189-181.compute-1.amazonaws.com:5432/db32m348ed6gsi?ssl=true';
var db = pgp(connectionString);

// add query functions
function getAllUsers(req, res, next) {
  db.any('select * from usuarios')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleUser(req, res, next) {
  var codigo_usuario = parseInt(req.params.id);
  db.one('select * from usuarios where codigo_usuario = $1', codigo_usuario)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createUser(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into usuarios(codigo_usuario, nome_usuario, email_usuario, sennha_usuario, sexo)' +
      'values(${codigo_usuario}, ${nome_usuario}, ${email_usuario}, ${sennha_usuario}, ${sexo})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatePuppy(req, res, next) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
};
