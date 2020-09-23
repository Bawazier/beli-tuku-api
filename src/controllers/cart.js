const Cart = require('../models/cart');
const schema = require('../helper/userValidated');
const cartSchema = schema.schemaCart;
const cartUpdateSchema = schema.schemaUpdateCart;
const responeUser = require('../helper/respone');

module.exports = {
	create: async (req, res) => {
		try {
			const result = await cartSchema.validateAsync(req.body);
			const cart = {
				user_id: result.user_id,
				product_id: result.product_id,
				quantity: result.quantity
			};
			Cart.create(cart, (err) => {
				if (!err) {
					responeUser(res, 'Insert Data Success', { data });
				} else {
					responeUser(res, 'Insert Data Failled', {}, 500, false);
				}
			});
		} catch (err) {
			responeUser(res, err.details[0].message, {}, 400, false);
		}
	},

	updateQuantity: async (req, res) => {
		try {
			const result = await cartUpdateSchema.validateAsync(req.body);
			const cart = {
				quantity: result.quantity
			};
			Cart.updateQuantity(cart, req.params.id, (err, data) => {
				if (!err) {
					responeUser(res, 'Update Data Success', { data });
				} else {
					responeUser(res, 'Update Data Failled', {}, 500, false);
				}
			});
		} catch (err) {
			responeUser(res, err.details[0].message, {}, 400, false);
		}
	},

	updateById: (req, res) => {
		if (!req.body) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
		}
		const cart = Object.entries(req.body).map((item)=>{
			return parseInt(item[1])>0?`${item[0]} =${item[1]}` : `${item[0]} ='${item[1]}'`;
		});

		Cart.updateById(cart, req.params.id, (err, data) => {
			// if(cart.name && cart.price && cart.updated_at, cart.categoryId, cart.description)
			if (!err) {
				res.send({
					success: true,
					message: 'Updated Success',
					data: data
				});
			} else {
				if (!err) {
					responeUser(res, `Update Data By Id ${req.params.id} Success`, { data });
				} else {
					if (err.kind === 'not_found') {
						responeUser(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
					} else {
						responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
					}
				}
			}
		});
	},

	findById: (req, res) => {
		Cart.findById(req.params.id, (err, data) => {
			if (!err) {
				responeUser(res, `SELECT BY ID ${req.params.id} Success`, { data });
			} else {
				if (err.kind === 'not_found') {
					responeUser(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	deleteById: (req, res) => {
		Cart.deleteById(req.params.id, (err, data) => {
			if(!err){
				responeUser(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					responeUser(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	findAll: (req, res) => {
		Cart.findAll((err, data) => {
			if (!err) {
				responeUser(res, 'SELECT ALL SUCCESS', { data });
			} else {
				responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
			}
		});
	},
};