const Colors = require('../models/productColors');
const schema = require('../helper/userValidated');
const productColorsSchema = schema.schemaProductColors;
const productColorsUpdateSchema = schema.schemaUpdateProductColors;
const responeStandart = require('../helper/respone');

module.exports = {
	create: async (req, res) => {
		try{
			const result = await productColorsSchema.validateAsync(req.body);
			const colors = {
				product_id: result.product_id,
				color: result.color,
				status: result.status,
			};
			Colors.create(colors, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Insert Data Success', { data });
				} else {
					return responeStandart(res, err, {}, 500, false);
				}
			});
		}catch(e){
			responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	update: async (req, res) => {
		try{
			const result = await productColorsUpdateSchema.validateAsync(req.body);
			const colors = {
				color: result.color,
				status: result.status,
			};
			let filteredObject = Object.keys(colors).reduce((result, key) => {
				if (colors[key] !== undefined) result[key] = colors[key];
				return result;
			}, {});
			Colors.update(filteredObject, req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Update Data Success', { data });
				} else {
					return responeStandart(res, err, {}, 500, false);
				}
			});
		}catch(e){
			responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	findByProductId: async (req, res) => {
		try{
			Colors.findByProductId(req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Find By product Id Success', { data });
				} else {
					return responeStandart(res, err, {}, 500, false);
				}
			});
		}catch(e){
			responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	deleteByProductId: async (req, res) => {
		try{
			Colors.deleteByProductId(req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Delete By product Id Success', { data });
				} else {
					return responeStandart(res, err, {}, 500, false);
				}
			});
		}catch(e){
			responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	delete: async (req, res) => {
		try{
			Colors.delete(req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Delete image Success', { data });
				} else {
					return responeStandart(res, err, {}, 500, false);
				}
			});
		}catch(e){
			responeStandart(res, e.details[0].message, {}, 400, false);
		}
	}
};