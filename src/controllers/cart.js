const Cart = require('../models/cart');
const responeStandart = require('../helper/respone');
const schema = require('../helper/inputValidated');
const cartSchema = schema.cart;


module.exports = {
	findByStatusIn: (req, res) => {
		Cart.findByStatusIn(req.user.id, (err, respone)=>{
			if (!err) {
				return responeStandart(res, 'cart with status IN', { respone });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, 'Not found Cart with status IN', {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	findByStatusOut: (req, res) => {
		Cart.findByStatusOut(req.user.id, (err, respone)=>{
			if (!err) {
				return responeStandart(res, 'cart with status OUT', { respone });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, 'Not found Cart with status OUT', {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	addCart: async (req, res) => {
		try {
			const result = await cartSchema.validateAsync(req.body);
			const cart = {
				user_id: req.user.id,
				product_id: req.params.id,
				quantity: result.quantity || 1
			};
			Cart.addCart(cart, req.params.id, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'add to cart success', { respone });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, 'Not Found Product', {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		} catch (err) {
			return responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},
	
	createCart: async (req, res) => {
		try {
			const result = await cartSchema.validateAsync(req.body);
			const cart = {
				user_id: req.user.id,
				quantity: result.quantity || 1
			};
			Cart.createCart(cart, req.params.id, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'add to cart success', { respone });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, 'Not Found Product', {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		} catch (err) {
			return responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},

	chekOut: (req,res) => {
		Cart.CheckOut(req.user.id, (err, respone) => {
			if (!err) {
				return responeStandart(res, 'add to cart success', { respone });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, 'Not Found Product', {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	}
};