const Category = require('../models/category');


module.exports = {
	create: (req, res) => {
		if (!req.body) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
		}

		const category = {
			name: req.body.name
		};

		Category.create(category, (err, data) => {
			if(!err){
				res.status(201).send({
					success: true,
					message: 'Create New Category Success',
					data: data
				});
			}else{
				res.status(201).send({
					success: false,
					message: 'Create New Category Failled'
				});
			}
		});
	},

	findAll: (req, res) => {
		Category.findAll((err, data) => {
			if(!err){
				res.status(201).send({
					success: true,
					message: 'Find All Category Success',
					data: data
				});
			}else{
				res.status(201).send({
					success: false,
					message: 'Find All Category Failled'
				});
			}
		});
	}
};