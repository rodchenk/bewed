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

exports.update = function(req, res){
    couch.update(db_name, req.body.values).then(({data, headers, status}) => res.json({'status': 'ok', "data": data}), err => res.json({'status': 'error', 'reason': err}) )
}

exports.delete = function(req, res){
    couch.del(db_name, req.query._id, req.query._rev).then( ({data, headers, status}) => res.json({'status': 'ok', "data": data}), err => res.json({'status': 'error', 'reason': err}) )
}

exports.deleteChildred = function(req, res){
	//
}