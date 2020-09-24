const jwt = require('jsonwebtoken');
const User = require('../models/user');
const schema = require('../helper/userValidated');
const userSchema = schema.schemaUser;
const userUpdateSchema = schema.schemaUpdateUser;
const responeUser = require('../helper/respone');


module.exports = {
	login: async (req, res) => {
		// const result = await userLoginSchema.validateAsync(req.body);
		const user = {
			email: req.body.email,
			password: req.body.password
		};
		User.login(user, (err, data) => {
			if(!err && data.length){
				jwt.sign({ id: data[0].id }, 'KODE', function(err, token) {
					if(!err){
						responeUser(res, token, {});
					}else{
						responeUser(res, 'Login Gagal', {}, 403, false);
					}
				});
			}else{
				responeUser(res, 'Login Gagal', {}, 500, false);
			}
		});
	},
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
					responeUser(res, 'Insert Data Success', { data });
				} else {
					responeUser(res, 'Insert Data Failled', {}, 500, false);
				}
			});
		} catch (err) {
			responeUser(res, err.details[0].message, {}, 400, false);
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
					responeUser(res, 'Update Data Success', { data });
				} else {
					responeUser(res, 'Update Data Failled', {}, 500, false);
				}
			});
		} catch (err) {
			responeUser(res, err.details[0].message, {}, 400, false);
		}
	},

	updateById: async (req, res) => {
		try {
			const result = await userUpdateSchema.validateAsync(req.body);
			const user = Object.entries(result).map((item)=>{
				return parseInt(item[1])>0?`${item[0]} =${item[1]}` : `${item[0]} ='${item[1]}'`;
			});

			User.updateById(user, req.params.id, (err, data) => {
				if (!err) {
					responeUser(res, `Update Data By Id ${req.params.id} Success`, { data });
				} else {
					if (err.kind === 'not_found') {
						responeUser(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
					} else {
						responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
					}
				}
			});
		} catch (err) {
			responeUser(res, err.details[0].message, {}, 400, false);
		}
	},

	findById: (req, res) => {
		User.findById(req.params.id, (err, data) => {
			if (!err) {
				responeUser(res, `SELECT BY ID ${req.params.id} Success`, { data });
			} else {
				if (err.kind === 'not_found') {
					responeUser(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	deleteById: (req, res) => {
		User.deleteById(req.params.id, (err, data) => {
			if(!err){
				responeUser(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					responeUser(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	findAll: (req, res) => {
		User.findAll((err, data) => {
			if (!err) {
				responeUser(res, 'SELECT ALL SUCCESS', { data });
			} else {
				responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
			}
		});
	},
};