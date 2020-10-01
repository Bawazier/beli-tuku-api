const db = require('../helper/db');
const query = require('../helper/sqlQuery');

const tableName = 'cart';
const tableJoin = ['products', 'user'];

let totalPrice = 0;
const Cart = function (cart) {
	this.user_id = cart.user_id;
	this.product_id = cart.product_id;
	this.quantity = cart.quantity;
	this.totalPrice = totalPrice;
};

Cart.create = (cart, result) => {
	const contents = [
		tableName,
		{
			...cart
		}
	];

	db.query(query.insert, contents, (err) => {
		if (!err) {
			result(null, { ...cart });
		} else {
			result(err, null);
		}
	});
};

Cart.update = (cart, id, result) => {
	const contents = [
		tableName,
		{
			...cart
		},
		{ id: id },
	];

	db.query(query.update, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, cart);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Cart.findById = (id, result) => {
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

Cart.findAll = (id, result) => {
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

Cart.delete = (id, result) => {
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

Cart.findByUserId = (id, result) => {
	const contents = [
		[
			'cart.id',
			'cart.user_id',
			'cart.product_id',
			'Cart.name',
			'cart.quantity',
			'products.name as productName',
			'products.price',
			'cart.totalPrice',
		],
		tableName,
		tableJoin[0],
		'cart.product_id',
		'products.id',
		{ 'cart.user_id': id }
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

Cart.deleteByUserId = (id, result) => {
	const contents = [
		tableName,
		{ user_id: id }
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

Cart.deleteByProductId = (id, result) => {
	const contents = [
		tableName,
		{ product_id: id }
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

module.exports = Cart;