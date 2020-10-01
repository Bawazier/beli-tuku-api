const db = require('../helper/db');
const query = require('../helper/sqlQuery');

const tableName = 'product_ratings';
const tableJoin = ['products', 'user'];

const Ratings = function (ratings) {
	this.product_id = ratings.product_id;
	this.user_id = ratings.user_id;
	this.rating = ratings.rating;
	this.created_at = ratings.created_at;
	this.updated_at = ratings.updated_at;
};

Ratings.create = (ratings, result) => {
	const contents = [
		tableName,
		{
			...ratings
		}
	];

	db.query(query.insert, contents, (err) => {
		if (!err) {
			result(null, { ...ratings });
		} else {
			result(err, null);
		}
	});
};

Ratings.update = (ratings, id, result) => {
	const contents = [
		tableName,
		{
			...ratings
		},
		{ id: id },
	];

	db.query(query.update, contents, (err, res) => {
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

Ratings.findById = (id, result) => {
	const contents = [
		tableName,
		{ id: id }
	];

	db.query(query.findById, contents, (err, res) => {
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

Ratings.findAll = (id, result) => {
	const contents = [
		tableName
	];

	db.query(query.findById, contents, (err, res) => {
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

Ratings.delete = (id, result) => {
	const contents = [
		tableName,
		{ id: id }
	];
	db.query(query.delete, contents, (err, res) => {
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

//Custom

Ratings.createByProductId = (ratings, result) => {
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

	db.query(query.findById, contentsValidate, (err, res) => {
		if (res.length) {
			db.query(query.insert, contents, (err) => {
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

Ratings.findByUserId = (id, result) => {
	const contents = [
		[
			'product_ratings.id',
			'product_ratings.rating',
			'product_ratings.product_id',
			'products.name',
			'product_ratings.user_id',
			'user.name',
			'DATE_FORMAT(created_at, "%d %M %Y")',
			'DATE_FORMAT(updated_at, "%d %M %Y")',
		],
		tableName,
		tableJoin[0],
		'product_ratings.product_id',
		'products.id',
		tableJoin[1],
		'product_ratings.user_id',
		'user.id',
		{'user.id': id}
	];

	db.query(query.findJoinSecondTable, contents, (err, res) => {
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

Ratings.findByProductId = (id, result) => {
	const contents = [
		[
			'product_ratings.id',
			'product_ratings.rating',
			'product_ratings.product_id',
			'products.name',
			'product_ratings.user_id',
			'user.name',
			'DATE_FORMAT(created_at, "%d %M %Y")',
			'DATE_FORMAT(updated_at, "%d %M %Y")',
		],
		tableName,
		tableJoin[0],
		'product_ratings.product_id',
		'products.id',
		tableJoin[1],
		'product_ratings.user_id',
		'user.id',
		{'products.id': id}
	];

	db.query(query.findJoinSecondTable, contents, (err, res) => {
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
	db.query(query.delete, contents, (err, res) => {
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
	db.query(query.delete, contents, (err, res) => {
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