/* eslint-disable no-unused-vars */
const Product = require('../models/product');
const { format } = require('date-fns');
const schema = require('../helper/userValidated');
const productSchema = schema.schemaProduct;
const productUpdateSchema = schema.schemaUpdateProduct;
const responeStandart = require('../helper/respone');


module.exports = {
	create: async (req, res) => {
		try {
			const result = await productSchema.validateAsync(req.body);
			const product = new Product({
				user_id: result.user_id,
				category_id: result.category_id,
				conditions_id: result.conditions_id,
				name: result.name,
				price: result.price,
				stock: result.stock,
				maxSize: result.maxSize,
				created_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
				updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
				description: result.description,
			});
			Product.create(product, (err, data) => {
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
			const result = await productUpdateSchema.validateAsync(req.body);
			const product = new Product({
				user_id: result.user_id,
				category_id: result.category_id,
				conditions_id: result.conditions_id,
				name: result.name,
				price: result.price,
				stock: result.stock,
				maxSize: result.maxSize,
				updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
				description: result.description,
			});
			let filteredObject = Object.keys(product).reduce((result, key) => {
				if (product[key] !== undefined) result[key] = product[key];
				return result;
			}, {});
			
			Product.update(filteredObject, req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, `Update Data By Id ${req.params.id} Success`, { data });

				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found Product with id ${req.params.id}.`, {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		} catch (err) {
			return responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},

	findById: (req, res) => {
		Product.findById(req.params.id, (err, data) => {
			if (!err) {
				return responeStandart(res, `SELECT BY ID ${req.params.id} Success`, { data });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found Product with id ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	findByUserId: (req, res) => {
		Product.findByUserId(req.params.id, (err, data) => {
			if (!err) {
				return responeStandart(res, `SELECT BY User ID ${req.params.id} Success`, { data });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found User with id ${req.params.id} in product.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	deleteById: (req, res) => {
		Product.deleteById(req.params.id, (err, data) => {
			if(!err){
				return responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found product with id ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	deleteByUserId: (req, res) => {
		Product.deleteByUserId(req.params.id, (err, data) => {
			if(!err){
				return responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found User with id ${req.params.id} in product.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	}
};