const Category = require('../models/category');
const schema = require('../helper/userValidated');
const globalSchema = schema.schemaGlobal;
const imagesSchema = schema.schemaImages;
const responeStandart = require('../helper/respone');


module.exports = {
	create: async (req, res) => {
		try {
			const result = await globalSchema.validateAsync(req.body);
			const images = await imagesSchema.validateAsync(req.file.path);
			const category = {
				name: result.name,
				image: images
			};
			Category.create(category, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Insert Data Success', { data });
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			});
		} catch (err) {
			return responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},

	update: async (req, res) => {
		try {
			const result = await globalSchema.validateAsync(req.body);
			const images = await imagesSchema.validateAsync(req.file.path);
			const category = {
				name: result.name,
				image: images
			};
			let filteredObject = Object.keys(category).reduce((result, key) => {
				if (category[key] !== undefined) result[key] = category[key];
				return result;
			}, {});

			Category.update(filteredObject, req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Update Data Success', { data });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found Category with id ${req.params.id}.`, {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		} catch (err) {
			return responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},

	findAll: (req, res) => {
		Category.findAll((err, data) => {
			let newData = data.map(item => {
				let images = {URL_image: process.env.URL + item.image};
				return Object.assign({}, item, images);
			});
			if (!err) {
				return responeStandart(res, 'SELECT ALL SUCCESS', {newData});
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found Category ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	delete: (req, res) => {
		Category.delete(req.params.id, (err, data) => {
			if(!err){
				return responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found Category with id ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	}
};