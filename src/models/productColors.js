const db = require('../helper/db');

const tableName = 'product_colors';
const tableJoin = 'products';

const Colors = function (colors) {
	this.product_id = colors.product_id;
	this.color = colors.color;
	this.status = colors.status;
};

// const queryFindAll = 'SELECT * FROM ??';
const queryFind = 'SELECT ?? FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?';
const queryInsert = 'INSERT INTO ?? SET ?';
const queryUpdate = 'UPDATE ?? SET ? WHERE ?';
const queryDelete = 'DELETE FROM ?? WHERE ?';
const queryValidate = 'SELECT * FROM ?? WHERE ?';

Colors.create = (colors, result) => {
	const contentsValidate = [
		tableJoin,
		{ id: colors.product_id }
	];
	const contents = [
		tableName,
		{
			...colors
		}
	];

	db.query(queryValidate, contentsValidate, (err, res) => {
		if (res.length) {
			db.query(queryInsert, contents, (err) => {
				if (!err) {
					result(null, { ...colors });
				} else {
					result(err, null);
				}
			});
		} else {
			result('Product is not found', null);
		}
	});
};

Colors.update = (colors, id, result) => {
	const contents = [
		tableName,
		{
			...colors
		},
		{ id: id }
	];

	db.query(queryUpdate, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, colors);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Colors.findByProductId = (id, result) => {
	const contents = [
		[
			'product_colors.id',
			'product_colors.color',
			'product_colors.status',
			'product_colors.product_id',
			'products.name',
		],
		tableName,
		tableJoin,
		'product_colors.product_id',
		'products.id',
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

Colors.deleteByProductId = (id, result) => {
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

Colors.delete = (id, result) => {
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

module.exports = Colors;