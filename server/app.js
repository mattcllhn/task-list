var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
// var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/task_list';
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded( {extended: false } ));
app.use(bodyParser.json());

app.listen( port, function(){
  console.log( 'server up on', port );
});
//gets baseUrl
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve('public/index.html') );
});


//sends all tasks to DOM
app.get('/displayTasks', function(req,res){

  pg.connect(connectionString, function(err, client, done){
    if (err){
      console.log(err);
    }
    else {
      console.log('app.post/displayTasks connected');
      var resultsArray=[];
      var queryResults=client.query('SELECT * FROM tasks ORDER BY status');
      queryResults.on('row',function(row){
        resultsArray.push(row);
      });
      queryResults.on('end',function(){
        console.log(resultsArray);
        done();
        return res.send(resultsArray);
      }); // end queryResults.on('end')
    }// end else
  }); // end pg.connect
}); // end app.get displayTasks

app.post('/addTable', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var data= req.body;
    if (err){
      console.log(err);
    }
    else {
      console.log(data);
      console.log('app.post/addTable connected');
      client.query('INSERT INTO tasks (description,status ) VALUES ($1,$2)',[data.description,data.status]);
      res.sendStatus(200);
    }//else
  });//pg.connect
});//app.post addTable
