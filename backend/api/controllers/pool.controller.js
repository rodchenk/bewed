'use strict';

const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb();
const db_name = 'pool';


exports.add = function(req, res){
    console.log(req);
    const pool = {
        name: req.body.data.name,
        category: req.body.data.category,
        private: req.body.data.isprivate,
        user: req.body.user
    };

    couch.insert(db_name, pool).then( ({data, headers, status}) => {
        res.json({'status': 'ok', 'data': data});
    }, err => {
        res.json({'status': 'error', 'reason': err});
    } );
}

exports.getAll = function(req, res){
    couch.mango(db_name, {
        selector: {
            "_id": {
                "$gt": "0"
            }
        }
    }, {}).then(({data, headers, status}) => {
        res.json(data);
    }, err => {
        res.json({'status':'error', 'reason':err});
    });
}