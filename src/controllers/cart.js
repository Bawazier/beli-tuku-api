const Cart = require('../models/cart');
const schema = require('../helper/userValidated');
const cartSchema = schema.schemaCart;
const cartUpdateSchema = schema.schemaUpdateCart;
const responeStandart = require('../helper/respone');

module.exports = {
	create: async (req, res) => {
		try {
			const result = await cartSchema.validateAsync(req.body);
			const cart = {
				user_id: result.user_id,
				product_id: result.product_id,
				quantity: result.quantity
			};
			Cart.create(cart, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Insert Data Success', { data });
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			});
		} catch (err) {
			return responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},

	update: async (req, res) => {
		try {
			const result = await cartUpdateSchema.validateAsync(req.body);
			const cart = {
				quantity: result.quantity
			};
			Cart.update(cart, req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Update Data Success', { data });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found User with id ${req.params.id} in Cart.`, {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		} catch (err) {
			return responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},

	findByUserId: (req, res) => {
		Cart.findByUserId(req.params.id, (err, data) => {
			if (!err) {
				return responeStandart(res, `SELECT BY ID ${req.params.id} Success`, { data });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found Cart with id ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	deleteByUserId: (req, res) => {
		Cart.deleteByUserId(req.params.id, (err, data) => {
			if(!err){
				return responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found User with id ${req.params.id} in Cart.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	deleteByProductId: (req, res) => {
		Cart.deleteByProductId(req.params.id, (err, data) => {
			if(!err){
				return responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found Product with id ${req.params.id} in Cart.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	delete: (req, res) => {
		Cart.delete(req.params.id, (err, data) => {
			if(!err){
				return responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found Cart with id ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},
};