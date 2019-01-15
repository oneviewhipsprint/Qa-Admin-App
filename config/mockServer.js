var express = require('express');
var cassandra = require('cassandra-driver');
const JSON = require('circular-json');
var app = express();
const PORT = 3555;
const FETCH_QUERY = "select jsonmap from care_category_config where json_id=?";
const INSERT_QUERY = "Insert into care_category_config (json_id, jsonmap) values (?,?)";
const CARECATEGORYID = "BpFluidsCareCategory";
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: true}));

var client = new cassandra.Client({
    contactPoints: ['sea1l3falpa01'],
    localDataCenter: 'datacenter1',
    protocolOptions: {
        port: 8081
    },
    keyspace: 'json_configs_ks'
}).on('log', function (level, className, message, furtherInfo) {
    if (level != 'verbose') {
        console.log('cassandra: %s -- %s', level, message);
    }
});

client.connect(function (err) {
    if (err) {
        console.log("err while connecting db" + err);
    } else {
        console.log('connected to Cassandra!');
        app.listen(PORT, () => {
            console.log('Server running on port' + PORT);
        });
    }
});

app.get('/get-configs', (req, res, next) => {
    client.execute(FETCH_QUERY, [CARECATEGORYID], function (err, result) {
        if (err && result && result.rows[0] && result.rows[0].jsonmap) {
            console.log("err while executing query" + err);
            return res.json([]);
        }
        res.json(result.rows[0].jsonmap);
    })
});

app.post('/save-configs', (req, res) => {
    client.execute(INSERT_QUERY, [CARECATEGORYID, req.body], {prepare: true}).then((resp) => {
        if (resp) {
            res.send('success');
        } else {
            res.send('Failed!');
        }
    });
});