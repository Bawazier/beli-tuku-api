const db = require('../config/db');

const tableName = '`cart`';

const Cart = function (cart) {
	this.user_id = cart.user_id;
	this.product_id = cart.product_id;
	this.quantity = cart.quantity;
	this.totalPrice = cart.totalPrice;
};

Cart.create = (cart, result) => {
	db.query(`INSERT INTO ${tableName} (user_id, product_id, quantity, totalPrice) 
	VALUES (?,?,?,?)`, [cart.user_id, cart.product_id, cart.quantity, cart.totalPrice],
	(err, res) => {
		if(!err){
			result(null, { ...cart });
		}else{
			result(err, res);
		}
	});
};

Cart.findById = (id, result) => {
	db.query(`SELECT * FROM ${tableName} WHERE id=?`, [id], (err, res) => {
		if(!err) {
			if(res.length){
				result(null, res);
			}else{
				result({ kind: 'not_found' }, null);
			}
		}else{
			result(err, null);
		}
	});
};

Cart.updateAll = (cart, id, result) => {
	db.query(`UPDATE ${tableName} SET user_id=?, product_id=?, quantity=?, totalPrice=? WHERE id=?`, 
		[cart.user_id, cart.product_id, cart.quantity , cart.totalPrice, id], 
		(err, res) => {
			if(!err){
				result(null, {...cart});
			}else{
				result(err, res);
			}
		});
};

Cart.findAll = (result) =>{
	db.query(`SELECT * FROM ${tableName}`, (err, res) => {
		if(!err){
			result(null, res);
		}else{
			result(err, null);
		}
	});
};

Cart.deleteById = (id, result) => {
	db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id], (err, res) => {
		if(!err){
			result(null, res);
		}else{
			result(err, null);
		}
	});
};

module.exports = Cart;