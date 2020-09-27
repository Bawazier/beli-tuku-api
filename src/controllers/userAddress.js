const Address = require('../models/userAddress');
const schema = require('../helper/userValidated');
const userAddressSchema = schema.schemaUserAddress;
const userAddressUpdateSchema = schema.schemaUpdateUserAddress;
const responeStandart = require('../helper/respone');


module.exports = {
	create: async (req, res) => {
		try {
			const result = await userAddressSchema.validateAsync(req.body);
			const address = {
				user_id: result.user_id,
				name: result.name,
				recipient_name: result.recipient_name,
				recipient_tlp: result.recipient_tlp,
				address: result.address,
				region: result.region,
				postal_code: result.postal_code
			};

			Address.create(address, (err, data) => {
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
			const result = await userAddressUpdateSchema.validateAsync(req.body);
			// const images = await imagesSchema.validateAsync(req.file.path);
			const address = {
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

			Address.update(filteredObject, req.params.id, (err, data) => {
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

	findByUserId: (req, res) => {
		Address.findByUserId(req.params.id, (err, data) => {
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
    
	deleteByUserId: (req, res) => {
		Address.deleteByUserId(req.params.id, (err, data) => {
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

	delete: (req, res) => {
		Address.delete(req.params.id, (err, data) => {
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
};