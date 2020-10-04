const db = require('../helper/db');
const query = require('../helper/sqlQuery');

const tableName = 'product_images';
const tableJoin = 'products';

const Images = function (images) {
	this.product_id = images.product_id;
	this.created_at = images.created_at;
	this.updated_at = images.updated_at;
	this.picture = images.picture;
};

const queryFindImagePrimary = 'SELECT * FROM product_images WHERE ?? IN ? AND isPrimary>0';

Images.create = (images, result) => {
	const contents = [
		tableName,
		{
			...images
		}
	];

	db.query(query.insert, contents, (err) => {
		if (!err) {
			result(null, { ...images });
		} else {
			result(err, null);
		}
	});
};

Images.update = (images, id, result) => {
	const contents = [
		tableName,
		{
			...images
		},
		{ id: id },
	];

	db.query(query.update, contents, (err, res) => {
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

Images.findById = (id, result) => {
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

Images.findAll = (result) => {
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

Images.delete = (id, result) => {
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
//	START DB HOME ROUTES
Images.findImageByPrimary = (id, result) => {
	const contents = [
		'product_id',
		[id]
	];

	db.query(queryFindImagePrimary, contents, (err, res) => {
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
// END DB HOME ROUTES

//	START DB PRODUCT DETAILS ROUTE
Images.findByProductId = (id, result) => {
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
//	END DB PRODUCT DETAILS ROUTE

Images.createByProductId = (images, result) => {
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

	db.query(query.findById, contentsValidate, (err, res) => {
		if (res.length) {
			db.query(query.insert, contents, (err) => {
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

Images.deleteByProductId = (id, result) => {
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

module.exports = Images;