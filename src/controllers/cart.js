const Cart = require('../models/cart');


module.exports = {
	create: (req, res) => {
		const cart = {
			user_id: req.body.user_id,
			product_id: req.body.product_id,
			quantity: req.body.quantity
		};

		if (!cart.user_id || !cart.product_id || !cart.quantity) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
		}else{
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
		}
	},

	updateQuantity: (req, res) => {
		const cart = {
			quantity: req.body.quantity
		};

		if (!cart.quantity) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
		}else{
			Cart.updateQuantity(cart, req.params.id, (err, data) => {
				if (!err) {
					res.status(201).send({
						success: true,
						message: 'Update Data Success',
						data: { ...cart }
					});
				} else {
					console.log(err);
					res.status(500).send({
						success: false,
						message: 'Update Data Failled',
						data: data
					});
				}
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