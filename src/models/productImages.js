const db = require('../helper/db');

const tableName = 'product_images';
const tableJoin = 'products';

const Images = function (images) {
	this.product_id = images.product_id;
	this.created_at = images.created_at;
	this.updated_at = images.updated_at;
	this.picture = images.picture;
};

// const queryFindAll = 'SELECT * FROM ??';
const queryFind = 'SELECT ??, DATE_FORMAT(??, "%d %M %Y") AS created_at, DATE_FORMAT(??, "%d %M %Y") AS updated_at ' + 
'FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?';
const queryInsert = 'INSERT INTO ?? SET ?';
const queryUpdate = 'UPDATE ?? SET ? WHERE ?';
const queryDelete = 'DELETE FROM ?? WHERE ?';
const queryValidate = 'SELECT * FROM ?? WHERE ?';

Images.create = (images, result) => {
	const contentsValidate = [
		tableJoin,
		{ id: images.product_id }
	];
	const contents = [
		tableName,
		{
			...images
		}
	];

	db.query(queryValidate, contentsValidate, (err, res) => {
		if (res.length) {
			db.query(queryInsert, contents, (err) => {
				if (!err) {
					result(null, { ...images });
				} else {
					result(err, null);
				}
			});
		} else {
			result('Product is not found', null);
		}
	});
};

Images.update = (images, id, result) => {
	const contents = [
		tableName,
		{
			...images
		},
		{ id: id }
	];

	db.query(queryUpdate, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, images);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Images.findByProductId = (id, result) => {
	const contents = [
		[
			'product_images.id',
			'product_images.picture',
			'products.name',
		],
		'product_images.created_at',
		'product_images.updated_at',
		tableName,
		tableJoin,
		'product_images.product_id',
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

Images.deleteByProductId = (id, result) => {
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

Images.delete = (id, result) => {
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

module.exports = Images;