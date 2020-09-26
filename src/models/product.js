/* eslint-disable no-unused-vars */
const db = require('../helper/db');

const tableName = 'products';
const tableJoin = ['category', 'conditions', 'user'];

const Product = function (product) {
	this.user_id = product.user_id;
	this.category_id = product.category_id;
	this.conditions_id = product.conditions_id;
	this.name = product.name;
	this.price = product.price;
	this.stock = product.stock;
	this.maxSize = product.maxSize;
	this.created_at = product.created_at;
	this.updated_at = product.updated_at;
	this.description = product.description;
};


const queryFindById = 'SELECT * FROM ?? WHERE ?';
const queryInsert = 'INSERT INTO ?? SET ?';
const queryUpdate = 'UPDATE ?? SET ? WHERE ?';
const queryDelete = 'DELETE FROM ?? WHERE ?';
const queryFind = 'SELECT ??, ?? AS saller_name, ?? AS category_name, ?? AS conditions_status, ' + 
'DATE_FORMAT(??, "%d %M %Y") AS created_at, DATE_FORMAT(??, "%d %M %Y") AS updated_at ' + 
'FROM (?? INNER JOIN ?? ON ?? = ??) INNER JOIN ?? ON ?? = ?? INNER JOIN ?? ON ?? = ?? WHERE ?';
const queryFindAll = 'SELECT ??, ?? AS saller_name, ?? AS category_name, ?? AS conditions_status, ' + 
'DATE_FORMAT(??, "%d %M %Y") AS created_at, DATE_FORMAT(??, "%d %M %Y") AS updated_at ' + 
'FROM (?? INNER JOIN ?? ON ?? = ??) INNER JOIN ?? ON ?? = ?? INNER JOIN ?? ON ?? = ?? WHERE ? LIKE %?%' +
'ORDER BY ? ? LIMIT ? OFFSET ?';


Product.create = (product, result) => {
	const contentsValidate = [
		tableJoin[0],
		{ id: product.category_id }
	];
	const contents = [
		tableName,
		{
			...product
		}
	];

	db.query(queryFindById, contentsValidate, (err, res) => {
		if (res.length) {
			db.query(queryInsert, contents, (err) => {
				if (!err) {
					result(null, { ...product });
				} else {
					result(err, null);
				}
			});
		} else {
			result('Category is not found', null);
		}
	});

};

Product.findById = (id, result) => {
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
		],
		'user.name',
		'category.name',
		'conditions.status',
		'created_at',
		'updated_at',
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

Product.findByUserId = (id, result) => {
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
		],
		'user.name',
		'category.name',
		'conditions.status',
		'created_at',
		'updated_at',
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

Product.findAll = (offset, limit, searchKey, searchValue, sortBy, sort, result) => {
	const contents = [
		[
			'user.name AS Custommer Name',
			'category.name AS Category Product',
			'condition.name AS Condition Product',
			'product.name',
			'product.price',
			'product.stock',
			'product.maxSize',
			'product.created_at',
			'product.updated_at',
			'product.description',
		],
		[
			`${tableName} INNER JOIN ${tableJoin[0]} ON product.category_id = category.id`,
			`INNER JOIN ${tableJoin[1]} ON product.conditions_id = condition.id`,
			`INNER JOIN ${tableJoin[2]} ON product.user_id = user.id`,
			`WHERE ${searchKey} LIKE '%${searchValue}%' 
			ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`,
		]
	];
	

	db.query(queryFindAll, contents, (err, res) => {
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

Product.update = (product, id, result) => {
	const contents = [
		tableName,
		{
			...product
		},
		{ id: id }
	];

	db.query(queryUpdate, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, product);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Product.deleteById = (id, result) => {
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

Product.deleteByUserId = (id, result) => {
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

module.exports = Product;