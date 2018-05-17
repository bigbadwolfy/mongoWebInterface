var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;

var db;
var connection;


app.use(express.static(__dirname));
app.use(bodyParser.json());


//uri подключения к удаленной монге
//на localhost выглядеть будет так: mongodb://localhost:27017/exampleDb
MongoClient.connect('mongodb://ufr_cardfix_user:123456@ufrmsvpndev1:27045/ufr_cardfix', function (err, client) {
    if (err)
        throw err;
    else
    {
        db = client.db('cash');
        connection = client;
        console.log('Connected to MongoDB');
        //Start app only after connection is ready
        app.listen(8080);
    }
});


app.get('/', function(req, res) {
    console.log('get /');
    res.sendFile(path.join(__dirname, '/json.html'));
});


app.get('/healthmonitor', function(req, res) {
    res.send("");
});


app.post('/senddata', function(req, res) {
    // Insert JSON straight into MongoDB
    console.log('here');
    console.log(req.body);
    db.collection('cash').insert(req.body,function(err, result) {
        if (err) throw err;
        else
        console.log('\x1b[34m%s\x1b[0m','1 document inserted');
        res.send('ok');//connection.close();
    });
});


app.post('/getdata', function(req,res) {

    db.collection('cash').find(req.body).toArray(function(err, result) {
        if (err) throw err;
        else
            console.log('\x1b[36m%s\x1b[0m','receive data');
            console.log(result);
            res.send(result);
    });
});


app.get('/getschedule', function(req,res) {
    console.log(req.query);
    db.collection('cash').find(req.query).toArray(function(err, result) {
        if (err) throw err;
        else
            console.log('\x1b[36m%s\x1b[0m','this is stuff you want');
            console.log(req.query.mnemonic);
            console.log(result.length);
            
            //console.log(req.query.mnemonic.length);
             result.length == 0 ? res.send('{'+req.query.mnemonic+':'+'{}'+'}') : req.query.mnemonic == undefined ? res.send(result[0]['MO2B']) : res.send(JSON.parse('{'+'"'+req.query.mnemonic+'"'+':'+JSON.stringify(result[0][req.query.mnemonic])+'}'));
    });
});


app.delete('/deletedata/:id', function(req,res) {
    console.log('\x1b[31m%s\x1b[0m','here');
    console.log('\x1b[31m%s\x1b[0m',req.param('id'));
    db.collection('cash').deleteOne({_id: new ObjectID(req.param('id'))},function(err, result) {
        if (err) throw err;
        else
        res.send('deleted');
    
    });
});


app.post('/getlastdata', function(req,res) {

    db.collection('cash').find(req.body).sort({ $natural: -1 }).limit(1).toArray(function(err, result) {
        if (err) throw err;
        else 
            console.log('\x1b[31m%s\x1b[0m','receive last data');
            console.log(result);
        res.send(result);
    });
});