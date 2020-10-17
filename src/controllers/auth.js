const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const schema = require('../helper/inputValidated');
const responeStandart = require('../helper/respone');

const loginSchema = schema.auth[0];
const registerCustomerSchema = schema.auth[1];
const registerSallerSchema = schema.auth[2];

module.exports = {
	login: async (req, res) => {
		try {
			const result = await loginSchema.required().validateAsync(req.body);
			const user = {
				email: result.email,
				roles_id: await result.roles_id === 'customer' ? 3: result.roles_id === 'saller' ? 2:false
			};

			User.login(user, async (err, user) => {
				try {
					if (!err && user.length) {
						const comparePass = await bcrypt.compareSync(result.password, user[0].password);
						if (comparePass) {
							jwt.sign({ id: user[0].id, roles_id: user[0].roles_id }, process.env.PRIVATE_CODE, function (err, token) {
								if (!err) {
									return responeStandart(res, 'Loggin Success', { token: token, auth: { id: user[0].id, roles_id: user[0].roles_id }});
								} else {
									return responeStandart(res, err, {}, 403, false);
								}
							});
						} else {
							return responeStandart(res, 'Wrong Password', {}, 400, false);
						}
					} else {
						return responeStandart(res, 'Wrong Email', {}, 500, false);
					}
				} catch (e) {
					return responeStandart(res, e.details[0].message, {}, 400, false);
				}
			});
		} catch (e) {
			console.log(e);
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}

	},


	registerCustomer: async (req, res) => {
		try {
			const result = await registerCustomerSchema.required().validateAsync(req.body);
			const saltRounds = 10;
			const salt = await bcrypt.genSaltSync(saltRounds);
			const hash = await bcrypt.hashSync(result.password, salt);
			const user = {
				roles_id: 3,
				name: result.name,
				email: result.email,
				password: hash,
			};

			User.createByValidated(user, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Register Customer Success', { data });
				} else {
					return responeStandart(res, err, {}, 500, false);
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	registerSaller: async (req, res) => {
		try {
			const result = await registerSallerSchema.required().validateAsync(req.body);
			const saltRounds = 10;
			const salt = await bcrypt.genSaltSync(saltRounds);
			const hash = await bcrypt.hashSync(result.password, salt);
			const user = {
				roles_id: 2,
				name: result.name,
				email: result.email,
				phone: result.phone,
				password: hash,
			};

			User.createByValidated(user, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Register Saller Success', { data });
				} else {
					return responeStandart(res, err, {}, 500, false);
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},
};