const Cart = require('../models/cart');
const schema = require('../helper/userValidated');
const cartSchema = schema.schemaCart;
const cartUpdateSchema = schema.schemaUpdateCart;

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
					res.status(201).send({
						success: true,
						message: 'Insert Data Success',
						data: { ...cart }
					});
				} else {
					res.status(500).send({
						success: false,
						message: 'Insert Data Failled',
						data: err
					});
				}
			});		
		} catch (err) {
			res.status(400).send({
				message: err.details[0].message,
			});		
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
					res.status(201).send({
						success: true,
						message: 'Update Data Success',
						data: { ...cart }
					});
				} else {
					res.status(500).send({
						success: false,
						message: 'Update Data Failled',
						data: data
					});
				}
			});
		} catch (err) {
			res.status(400).send({
				message: err.details[0].message,
			});		
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
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found Cart with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving Cart with id ' + req.params.id,
					});
				}
			}
		});
	},

	findById: (req, res) => {
		Cart.findById(req.params.id, (err, data) => {
			if (!err) {
				res.status(201).send({
					success: true,
					message: 'SELECT BY ID SUCCESS',
					data: data
				});
			} else {
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found cart with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving cart with id ' + req.params.id,
					});
				}
			}
		});
	},

	deleteById: (req, res) => {
		Cart.deleteById(req.params.id, (err, data) => {
			if(!err){
				res.status(201).send({
					success: true,
					message: `Delete ${req.params.id} Success`,
					data: data
				});
			}else{
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found cart with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving cart with id ' + req.params.id,
					});
				}
			}
		});
	},

	findAll: (req, res) => {
		Cart.findAll((err, data) => {
			if (!err) {
				res.status(201).send({
					success: true,
					message: 'SELECT ALL SUCCESS',
					data: data
				});
			} else {
				res.status(500).send({
					message: 'Error retrieving cart with id ' + req.params.id,
				});
			}
		});
	},
};