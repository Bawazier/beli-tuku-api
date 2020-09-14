/* eslint-disable no-unused-vars */
const Product = require('../models/product');
const { format } = require('date-fns');
const qs = require('querystring');
const schema = require('../helper/userValidated');
const productSchema = schema.schemaProduct;
const productUpdateSchema = schema.schemaUpdateProduct;


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
				description: result.description
			});
			Product.create(product, (err) => {
				if (!err) {
					res.status(201).send({
						success: true,
						message: 'Insert Data Success',
						data: { ...product }
					});
				} else {
					res.status(500).send({
						success: false,
						message: 'Insert Data Failled',
						data: err
					});
				}
			});
		} catch (err) {
			res.status(400).send({
				message: err.details[0].message,
			});		
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
				description: result.description
			});
			Product.updateAll(product, req.params.id, (err, data) => {
				if (!err) {
					res.send({
						success: true,
						message: 'Updated Success',
						data: data
					});
				} else {
					res.send({
						success: false,
						message: 'Updated Failled',
						data: err
					});
				}
			});
		} catch (err) {
			res.status(400).send({
				message: err.details[0].message,
			});		
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
					res.send({
						success: true,
						message: 'Updated Success',
						data: data
					});
				} else {
					if (err.kind === 'not_found') {
						res.status(404).send({
							message: `Not found Product with id ${req.params.id}.`,
						});
					} else {
						res.status(500).send({
							message: 'Error retrieving Product with id ' + req.params.id,
						});
					}
				}
			});
		} catch (err) {
			res.status(400).send({
				message: err.details[0].message,
			});		
		}
	},

	findById: (req, res) => {
		Product.findById(req.params.id, (err, data) => {
			if (!err) {
				res.status(201).send({
					success: true,
					message: 'SELECT BY ID SUCCESS',
					data: data
				});
			} else {
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found Product with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving Product with id ' + req.params.id,
					});
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
			searchKey = 'name';
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
				res.status(500).send({
					message: 'Error retrieving Product with id ' + req.params.id,
				});
			}
		});
	},

	deleteById: (req, res) => {
		Product.deleteById(req.params.id, (err, data) => {
			if(!err){
				res.status(201).send({
					success: true,
					message: `Delete ${req.params.id} Success`,
					data: data
				});
			}else{
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found Product with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving Product with id ' + req.params.id,
					});
				}
			}
		});
	}
};