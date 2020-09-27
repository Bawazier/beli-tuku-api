const db = require('../helper/db');

const tableName = 'cart';
const tableJoin = ['products', 'user'];

let totalPrice = 0;
const Cart = function (cart) {
	this.user_id = cart.user_id;
	this.product_id = cart.product_id;
	this.quantity = cart.quantity;
	this.totalPrice = totalPrice;
};

// const queryFindAll = 'SELECT * FROM ??';
const queryFind = 'SELECT ?? FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?';
const queryInsert = 'INSERT INTO ?? SET ?';
const queryUpdate = 'UPDATE ?? SET ? WHERE ?';
const queryDelete = 'DELETE FROM ?? WHERE ?';
const queryValidate = 'SELECT * FROM ?? WHERE ?';

Cart.create = (cart, result) => {
	const contentsValidate = [
		tableJoin[0],
		{ id: cart.product_id },
	];
	
	db.query(queryValidate, contentsValidate, (err, res) => {
		let total = cart.quantity * res[0].price;
		const contents = [
			tableName,
			{
				...cart,
				totalPrice: total
			}
		];
		if (res.length) {
			db.query(queryInsert, contents, (err) => {
				if (!err) {
					result(null, { ...cart });
				} else {
					result(err, null);
				}
			});
		} else {
			result('Cart is not found', null);
		}
	});
};

Cart.update = (cart, id, result) => {
	const contentsGetProductId = [
		tableName,
		{ id: id }
	];
	db.query(queryValidate, contentsGetProductId, (err, res) => {
		if(!err){
			const contentsValidate = [
				tableJoin[0],
				{ id: res[0].product_id },
			];
			db.query(queryValidate, contentsValidate, (err, res) => {
				let total = cart.quantity * res[0].price;
				const contents = [
					tableName,
					{
						...cart,
						totalPrice: total
					},
					{ id: id }
				];
				if (res.length) {
					db.query(queryUpdate, contents, (err, res) => {
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
				} else {
					result('Cart is not found', null);
				}
			});
		}else{
			result('Cart is not found', null);
		}
	});
};

Cart.findByUserId = (id, result) => {
	const contents = [
		[
			'cart.id',
			'cart.user_id',
			'products.name',
			'cart.quantity',
			'products.price',
			'cart.totalPrice',
		],
		tableName,
		tableJoin[0],
		'cart.product_id',
		'products.id',
		{ 'cart.user_id': id }
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

Cart.deleteByUserId = (id, result) => {
	const contents = [
		tableName,
		{ user_id: id }
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

Cart.deleteByProductId = (id, result) => {
	const contents = [
		tableName,
		{ product_id: id }
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

Cart.delete = (id, result) => {
	const contents = [
		tableName,
		{ id: id }
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

module.exports = Cart;