'use strict';

const TABLE = 'pool';

function run_query(query, res){
	db_sql.query(query, (error, result) => {
		if(error) res.json({'status':'error', 'reason':error})
		res.json(result)
	})
}

exports.getAll = function(req, res){
	const query = `select * from ${TABLE}`;
	run_query(query, res)
}

exports.getByUser = function(req, res){
	const user = req.query.user_id;
	const query = `select * from ${TABLE} where user = '${user}';`
	run_query(query, res)
}

exports.getByID = function(req, res){
	const id = req.query.pool_id;
	const query = `select * from ${TABLE} where id = '${id}';`
	run_query(query, res)
}

exports.getPublished = function(req, res){
	const user = req.query.user_id;
	const query = `select * from ${TABLE} where user = '${user}' AND published = 1;`
	run_query(query, res)
}

exports.add = function(req, res){
	const pool = {
        name: req.body.data.name,
        category: req.body.data.category,
        user: req.body.user,
        layout: req.body.data.layout
    };
    const query = `INSERT INTO ${TABLE} ('name', 'user', 'layout') VALUES ('${name}', '${user}', '${layout}')`;
    run_query(query, res)
}

/**
* 	@TODO
*/
exports.update = function(req, res){
	const name = req.query.pool.name;
	const query = `UPDATE ${POOL} SET 'pool' = '${name}' //todo`;
	run_query(query, res);
}

exports.delete = function(req, res){
	const pool_id = req.query._id;
	const query = `DELETE ${TABLE} WHERE id='${pool_id}';`;
	run_query(query, res);
}

exports.news = function(req, res){}
exports.follows = function(req, res){}
exports.tags = function(req, res){}
exports.followers = function(req, res){}