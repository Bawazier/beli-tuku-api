/* eslint-disable no-unused-vars */
const Product = require('../models/product');
const { format } = require('date-fns');
const qs = require('querystring');
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
					responeStandart(res, 'Insert Data Success', { data });
				} else {
					responeStandart(res, err, {}, 500, false);
				}
			});
		} catch (err) {
			responeStandart(res, err.details[0].message, {}, 400, false);
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
					responeStandart(res, `Update Data By Id ${req.params.id} Success`, { data });

				} else {
					if (err.kind === 'not_found') {
						responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
					} else {
						responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
					}
				}
			});
		} catch (err) {
			responeStandart(res, err.details[0].message, {}, 400, false);
		}
	},

	findById: (req, res) => {
		Product.findById(req.params.id, (err, data) => {
			if (!err) {
				responeStandart(res, `SELECT BY ID ${req.params.id} Success`, { data });
			} else {
				if (err.kind === 'not_found') {
					responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	findByUserId: (req, res) => {
		Product.findByUserId(req.params.id, (err, data) => {
			if (!err) {
				responeStandart(res, `SELECT BY User ID ${req.params.id} Success`, { data });
			} else {
				if (err.kind === 'not_found') {
					responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	findAll: (req, res) => {
		let { page=1, limit=5, search, sortBy='id', sort='ASC' } = req.query;
		let searchKey = '';
		let searchValue = '';
		if (typeof (search) === 'object') {
			searchKey = Object.keys(search)[0];
			searchValue = Object.values(search)[0];
		} else {
			searchKey = 'product.name';
			searchValue = search || '';
		}

		const pageInfo = {
			count: 0,
			pages: 0,
			currentPage: page,
			limitPage: limit,
			nextLink: null,
			prevLink: null
		};

		const offset = (page - 1) * limit;
		Product.findAll(offset, limit, searchKey, searchValue, sortBy, sort, (err, respone, data) => {
			if (!err) {
				const { count } = data[0];
				pageInfo.count = count;
				pageInfo.pages = Math.ceil(count / limit);

				const { pages, currentPage } = pageInfo;

				if (currentPage < pages) {
					pageInfo.nextLink = `http://localhost:5000/product?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`;
				}

				if (currentPage > 1) {
					pageInfo.prevLink = `http://localhost:5000/product?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`;
				}


				res.status(201).send({
					success: true,
					message: 'SELECT ALL SUCCESS',
					data: respone,
					pageInfo
				});
			} else {
				responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
			}
		});
	},

	deleteById: (req, res) => {
		Product.deleteById(req.params.id, (err, data) => {
			if(!err){
				responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	},

	deleteByUserId: (req, res) => {
		Product.deleteByUserId(req.params.id, (err, data) => {
			if(!err){
				responeStandart(res, `Delete ${req.params.id} Success`, { data });
			}else{
				if (err.kind === 'not_found') {
					responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
				} else {
					responeStandart(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
				}
			}
		});
	}
};