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
					responeStandart(res, 'Insert Data Success', { data });
				} else {
					responeStandart(res, 'Insert Data Failled', {}, 500, false);
				}
			});
		} catch (err) {
			responeStandart(res, err.details[0].message, {}, 400, false);
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
					responeStandart(res, 'Update Data Success', { data });
				} else {
					responeStandart(res, 'Update Data Failled', {}, 500, false);
				}
			});
		} catch (err) {
			responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},

	findByUserId: (req, res) => {
		Cart.findByUserId(req.params.id, (err, data) => {
			if (!err) {
				responeStandart(res, `SELECT BY ID ${req.params.id} Success`, { data });
			} else {
				if (err.kind === 'not_found') {
					responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	deleteByUserId: (req, res) => {
		Cart.deleteByUserId(req.params.id, (err, data) => {
			if(!err){
				responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	deleteByProductId: (req, res) => {
		Cart.deleteByProductId(req.params.id, (err, data) => {
			if(!err){
				responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	delete: (req, res) => {
		Cart.delete(req.params.id, (err, data) => {
			if(!err){
				responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},
};