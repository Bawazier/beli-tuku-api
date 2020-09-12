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
	},

	findById: (req, res) => {
		Category.findById(req.params.id, (err, data) => {
			if(!err){
				res.status(201).send({
					success: true,
					message: 'Find Category By ID Success',
					data: data
				});
			}else{
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found Category with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving Category with id ' + req.params.id,
					});
				}
			}
		});
	},

	update: (req, res) => {
		if (!req.body) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
		}

		const category = {
			name: req.body.name
		};

		Category.update(category, req.params.id, (err, data) => {
			if (!err) {
				res.send({
					success: true,
					message: 'Updated Success',
					data: data
				});
			} else {
				res.send({
					success: false,
					message: 'Updated Failled'
				});
			}
		});
	},

	delete: (req, res) => {
		Category.delete(req.params.id, (err, data) => {
			if(!err){
				res.status(201).send({
					success: true,
					message: `Delete ${req.params.id} Success`,
					data: data
				});
			}else{
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found Category with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving Category with id ' + req.params.id,
					});
				}
			}
		});
	}
};