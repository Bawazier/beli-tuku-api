const User = require('../models/user');


module.exports = {
	create: (req, res) => {
		const user = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			phone: req.body.phone,
			gender: req.body.gender,
			dateOfBirth: req.body.dateOfBirth
		};

		if (!user.name || !user.email || !user.password || !user.phone) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
		}else{
			User.create(user, (err, data) => {
				if (!err) {
					res.status(201).send({
						success: true,
						message: 'Insert Data Success',
						data: { ...user }
					});
				} else {
					console.log(err);
					res.status(500).send({
						success: false,
						message: 'Insert Data Failled',
						data: data
					});
				}
			});		
		}
	},

	updateAll: (req, res) => {
		const user = {
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			phone: req.body.phone,
			gender: req.body.gender,
			dateOfBirth: req.body.dateOfBirth
		};

		if (!user.name || !user.email || !user.password || !user.phone) {
			res.status(400).send({
				message: 'Content can not be empty!',
			});
		}else{
			User.updateAll(user, req.params.id, (err, data) => {
				if (!err) {
					res.status(201).send({
						success: true,
						message: 'Update Data Success',
						data: { ...user }
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
		const user = Object.entries(req.body).map((item)=>{
			return parseInt(item[1])>0?`${item[0]} =${item[1]}` : `${item[0]} ='${item[1]}'`;
		});

		User.updateById(user, req.params.id, (err, data) => {
			// if(user.name && user.price && user.updated_at, user.categoryId, user.description)
			if (!err) {
				res.send({
					success: true,
					message: 'Updated Success',
					data: data
				});
			} else {
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found User with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving User with id ' + req.params.id,
					});
				}
			}
		});
	},

	findById: (req, res) => {
		User.findById(req.params.id, (err, data) => {
			if (!err) {
				res.status(201).send({
					success: true,
					message: 'SELECT BY ID SUCCESS',
					data: data
				});
			} else {
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found User with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving User with id ' + req.params.id,
					});
				}
			}
		});
	},

	deleteById: (req, res) => {
		User.deleteById(req.params.id, (err, data) => {
			if(!err){
				res.status(201).send({
					success: true,
					message: `Delete ${req.params.id} Success`,
					data: data
				});
			}else{
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found User with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving User with id ' + req.params.id,
					});
				}
			}
		});
	},

	findAll: (req, res) => {
		User.findAll((err, data) => {
			if (!err) {
				res.status(201).send({
					success: true,
					message: 'SELECT ALL SUCCESS',
					data: data
				});
			} else {
				res.status(500).send({
					message: 'Error retrieving User with id ' + req.params.id,
				});
			}
		});
	},
};