'use strict';
// user controller
const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb();
const db_name = 'bewed';


exports.get_user = function(req, res){

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("bewed");
        dbo.collection("bewed_collection").findOne({}, function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
}

exports.add_user = function(req, res){
    const user = {
        name: req.body.name,
        age: req.body.age
    };

    couch.insert(db_name, user).then( ({data, headers, status}) => {
        res.json({'status': 'ok', 'data': data});
    }, err => {
        res.json({'status': 'error', 'reason': err});
    } );
}

exports.getById = function(req, res){
    console.log(req.query);
    couch.mango(db_name, {
        selector: {
            "_id": {
                "$eq": req.query._id
            }
        }
    }, {}).then(({data, headers, status}) => {
        res.json(data);
    }, err => {
        res.json({'status':'error', 'reason':err});
    });
}

exports.couch = function(req, res){
    couch.update(db_name, {
        _id: "86f6f15a09469b23abed73fdc3000b48",
        _rev: "2-42dc356d00baa90082c8862fb1f23e58",
        name: "Mischa",
        age: "26"
    }).then(({data, headers, status}) => {
        res.json({'status': 'ok', "data": data});
    }, err => {
        res.json({'status': 'error', 'reason': err});
    });
}



exports.test = function(req, res){
    res.json({
        "content" : "Hello world!"
    });
}