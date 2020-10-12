const db = require('../helper/db');
const query = require('../helper/sqlQuery');

const tableName = 'product_ratings';
const tableJoin = ['products', 'user'];

const Ratings = function (ratings) {
	this.product_id = ratings.product_id;
	this.user_id = ratings.user_id;
	this.rating = ratings.rating;
	this.comment = ratings.comment;
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

Ratings.findAll = (result) => {
	const contents = [
		tableName
	];

	db.query(query.findAll, contents, (err, res) => {
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
// START DB FOR PRODUCT DETAILS ROUTES
Ratings.findByProductId = (id, result) => {
	const contents = [
		tableName,
		{'product_id': id}
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
// END DB FOR PRODUCT DETAILS ROUTES
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

//	START DB FOR CUSTOMER RATINGS ROUTES
Ratings.findByUserId = (id, result) => {
	const contents = [
		[
			'product_ratings.id',
			'product_ratings.user_id',
			'product_ratings.product_id',
			'products.name',
			'product_ratings.rating',
			'product_ratings.comment',
			'product_ratings.created_at',
			'product_ratings.updated_at',
		],
		tableName,
		tableJoin[0],
		'product_ratings.product_id',
		'products.id',
		{'product_ratings.user_id': id}
	];

	db.query(query.findJoinTable, contents, (err, res) => {
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
Ratings.createByProductId = (ratings, id, result) => {
	const contentsValidate = [
		tableJoin[0],
		{ id: id }
	];
	const contents = [
		tableName,
		{
			...ratings
		}
	];

	db.query(query.findById, contentsValidate, (err, res) => {
		if (!err && res.length) {
			db.query(query.insert, contents, (err) => {
				if (!err) {
					result(null, {});
				} else {
					result(err, null);
				}
			});
		} else {
			console.log(err);
			result('Product is not found', null);
		}
	});
};
//	END DB FOR CUSTOMER RATINGS ROUTES





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