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
	this.isCheck = cart.isCheck;
	this.status = cart.status;
};

const queryFindByStatus = 'SELECT cart.*, products.name, products.price, IF(product_images.isPrimary>0, product_images.picture, NULL) AS image ' +
'FROM cart INNER JOIN products ON cart.product_id = products.id ' +
'LEFT JOIN product_images ON product_images.product_id = products.id '+
'WHERE cart.user_id = ? AND cart.status = ? GROUP BY cart.id';
const queryCreateOut = 'UPDATE ?? SET ? WHERE ? AND isCheck>0';

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

Cart.findAll = (result) => {
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
//	START DB FOR CUSTOMER CART ROUTES
Cart.findByStatusIn = (id, result) => {
	const contents = [
		id,
		'IN'
	];
	db.query(queryFindByStatus, contents, (err, res) => {
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
},
Cart.findByStatusOut = (id, result) => {
	const contents = [
		id,
		'OUT'
	];
	db.query(queryFindByStatus, contents, (err, res) => {
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
},
Cart.addCart = (cart, id, result) => {
	const contentsValidate = [
		tableJoin[0],
		{id:id}
	];
	const contents = (price) => [
		tableName,
		{
			user_id: cart.user_id,
			product_id: id,
			quantity: cart.quantity,
			totalPrice: price * cart.quantity,
			isCheck: 0,
			status: 'IN'
		}
	];

	db.query(query.findById, contentsValidate, (err, respone) => {
		if(!err && respone.length){
			db.query(query.insert, contents(respone[0].price), (err, res) => {
				if(!err){
					result(null, res);
				} else {
					result(err, null);
				}
			});
		}else{
			result({ kind: 'not_found' }, null);
		}
	});
},
Cart.createCart = (cart, id, result) => {
	const getCart = [
		tableName,
		{id:id}
	];
	const getProduct = (product_id) => [
		tableJoin[0],
		{id: product_id}
	];
	const contents = (price) => [
		tableName,
		{
			quantity: cart.quantity,
			totalPrice: price * cart.quantity,
			isCheck: '1',
			status: 'IN'
		},
		{user_id: cart.user_id},
		{id: id},
	];
	db.query(query.findById, getCart, (err, data)=>{
		if(!err && data.length){
			db.query(query.findById, getProduct(data[0].product_id), (err, respone) => {
				if(!err && respone.length){
					db.query(query.updateSecondCondition, contents(respone[0].price), (err, res) => {
						if(!err){
							if (res.affectedRows != 0) {
								result(null, res);
							} else {
								result({ kind: 'not_found' }, null);
							}
						}else{
							console.log(err);
							result(err, null);
						}
					});
				}else{
					result({ kind: 'not_found' }, null);
				}
			});
		}else{
			result({ kind: 'not_found' }, null);
		}
	});
},
Cart.CheckOut = (id, result) => {
	const contents = [
		tableName,
		{
			status: 'OUT'
		},
		{user_id: id},
	];
	db.query(queryCreateOut, contents, (err, res) => {
		if (!err) {
			console.log(res);
			if (res.affectedRows != 0) {
				result(null, {});
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
},
//	END DB FOR CUSTOMER CART ROUTES

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