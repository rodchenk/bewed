'use strict';

const TABLE = 'pool';

exports.getAll = function(req, res){
	let query = `select * from ${TABLE}`;
	db_sql.query(query, (error, result) => res.json(result) )
}

exports.getByUser = function(req, res){
	let user = req.query.user_id;
	let query = `select * from ${TABLE} where user = '${user}';`
	db_sql.query(query, (error, result) => {
		if(error){
			throw error
		}
		res.json(result)
	})
}

exports.getByID = function(req, res){
	let id = req.query.pool_id;
	let query = `select * from ${TABLE} where id = '${id}';`
	db_sql.query(query, (error, result) => {
		if(error){
			throw error
		}
		res.json(result)
	})
}

exports.getPublished = function(req, res){
	let user = req.query.user_id;
	let query = `select * from ${TABLE} where user = '${user}' AND published = 1;`
	db_sql.query(query, (error, result) => {
		if(error){
			throw error
		}
		res.json(result)
	})
}