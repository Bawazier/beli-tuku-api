const db = require('../helper/db');

const tableName = 'product_ratings';
const tableJoin = ['products', 'user'];

const Ratings = function (ratings) {
	this.product_id = ratings.product_id;
	this.user_id = ratings.user_id;
	this.rating = ratings.rating;
	this.created_at = ratings.created_at;
	this.updated_at = ratings.updated_at;
};

// const queryFindAll = 'SELECT * FROM ??';
const queryFind = 'SELECT ??, DATE_FORMAT(??, "%d %M %Y") AS created_at, DATE_FORMAT(??, "%d %M %Y") AS updated_at ' +
'FROM ?? INNER JOIN ?? ON ?? = ?? INNER JOIN ?? ON ?? = ?? WHERE ?';
const queryInsert = 'INSERT INTO ?? SET ?';
const queryUpdate = 'UPDATE ?? SET ? WHERE ?';
const queryDelete = 'DELETE FROM ?? WHERE ?';
const queryValidate = 'SELECT * FROM ?? WHERE ?';

Ratings.create = (ratings, result) => {
	const contentsValidate = [
		tableJoin[0],
		{ id: ratings.product_id }
	];
	const contents = [
		tableName,
		{
			...ratings
		}
	];

	db.query(queryValidate, contentsValidate, (err, res) => {
		if (res.length) {
			db.query(queryInsert, contents, (err) => {
				if (!err) {
					result(null, { ...ratings });
				} else {
					result(err, null);
				}
			});
		} else {
			result('Product is not found', null);
		}
	});
};

Ratings.update = (ratings, id, result) => {
	const contents = [
		tableName,
		{
			...ratings
		},
		{ id: id }
	];

	db.query(queryUpdate, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, ratings);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Ratings.findByUserId = (id, result) => {
	const contents = [
		[
			'product_ratings.id',
			'product_ratings.rating',
			'product_ratings.product_id',
			'products.name',
			'product_ratings.user_id',
			'user.name'
		],
		'product_ratings.created_at',
		'product_ratings.updated_at',
		tableName,
		tableJoin[0],
		'product_ratings.product_id',
		'products.id',
		tableJoin[1],
		'product_ratings.user_id',
		'user.id',
		{'user.id': id}
	];

	db.query(queryFind, contents, (err, res) => {
		if (!err) {
			if (res.length) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Ratings.deleteByUserId = (id, result) => {
	const contents = [
		tableName,
		{user_id: id}
	];
	db.query(queryDelete, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Ratings.deleteByProductId = (id, result) => {
	const contents = [
		tableName,
		{product_id: id}
	];
	db.query(queryDelete, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Ratings.delete = (id, result) => {
	const contents = [
		tableName,
		{id: id}
	];
	db.query(queryDelete, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

module.exports = Ratings;