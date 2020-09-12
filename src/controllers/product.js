/* eslint-disable no-unused-vars */
const Product = require('../models/product');
const { format } = require('date-fns');

module.exports = {
	create: (req, res) => {
		if (!req.body) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
		}
		const product = new Product({
			name: req.body.name,
			price: req.body.price,
			created_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
			updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
			categoryId: req.body.categoryId,
			description: req.body.description
		});
		Product.create(product, (err) => {
			if (!err) {
				res.status(201).send({
					success: true,
					message: 'Insert Data Success',
					data: { ...product }
				});
			} else {
				console.log(err);
				res.status(500).send({
					success: false,
					message: 'Insert Data Failled'
				});
			}
		});
	},

	findById: (req, res) => {
		Product.findById(req.params.id, (err, data) => {
			if (!err) {
				res.status(201).send({
					success: true,
					message: 'SELECT BY ID SUCCESS',
					data: data
				});
			} else {
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found member with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving Customer with id ' + req.params.id,
					});
				}
			}
		});
	},

	findAll: (req, res) => {
		Product.findAll((err, data) => {
			if (!err) {
				res.status(201).send({
					success: true,
					message: 'SELECT BY ID SUCCESS',
					data: data
				});
			} else {
				res.status(500).send({
					message: 'Error retrieving Customer with id ' + req.params.id,
				});
			}
		});
	},
};