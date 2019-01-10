var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3555;
const dbConnection = 'mongodb://oneviewuser:1viewuser@ds151994.mlab.com:51994/labs_treatment_config';
const dbTable = 'labs_treatment_config';
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true}));
var db;
// const data = require('../src/shared/mock-data/bpFluidsConfig');

MongoClient.connect(dbConnection, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('connected to ' + dbConnection);
        db = client.db(dbTable);
        app.listen(PORT, () => {
            console.log('Server running on port' + PORT);
        });
    }
})

app.get('/get-configs', (req, res, next) => {
    db.collection('json_file').find().toArray(function (err, results) {
        res.json(results[0]);
    });
});

app.post('/save-configs', (req, res) => {
    db.collection('json_file').save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        res.send('success');
    })
})