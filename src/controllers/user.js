const User = require('../models/user');
const schema = require('../helper/userValidated');
const userSchema = schema.schemaUser;
const userUpdateSchema = schema.schemaUpdateUser;


module.exports = {
	create: async (req, res) => {
		try {
			const result = await userSchema.validateAsync(req.body);
			const user = {
				name: result.name,
				email: result.email,
				password: result.password,
				phone: result.phone,
				gender: result.gender,
				dateOfBirth: result.dateOfBirth
			};
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
		} catch (err) {
			res.status(400).send({
				message: err.details[0].message,
			});		
		}
	},

	updateAll: async (req, res) => {
		try {
			const result = await userSchema.validateAsync(req.body);
			const user = {
				name: result.name,
				email: result.email,
				password: result.password,
				phone: result.phone,
				gender: result.gender,
				dateOfBirth: result.dateOfBirth
			};
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
		} catch (err) {
			res.status(400).send({
				message: err.details[0].message,
			});		
		}
	},

	updateById: async (req, res) => {
		try {
			const result = await userUpdateSchema.validateAsync(req.body);
			const user = Object.entries(result).map((item)=>{
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
		} catch (err) {
			res.status(400).send({
				message: err.details[0].message,
			});		
		}
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