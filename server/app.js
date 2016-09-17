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

app.use( express.static( 'public' ) );

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
        // console.log(resultsArray);
        done();
        return res.send(resultsArray);
      }); // end queryResults.on('end')
    }// end else
  }); // end pg.connect
}); // end app.get displayTasks

app.post('/addTask', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var data= req.body;
    if (err){
      console.log(err);
    }
    else {
      console.log(data);
      console.log('app.post/addTask connected');
      client.query('INSERT INTO tasks (description,status ) VALUES ($1,$2)',[data.description,data.status]);
      res.sendStatus(200);
    }//else
  });//pg.connect
});//app.post addTask
app.post('/updateTask', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var data= req.body;
    if (err){
      console.log(err);
    }
    else {
      console.log(data);
      console.log('app.post/updateTask connected');
      client.query('UPDATE tasks SET status = ($1) WHERE id = ($2)',[data.new_status,data.id]);
      res.sendStatus(200);
    }//else
  });//pg.connect
});//app.post addTask
app.delete('/deleteTask', function(req, res){
  pg.connect(connectionString, function(err, client, done){
    var data= req.body;
    if (err){
      console.log(err);
    }
    else {
      console.log(data);
      console.log('app.post/deleteTask connected');
      client.query('DELETE FROM tasks WHERE id = ($1)',[data.id]);
      res.sendStatus(200);
    }//else
  });//pg.connect
});//app.post addTask
