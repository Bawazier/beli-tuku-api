const db = require('../helper/db');
const query = require('../helper/sqlQuery');

const tableName = 'products';
const tableJoin = ['category', 'conditions', 'user'];

const Products = function (products) {
	this.user_id = products.user_id;
	this.category_id = products.category_id;
	this.conditions_id = products.conditions_id;
	this.name = products.name;
	this.price = products.price;
	this.stock = products.stock;
	this.maxSize = products.maxSize;
	this.created_at = products.created_at;
	this.updated_at = products.updated_at;
	this.description = products.description;
};

Products.create = (products, result) => {
	const contents = [
		tableName,
		{
			...products
		}
	];

	db.query(query.insert, contents, (err) => {
		if (!err) {
			result(null, { ...products });
		} else {
			result(err, null);
		}
	});
};

Products.update = (products, id, result) => {
	const contents = [
		tableName,
		{
			...products
		},
		{ id: id },
	];

	db.query(query.update, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, products);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Products.findById = (id, result) => {
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

Products.findAll = (id, result) => {
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

Products.delete = (id, result) => {
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

Products.createByValidated = (products, result) => {
	const contentsValidate = [
		tableJoin[0],
		{ id: products.category_id }
	];
	const contents = [
		tableName,
		{
			...products
		}
	];

	db.query(query.findById, contentsValidate, (err, res) => {
		if (res.length) {
			db.query(query.insert, contents, (err) => {
				if (!err) {
					result(null, { ...products });
				} else {
					result(err, null);
				}
			});
		} else {
			result('Category is not found', null);
		}
	});

};

Products.customFindById = (id, result) => {
	const contents = [
		[
			'products.user_id',
			'products.category_id',
			'products.conditions_id',
			'products.name',
			'products.price',
			'products.stock',
			'products.maxSize',
			'products.description',
			'user.name AS nameUser',
			'category.name AS nameCategory',
			'conditions.status AS condition',
			'DATE_FORMAT(created_at, "%d %M %Y")',
			'DATE_FORMAT(updated_at, "%d %M %Y")',
		],
		tableName,
		tableJoin[2],
		'products.user_id',
		'user.id',
		tableJoin[0],
		'products.category_id',
		'category.id',
		tableJoin[1],
		'products.conditions_id',
		'conditions.id',
		{'products.id': id}
	];

	db.query(query.findJoinThirdTable, contents, (err, res) => {
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

Products.findByUserId = (id, result) => {
	const contents = [
		[
			'products.id',
			'products.user_id',
			'products.category_id',
			'products.conditions_id',
			'products.name',
			'products.price',
			'products.stock',
			'products.maxSize',
			'products.description',
			'user.name AS nameUser',
			'category.name AS nameCategory',
			'conditions.status AS condition',
			'DATE_FORMAT(created_at, "%d %M %Y")',
			'DATE_FORMAT(updated_at, "%d %M %Y")',
		],
		tableName,
		tableJoin[2],
		'products.user_id',
		'user.id',
		tableJoin[0],
		'products.category_id',
		'category.id',
		tableJoin[1],
		'products.conditions_id',
		'conditions.id',
		{'user.id': id}
	];

	db.query(query.findJoinThirdTable, contents, (err, res) => {
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

Products.findAll = (offset, limit, searchKey, searchValue, sortBy, sort, result) => {
	const contents = [
		[
			'products.user_id',
			'products.category_id',
			'products.conditions_id',
			'products.name',
			'products.price',
			'products.stock',
			'products.maxSize',
			'products.description',
			'user.name AS nameUser',
			'category.name AS nameCategory',
			'conditions.status AS condition',
			'DATE_FORMAT(created_at, "%d %M %Y")',
			'DATE_FORMAT(updated_at, "%d %M %Y")',
		],
		tableName,
		tableJoin[2],
		'products.user_id',
		'user.id',
		tableJoin[0],
		'products.category_id',
		'category.id',
		tableJoin[1],
		'products.conditions_id',
		'conditions.id',
		searchKey,
		'%'+searchValue+'%',
		'products.'+sortBy,
		// sort,
		limit,
		offset
	];
	

	db.query(query.findJoinThirdWithLimit, contents, (err, res) => {
		if (!err) {
			if (res.length) {
				db.query(`SELECT COUNT(*) AS count FROM ${tableName} WHERE ${searchKey} LIKE '%${searchValue}%'`,
					(err, data) => {
						result(null, res, data);
					});
			} else {
				result({ kind: 'not_found' }, null, null);
			}
		} else {
			result(err, null, null);
		}
	});
};

Products.deleteByUserId = (id, result) => {
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

module.exports = Products;