var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var assert = require('assert');
var client = new cassandra.Client({ contactPoints: ['localhost'],keyspace: 'zapdos'});
/* GET home page. */

router.get('/realTime', function(req, res, next) {
    var Hum,Tem,Lux;
    client.execute('select value,ts from data_month where key = 3 and month = 569 ORDER BY ts DESC limit 1 ;', function (err, result) {
        if (err) {
            return console.error('There was while trying to retrieve data from system.local', err);
        }else {
            Hum=result.toString();
        }
    });
    client.execute('select value,ts from data_month where key = 4 and month = 569 ORDER BY ts DESC limit 1 ;', function (err, result) {
        if (err) {
            return console.error('There was while trying to retrieve data from system.local', err);
        }else {
            Tem=result.toString();
        }
    });
    client.execute('select value,ts from data_month where key = 5 and month = 569 ORDER BY ts DESC limit 1 ;', function (err, result) {
        if (err) {
            return console.error('There was while trying to retrieve data from system.local', err);
        }else {
            Lux=result.toString();
        }
    });
    res.render('index',{Hum:Hum , Tem: Tem, Lux: Lux, title: 'hhss'});
});

router.get('/past', function(req, res, next) {
    client.execute('select * from user', function (err, result) {
        if (err) {
            return console.error('There was while trying to retrieve data from system.local', err);
        }else {
            res.render('past',{result:result.toString(), title: 'hhss'});
        }
    });
});

module.exports = router;
