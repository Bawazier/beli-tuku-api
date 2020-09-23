const db = require('../helper/db');

const tableName = '`cart`';
const tableJoin = ['`product`', '`user`'];

let totalPrice = 0;
const Cart = function (cart) {
	this.user_id = cart.user_id;
	this.product_id = cart.product_id;
	this.quantity = cart.quantity;
	this.totalPrice = totalPrice;
};

Cart.create = (cart, result) => {
	db.query(`SELECT user.id, product.id, product.price FROM ${tableJoin[0]}, ${tableJoin[1]} 
	WHERE user.id=? AND product.id=?`, [cart.user_id, cart.product_id], (err, res) => {
		if (res.length) {
			cart.totalPrice = res[0].price * cart.quantity;
			db.query(`INSERT INTO ${tableName} (user_id, product_id, quantity, totalPrice) 
			VALUES (?,?,?,?)`, [cart.user_id, cart.product_id, cart.quantity, cart.totalPrice],
			(err, res) => {
				if (!err) {
					result(null, { ...cart });
				} else {
					result(err, res);
				}
			});
		}else{
			result('data not found', null);
		}
	});
};

Cart.updateQuantity = (cart, id, result) => {
	db.query(`SELECT cart.id, product.price FROM ${tableName} INNER JOIN ${tableJoin[0]} 
	ON cart.product_id = product.id WHERE cart.id = ?`, [id], (err, res) => {
		if (res.length) {
			cart.totalPrice = res[0].price * cart.quantity;
			db.query(`UPDATE ${tableName} SET quantity=?, totalPrice=? WHERE id=?`,
				[cart.quantity, cart.totalPrice, id],
				(err, res) => {
					if (!err) {
						result(null, { ...cart });
					} else {
						result(err, res);
					}
				});
		}else{
			result('data not found', null);
		}
	});
};

Cart.updateById = (cart, id, result) => {
	db.query(`UPDATE ${tableName} SET ${cart} WHERE id=?`,
		[id],
		(err, res) => {
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

Cart.findById = (id, result) => {
	db.query('SELECT cart.id, user.name AS nameUser, product.name AS productName, product.price, cart.quantity, cart.totalPrice ' + 
	'FROM cart INNER JOIN user ON cart.user_id = user.id INNER JOIN product ON cart.product_id = product.id WHERE cart.id=?', [id], (err, res) => {
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



Cart.findAll = (result) => {
	db.query('SELECT cart.id, user.name AS nameUser, product.name AS productName, product.price, cart.quantity, cart.totalPrice ' + 
	'FROM cart INNER JOIN user ON cart.user_id = user.id INNER JOIN product ON cart.product_id = product.id',
	(err, res) => {
		if (!err) {
			result(null, res);
		} else {
			result(err, null);
		}
	});
};

Cart.deleteById = (id, result) => {
	db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id], (err, res) => {
		if (!err) {
			result(null, res);
		} else {
			result(err, null);
		}
	});
};

module.exports = Cart;