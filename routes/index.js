var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var assert = require('assert');
var client = new cassandra.Client({ contactPoints: ['localhost'],keyspace: 'zapdos'});
/* GET home page. */

router.get('/realTime', function(req, res, next) {
    var Hum,Tem,Lum;
    client.execute('select value,ts from data_month where key = 2 and month = 570 ORDER BY ts DESC limit 1 ;', function (err, result) {
        if (err) {
            return console.error('There was while trying to retrieve data from system.local', err);
        }else {
	    Hum=result.rows[0].value;
        }
    });
    client.execute('select value,ts from data_month where key = 3 and month = 570 ORDER BY ts DESC limit 1 ;', function (err, result) {
        if (err){
            return console.error('There was while trying to retrieve data from system.local', err);
        }else {
            Tem=result.rows[0].value; 
         }
    });
    client.execute('select value,ts from data_month where key = 4 and month = 570 ORDER BY ts DESC limit 1 ;', function (err, result) {
        if (err) {
            return console.error('There was while trying to retrieve data from system.local', err);
        }else {
            Lum=result.rows[0].value;
            Time=result.rows[0].ts;
	    Car=95;
	    if(Lum>50 && Hum>70){
	    Wea='雨';} 
            else if(Lum>50){
	    Wea='阴';}
	    else{
	    Wea='晴';}
	    if(Hum !=undefined&& Tem != undefined){
            res.render('past',{Hum:Hum, Tem:Tem, Lum:Lum, Car:Car, Wea:Wea,Time:Time, title:'realtime'});
            } 
        }
    });
});

router.get('/past', function(req, res, next) {
    client.execute('select value,ts from data_month where key = 2 and month = 570 ORDER BY ts DESC limit 60 ;', function (err, result) {
        if (err) {
            return console.error('There was while trying to retrieve data from system.local', err);
        }else {
	    var Hum=[];
	    var Tem=[];
	    var Lum=[];
	    var Wea=[];
	    var Time=[];
	    var Car=[]; 
            for (var i = 0 ; i <10;i++)
            {
                Hum[i]=result.rows[6*i].value;
            }
            client.execute('select value,ts from data_month where key = 3 and month = 570 ORDER BY ts DESC limit 60 ;', function (err, result) {
                if (err){
                    return console.error('There was while trying to retrieve data from system.local', err);
                }else {
                    for (var i = 0 ; i <10;i++)
                    {
                        Tem[i]=result.rows[6*i].value;
                    }
                    client.execute('select value,ts from data_month where key = 4 and month = 570 ORDER BY ts DESC limit 60 ;', function (err, result) {
                        if (err) {
                            return console.error('There was while trying to retrieve data from system.local', err);
                        }else {
                            for (var i = 0 ; i <10;i++)
                            {
                                Lum[i]=result.rows[6*i].value;
                                if(Lum[i]>50 && Hum[i]>70){
                                    Wea[i]='雨';}
                                else if(Lum[i]>50){
                                    Wea[i]='阴';}
                                else{
                                    Wea[i]='晴';}
                                Time[i]=result.rows[6*i].ts;
				Car[i]=95;
                            }
                            if(Hum !=undefined&& Tem != undefined){
                                res.render('index',{Hum:Hum, Tem:Tem, Lum:Lum, Car:Car, Wea:Wea,Time:Time, title:'realtime'});
                            }
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
