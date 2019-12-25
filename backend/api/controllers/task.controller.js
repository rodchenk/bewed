'use strict';

const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb();
const db_name = 'task';

exports.add = function(req, res){
    couch.insert(db_name, req.body.task).then( ({data, headers, status}) => res.json({'status': 'ok', 'data': data}), err => res.json({'status': 'error', 'reason': err}) );
}