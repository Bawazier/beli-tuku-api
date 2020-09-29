const User = require('../models/user');
const Address = require('../models/userAddress');
const schema = require('../helper/userValidated');
const responeStandart = require('../helper/respone');

const accountSchema = schema.profile[0];
const addressSchema = schema.profile[1];

module.exports = {
	// MY ACCOUNT
	findAccount: (req, res) => {
		User.findById(req.user.id, (err, respone) => {
			if(!err){
				const data = respone.map(item => {
					const picture = {URL_image: process.env.URL + item.picture};
					return Object.assign({}, item, picture);
				});
				return responeStandart(res, 'Get info account success', {data});
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, 'not found account', {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	updateAccount: async (req, res) => {
		try {
			const result = await accountSchema.validateAsync(req.body);
			const user = {
				name: result.name,
				email: result.email,
				phone: result.phone,
				gender: result.gender,
				dateOfBirth: result.dateOfBirth,
				picture: req.file.path
			};
			let filteredObject = Object.keys(user).reduce((result, key) => {
				if (user[key] !== undefined) result[key] = user[key];
				return result;
			}, {});
			User.update(filteredObject, req.user.id, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'Update Account Success', { respone });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, 'not found account', {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	updateAccountAll: async (req, res) => {
		try {
			const result = await accountSchema.required().validateAsync(req.body);
			const user = {
				name: result.name,
				email: result.email,
				phone: result.phone,
				gender: result.gender,
				dateOfBirth: result.dateOfBirth,
				picture: req.file.path
			};

			User.update(user, req.user.id, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'Update Account Success', { respone });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, 'account not found', {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage || err, {}, 500, false);
					}
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	// MY SHOPPING ADDRESS
	findAddress: (req, res) => {
		Address.findByUserId(req.user.id, (err, respone) => {
			if (!err) {
				return responeStandart(res, 'get user address success', { respone });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, 'address not found', {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	createAddress: async (req, res) => {
		try {
			const result = await addressSchema.required().validateAsync(req.body);
			const address = {
				user_id: req.user.id,
				name: result.name,
				recipient_name: result.recipient_name,
				recipient_tlp: result.recipient_tlp,
				address: result.address,
				region: result.region,
				postal_code: result.postal_code
			};

			Address.create(address, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'Insert address Success', { respone });
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	updateAddress: async (req, res) => {
		try {
			const result = await addressSchema.validateAsync(req.body);
			const address = {
				user_id: req.user.id,
				name: result.name,
				recipient_name: result.recipient_name,
				recipient_tlp: result.recipient_tlp,
				address: result.address,
				region: result.region,
				postal_code: result.postal_code
			};
			let filteredObject = Object.keys(address).reduce((result, key) => {
				if (address[key] !== undefined) result[key] = address[key];
				return result;
			}, {});

			Address.update(filteredObject, req.params.id, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'Update address Success', { respone });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, 'address not found', {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	updateAddressAll: async (req, res) => {
		try {
			const result = await addressSchema.required().validateAsync(req.body);
			const address = {
				user_id: req.user.id,
				name: result.name,
				recipient_name: result.recipient_name,
				recipient_tlp: result.recipient_tlp,
				address: result.address,
				region: result.region,
				postal_code: result.postal_code
			};

			Address.update(address, req.params.id, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'Update address Success', { respone });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, 'address not found', {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},
};