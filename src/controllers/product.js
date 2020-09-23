/* eslint-disable no-unused-vars */
const Product = require('../models/product');
const { format } = require('date-fns');
const qs = require('querystring');
const schema = require('../helper/userValidated');
const productSchema = schema.schemaProduct;
const productUpdateSchema = schema.schemaUpdateProduct;
const responeUser = require('../helper/respone');


module.exports = {
	create: async (req, res) => {
		try {
			const result = await productSchema.validateAsync(req.body);
			const product = new Product({
				name: result.name,
				price: result.price,
				created_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
				updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
				categoryId: result.categoryId,
				description: result.description,
				picture: req.file.path
			});
			Product.create(product, (err, data) => {
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
			const result = await productSchema.validateAsync(req.body);
			const product = new Product({
				name: result.name,
				price: result.price,
				updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
				categoryId: result.categoryId,
				description: result.description,
				picture: req.file.path
			});
			Product.updateAll(product, req.params.id, (err, data) => {
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
			const result = await productUpdateSchema.validateAsync(req.body);
			const product = Object.entries(result).map((item)=>{
				return parseInt(item[1])>0?`${item[0]} =${item[1]}` : `${item[0]} ='${item[1]}'`;
			});

			Product.updateById(product, req.params.id, (err, data) => {
			// if(product.name && product.price && product.updated_at, product.categoryId, product.description)
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
		Product.findById(req.params.id, (err, data) => {
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
				responeUser(res, `Error retrieving User with id ${req.params.id}.`, {}, 500, false);
			}
		});
	},

	deleteById: (req, res) => {
		Product.deleteById(req.params.id, (err, data) => {
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
	}
};