var express = require('express');
var app = express();
var path = require('path');
var mongodb = require('mongodb')
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var url = 'mongodb://localhost:27017/bucketList';
var ObjectID = mongodb.ObjectID
app.use(express.static('public'))

app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname + '/index.html'));
});

//INDEX//

app.get('/country', function(req, res){

 MongoClient.connect(url, function( err, db ){
   var collection = db.collection('country');
   collection.find({}).toArray( function(err, docs){
     res.json(docs);
     db.close();
   })
 })
})

//CREATE//
app.post('/country', function(req, res){
 
 // res.status(200).end();
 console.log( req.body )
  MongoClient.connect(url, function( err, db ){
   var collection = db.collection('country');
   collection.insert( req.body)
   res.status(200).end();
   db.close()
  })
});


//DELETE//
app.delete('/country/:id', function(req, res){

MongoClient.connect(url, function( err, db ){
var collection = db.collection('country');
collection.remove({_id: new ObjectID(req.params.id)})
res.status(200).end();
db.close()
})
});



var server = app.listen(3000, function () {
 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);
});