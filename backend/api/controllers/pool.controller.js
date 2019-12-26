'use strict';

const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb();
const db_name = 'pool';


exports.add = function(req, res){
    const pool = {
        name: req.body.data.name,
        category: req.body.data.category,
        private: req.body.data.isprivate,
        user: req.body.user,
        created: new Date(),
        type: 'pool',
        tags: []
    };

    couch.insert(db_name, pool).then( ({data, headers, status}) => res.json({'status': 'ok', 'data': data}), err => res.json({'status': 'error', 'reason': err}) );
}

exports.getAll = function(req, res){
    couch.mango(db_name, {
        selector: {
            "_id": {
                "$gt": "0"
            }
        }
    }, {}).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );
}

exports.getByUser = function(req, res){
    couch.mango(db_name, {
        selector: {
            "user": {
                "$eq": req.query.user_id
            }
        }
    }, {}).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );
}

exports.getByID = function(req, res){
    // couch.get(db_name, '_design/poolTasks/_view/all', {
    //     include_docs: true, 
    //     key: req.query.pool_id
    // }).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );

    couch.mango(db_name, {
        selector: {
            "_id": {
                "$eq": req.query.pool_id
            }
        }
    }, {}).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );
}

exports.getPublished = function(req, res){
    console.log(req.query);
    couch.mango(db_name, {
        selector: {
            "_id": {
                "$gt": null
            },
            "user": {
                "$eq": req.query.user_id
            },
            "published": {
                "$eq": true
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

// exports.addTask = function(req, res){
//     let task = req.body.params.values;
//     couch.mango(db_name, {
//         selector: {
//             "_id": {
//                 "$eq": req.body.params.parent
//             }
//         }
//     }, {}).then(({data, headers, status}) => {
//         if(data.docs.length > 0){
//             let pool = data.docs[0];
//             if(!pool.tasks) pool.tasks = new Array();
            
//             pool.tasks.push(req.body.params.values);

//             couch.update(db_name, pool).then(({data, headers, status}) => 
//                 res.json({'status': 'ok', "data": data}), 
//                 err => res.json({'status': 'error_01', 'reason': err}) )            
//         }else{
//             err => res.json({'status':'error_03', 'reason':err})
//         }
//     }, err => res.json({'status':'error_02', 'reason':err}) );
// }