'use strict';

const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb();
const db_name = 'sl-users';

exports.getByID = function(req, res){
    couch.mango(db_name, {
        selector: {
            "_id": {
                "$eq": req.query.user_id
            }
        }
    }, {}).then(({data, headers, status}) => {
        res.json(data);
    }, err => {
        res.json({'status':'error', 'reason':err});
    });
}

exports.update = function(req, res){
    couch.update(db_name, req.body.values).then(({data, headers, status}) => {
        res.json({'status': 'ok', "data": data});
    }, err => {
        res.json({'status': 'error', 'reason': err});
    });
}
