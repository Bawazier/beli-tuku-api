const Images = require('../models/productImages');
const { format } = require('date-fns');
const schema = require('../helper/userValidated');
const imagesSchema = schema.schemaImages;
const productImagesSchema = schema.schemaProductImages;
const responeStandart = require('../helper/respone');

module.exports = {
	create: async (req, res) => {
		try{
			const result = await productImagesSchema.validateAsync(req.body.product_id);
			const image = await imagesSchema.validateAsync(req.file.path);
			const images = {
				product_id: result,
				picture: image,
				created_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
				updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
			};
			Images.create(images, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Insert Data Success', { data });
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			});
		}catch(e){
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	update: async (req, res) => {
		try{
			const image = await imagesSchema.validateAsync(req.file.path);
			const images = {
				picture: image,
				updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
			};
			Images.update(images, req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Update Data Success', { data });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found Product with id ${req.params.id}.`, {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		}catch(e){
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	findByProductId: async (req, res) => {
		try{
			Images.findByProductId(req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Find By product Id Success', {data, pictureURL: process.env.URL+data[0].picture });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found Product with id ${req.params.id}.`, {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		}catch(e){
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	deleteByProductId: async (req, res) => {
		try{
			Images.deleteByProductId(req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Delete By product Id Success', { data });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found Product with id ${req.params.id}.`, {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		}catch(e){
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	delete: async (req, res) => {
		try{
			Images.delete(req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Delete image Success', { data });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found Product Images with id ${req.params.id}.`, {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		}catch(e){
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	}
};