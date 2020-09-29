const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const schema = require('../helper/userValidated');
const userSchema = schema.schemaUser;
const userUpdateSchema = schema.schemaUpdateUser;
const loginSchema = schema.schemaLogin;
const imagesSchema = schema.schemaImages;
const responeStandart = require('../helper/respone');


module.exports = {
	login: async (req, res) => {
		try {
			const result = await loginSchema.validateAsync(req.body);
			const user = {
				email: result.email,
				roles_id: result.roles_id
			};

			User.validateEmail(user, async (err, user) => {
				try {
					if (!err && user.length) {
						const comparePass = await bcrypt.compareSync(result.password, user[0].password);
						if (comparePass) {
							User.login((err, data) => {
								if (!err) {
									jwt.sign({ id: user[0].id }, process.env.PRIVATE_CODE, function (err, token) {
										if (!err) {
											return responeStandart(res, token, {});
										} else {
											return responeStandart(res, err, {}, 403, false);
										}
									});
								} else {
									return responeStandart(res, err.sqlMessage, {}, 500, false);
								}
							});
						}else {
							return responeStandart(res, 'Wrong Password', {}, 400, false);
						}
					} else {
						return responeStandart(res, 'Wrong Email', {}, 500, false);
					}
				} catch (e) {
					return responeStandart(res, e, {}, 400, false);
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},
	create: async (req, res) => {
		try {
			const result = await userSchema.validateAsync(req.body);
			const images = await imagesSchema.validateAsync(req.file.path);
			const saltRounds = 10;
			const salt = await bcrypt.genSaltSync(saltRounds);
			const hash = await bcrypt.hashSync(result.password, salt);
			const user = {
				roles_id: result.roles_id,
				name: result.name,
				email: result.email,
				password: hash,
				phone: result.phone,
				gender: result.gender,
				dateOfBirth: result.dateOfBirth,
				picture: images
			};

			User.create(user, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Insert Data Success', { data });
				} else {
					return responeStandart(res, err, {}, 500, false);
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	update: async (req, res) => {
		try {
			const result = await userUpdateSchema.validateAsync(req.body);
			// const images = await imagesSchema.validateAsync(req.file.path);
			const saltRounds = 10;
			const salt = await bcrypt.genSaltSync(saltRounds);
			const hash = await bcrypt.hashSync(result.password, salt);
			const user = {
				roles_id: result.roles_id,
				name: result.name,
				email: result.email,
				password: hash,
				phone: result.phone,
				gender: result.gender,
				dateOfBirth: result.dateOfBirth,
				// picture: images
			};
			let filteredObject = Object.keys(user).reduce((result, key) => {
				if (user[key] !== undefined) result[key] = user[key];
				return result;
			}, {});

			User.update(filteredObject, req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Update Data Success', { data });
				} else {
					return responeStandart(res, 'Update Data Failled', {}, 500, false);
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	findById: (req, res) => {
		User.findById(req.params.id, (err, data) => {
			if (!err) {
				return responeStandart(res, `SELECT BY ID ${req.params.id} Success`, { data, pictureURL: process.env.URL + data[0].picture });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	deleteById: (req, res) => {
		User.deleteById(req.params.id, (err, data) => {
			if (!err) {
				return responeStandart(res, `Delete ${req.params.id} Success`, { data });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	findAll: (req, res) => {
		User.findAll((err, data) => {
			if (!err) {
				return responeStandart(res, 'SELECT ALL SUCCESS', { data, pictureURL: process.env.URL + data[0].picture });
			} else {
				return responeStandart(res, 'SELECT ALL FAILLED', {}, 500, false);
			}
		});
	},
};