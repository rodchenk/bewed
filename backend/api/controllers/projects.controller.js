'use strict';
// project controller
const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb();
const db_name = 'projects';


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