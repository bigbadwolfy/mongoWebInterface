var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var db;
var connection;
var schema;

app.use(express.static('src'));
app.use(bodyParser.json());


function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
        resolve();
    }, 1000);
});
}


function connectToMng(uri,bd) {
    return new Promise(resolve => {
        MongoClient.connect(uri, function (err, client) {
            if (err) {
                console.log(err);
                resolve(err.message)
            }
            else
            {
                db = client.db(bd);
                connection = client;
                console.log('Connected to MongoDB');
                resolve('Connected successfully');
            }
        });
    })
}


app.get('/', function(req, res) {
    console.log('get /');
    res.sendFile(path.join(__dirname, '../src/json.html'));
});


app.get('/healthmonitor', function(req, res) {
    res.send("");
});


app.post('/senddata', function(req, res) {
    // Insert JSON straight into MongoDB
    console.log('\x1b[47m%s\x1b[0m',req.body);
    db.collection(schema).insert(req.body,function(err, result) {
        if (err) {
            console.log(err);
            res.send('error, problems with connection to your mongoDB')
        }
        else {
            console.log('\x1b[34m%s\x1b[0m', '1 document inserted');
            res.send('ok');//connection.close();
        }});
});


app.post('/getdata', function(req,res) {
    //console.log(req.body.schema);
    db.collection(schema).find(req.body).toArray(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log('\x1b[43m%s\x1b[0m','receive data');
            console.log('\x1b[45m%s\x1b[0m', JSON.stringify(result));
            res.send(result);
        }});
});


app.post('/getlastdata', function(req,res) {

    db.collection(schema).find(req.body).sort({ $natural: -1 }).limit(1).toArray(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log('\x1b[43m%s\x1b[0m', 'receive last data');
            console.log('\x1b[45m%s\x1b[0m', JSON.stringify(result));
            res.send(result);
        }});
});


app.get('/getschedule', function(req,res) {
    console.log(req.query);
    db.collection(schema).find(req.query).toArray(function(err, result) {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else
        {
            console.log('\x1b[36m%s\x1b[0m', 'this is stuff you want');
            console.log(req.query.mnemonic);
            console.log(result.length);
            result.length == 0 ? res.send('{' + req.query.mnemonic + ':' + '{}' + '}') :
                req.query.mnemonic == undefined ? res.send(result[0]['MO2B']) :
                    res.send(JSON.parse('{' + '"' + req.query.mnemonic + '"' + ':' + JSON.stringify(result[0][req.query.mnemonic]) + '}'));
        }});
});


app.delete('/deletedata/:id', function(req,res) {
    console.log('\x1b[31m%s\x1b[0m','here');
    console.log('\x1b[31m%s\x1b[0m',req.param('id'));
    db.collection(schema).deleteOne({_id: new ObjectID(req.param('id'))},function(err, result) {
        if (err) {
            console.log(err);
            res.send(err)
        }
        else
        res.send('deleted');
    
    });
});


app.post('/setmongoconnect', async function(req,res) {
    console.log('\x1b[31m%s\x1b[0m',JSON.stringify(req.body));
    if (connection != undefined) {
        connection.close();
        await resolveAfter2Seconds();
    }
    console.log(req.body.string);
    console.log(req.body.bd);
    schema = req.body.schema;
    var result = await connectToMng(req.body.string,req.body.bd);
    res.send(result);
});

//mongoConnect('mongodb://ufr_cardfix_user:123456@172.28.59.46:27045/ufr_cardfix'); --use to hardcode connect

app.listen(8080, console.log('\x1b[46m%s\x1b[0m','listening on port 8080!'));