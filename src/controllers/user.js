const jwt = require('jsonwebtoken');
const User = require('../models/user');
const schema = require('../helper/userValidated');
const userSchema = schema.schemaUser;
const userUpdateSchema = schema.schemaUpdateUser;
const loginSchema = schema.schemaLogin;
const imagesSchema = schema.schemaImages;
const responeStandart = require('../helper/respone');


module.exports = {
	login: async (req, res) => {
		const result = await loginSchema.validateAsync(req.body);
		const user = {
			email: result.email,
			password: result.password
		};
		User.login(user, (err, data) => {
			if (!err && data.length) {
				jwt.sign({ id: data[0].id }, 'KODE', function (err, token) {
					if (!err) {
						return responeStandart(res, token, {});
					} else {
						return responeStandart(res, 'Login Gagal', {}, 403, false);
					}
				});
			} else {
				return responeStandart(res, 'Login Gagal', {}, 500, false);
			}
		});
	},
	create: async (req, res) => {
		try {
			const result = await userSchema.validateAsync(req.body);
			const images = await imagesSchema.validateAsync(req.file.path);
			const user = {
				name: result.name,
				email: result.email,
				password: result.password,
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
			const user = {
				name: result.name,
				email: result.email,
				password: result.password,
				phone: result.phone,
				gender: result.gender,
				dateOfBirth: result.dateOfBirth,
				picture: req.file.path
			};
			User.update(user, req.params.id, (err, data) => {
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
				return responeStandart(res, `SELECT BY ID ${req.params.id} Success`, { data });
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
				return responeStandart(res, 'SELECT ALL SUCCESS', { data });
			} else {
				return responeStandart(res, 'SELECT ALL FAILLED', {}, 500, false);
			}
		});
	},
};