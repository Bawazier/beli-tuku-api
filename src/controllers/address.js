const Address = require('../models/userAddress');
const responeStandart = require('../helper/respone');
const schema = require('../helper/inputValidated');

const addressSchema = schema.profileCustomer[1];


module.exports = {
	findAddressByUserId: (req, res) => {
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

	createAddressByUserId: async (req, res) => {
		try {
			const result = await addressSchema.required().validateAsync(req.body);
			const address = {
				user_id: req.user.id,
				name: result.name,
				recipient_name: result.recipient_name,
				recipient_tlp: result.recipient_tlp,
				address: result.address,
				region: result.region,
				postal_code: result.postal_code,
				isPrimary: 0
			};

			Address.create(address, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'create new address success', {respone});
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			});
		} catch (e) {
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	updateAddressByUserId: async (req, res) => {
		try {
			const result = await addressSchema.validateAsync(req.body);
			const address = {
				user_id: req.user.id,
				name: result.name,
				recipient_name: result.recipient_name,
				recipient_tlp: result.recipient_tlp,
				address: result.address,
				region: result.region,
				postal_code: result.postal_code,
				isPrimary: 0
			};
			let filteredObject = Object.keys(address).reduce((result, key) => {
				if (address[key] !== undefined) result[key] = address[key];
				return result;
			}, {});

			Address.updateByUserId(filteredObject, req.params.id, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'change address success', { respone });
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

	updateAddressAllByUserId: async (req, res) => {
		try {
			const result = await addressSchema.required().validateAsync(req.body);
			const address = {
				user_id: req.user.id,
				name: result.name,
				recipient_name: result.recipient_name,
				recipient_tlp: result.recipient_tlp,
				address: result.address,
				region: result.region,
				postal_code: result.postal_code,
				isPrimary: 0
			};

			Address.updateByUserId(address, req.params.id, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'change address success', { respone });
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

	updatePrimaryAddress: async (req, res) => {
		try {
			const result = await addressSchema.required().validateAsync(req.body);
			const address = {
				user_id: req.user.id,
				isPrimary: result.isPrimary === 'true' ? 1:0
			};

			Address.updatePrimary(address, req.params.id, (err) => {
				if (!err) {
					return responeStandart(res, 'change primary address success', {});
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
	}
};