/* eslint-disable no-unused-vars */
const Product = require('../models/product');
const { format } = require('date-fns');

module.exports = {
	create: (req, res) =>{
		if (!req.body) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
		}
		const product = new Product({
			name: req.body.name,
			price: req.body.price,
			date: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
			categoryId: req.body.categoryId,
			description: req.body.description
		});
		Product.create(product, (err, data) => {
			if (!err) {
				res.status(201).send({
					success: true,
					message: 'Insert Data Success',
					data: req.body
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
};