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
        layout: req.body.data.layout,
        created: new Date(),
        type: 'pool',
        tags: [],
        tasks: []
    };

    couch.insert(db_name, pool).then( ({data, headers, status}) => res.json({'status': 'ok', 'data': data}), err => res.json({'status': 'error', 'reason': err}) );
}

exports.getAll = function(req, res){
    couch.mango(db_name, {
        selector: {
            "_id": {
                "$gt": null
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
    couch.mango(db_name, {
        selector: {
            "_id": {
                "$eq": req.query.pool_id
            }
        }
    }, {}).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );
}

exports.getPublished = function(req, res){
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

exports.news = function(req, res){

	var rows_per_page = 15;
	var page = (req.query.offset / rows_per_page);
	var skip = page * rows_per_page;

   	couch.get(db_name, '_design/poolTasks/_view/news', {
        include_docs: false, 
        descending: true,
        limit: rows_per_page,
        skip: skip,
        startkey: [req.query.user_id, {}],
        endkey: [req.query.user_id, null]
    }).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );
}

exports.follows = function(req, res){
	couch.get(db_name, '_design/poolTasks/_view/follows', {
        include_docs: false, 
        descending: true,
        limit: 25,
        key: req.query.user_id
    }).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );
}

exports.tags = function(req, res){
	couch.get(db_name, '_design/poolTasks/_view/poolsByTag', {
        include_docs: false, 
        descending: true,
        limit: 25,
        key: req.query.tag
    }).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );
}

exports.followers = function(req, res){
	couch.mango(db_name, {
        selector: {
            "_id": {
                "$eq": req.query.pool_id
            }
        },
        fields: ["_id", "_rev", "watchers"]
    }, {}).then(({data, headers, status}) => {
    	if(data.docs.length > 0){
    		let users = [];
    		for(var i = 0; i < data.docs[0].watchers.length; i++){
    			users.push({
    				"_id": {
    					"$eq": data.docs[0].watchers[i]
    				}
    			})
    		}
    		//console.log(users);
			couch.mango('sl-users', {
			   	selector: {	"$or": users },
			   fields: ["_rev", "_id", "name", "photo"]
			}, {}).then(({data, headers, status}) => res.json(data), err => res.json({'status':'error', 'reason':err}) );
    		
    	}
    }, err => res.json({'status':'error', 'reason':err}) );
}