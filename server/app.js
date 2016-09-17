var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
// var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/marios_pizza';
var port = process.env.PORT || 3000;

//addFloor
//add employee
//currentFloor
//currentEmployee
//changeStatus
//changeEmployee
app.use(bodyParser.urlencoded( {extended: false } ));
app.use(bodyParser.json());

app.listen( port, function(){
  console.log( 'server up on', port );
});

app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve('public/index.html') );
});
