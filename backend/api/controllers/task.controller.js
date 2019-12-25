'use strict';

const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb();
const db_name = 'task';

exports.add = function(req, res){
    couch.insert(db_name, req.body.task).then( ({data, headers, status}) => res.json({'status': 'ok', 'data': data}), err => res.json({'status': 'error', 'reason': err}) );
}

exports.get = function(req, res){
    couch.mango(db_name, {
        selector: {
            _id: {
                $eq: req.query.task_id
            }
        }
    }, {}).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );
}

exports.getByPool = function(req, res){
	couch.mango(db_name, {
        selector: {
            parent: {
                $eq: req.query.pool_id
            }
        }
    }, {}).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );
}