const qs = require('querystring');
const Product = require('../models/product');
const Images = require('../models/productImages');
const Colors = require('../models/productColors');
const Ratings = require('../models/productRatings');

const responeStandart = require('../helper/respone');


module.exports = {
	findAllProducts: (req, res) => {
		Product.findById(req.params.id, (err, data) => {
			if(!err){
				Images.findByProductId(req.params.id, (err, image)=>{
					// let products = data.map(item => {
					// 	let image = images.forEach(image => image[item.length].picture);
					// 	return Object.assign({}, {item}, image);
					// });
					if(!err){
						Colors.findByProductId(req.params.id, (err, color)=>{
							if(!err){
								Ratings.findByProductId(req.params.id, (err, rating)=>{
									if(!err){
										return responeStandart(
											res,
											'GET ALL Products success',
											Object.assign({}, {data}, {images: image}, {colors: color}, {ratings: rating}));
									}else{
										return responeStandart(
											res,
											'GET ALL Products success No Ratings',
											Object.assign({}, {data}, {images: image}, {colors: color}));
									}
								});
							}else{
								if (err.kind === 'not_found') {
									return responeStandart(res, `Not found Product with id ${req.params.id}.`, {}, 404, false);
								} else {
									return responeStandart(res, err.sqlMessage, {}, 500, false);
								}
							}
						});
					}else{
						if (err.kind === 'not_found') {
							return responeStandart(res, `Not found Product with id ${req.params.id}.`, {}, 404, false);
						} else {
							return responeStandart(res, err.sqlMessage, {}, 500, false);
						}
					}
				});
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found Product with id ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
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
			searchKey = 'products.name';
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
					pageInfo.nextLink = `${process.env.URL}home/products/?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`;
				}

				if (currentPage > 1) {
					pageInfo.prevLink = `${process.env.URL}home/products/${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`;
				}


				res.status(201).send({
					success: true,
					message: 'SELECT ALL SUCCESS',
					data: respone,
					pageInfo
				});
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, `Not found Product ${req.params.id}.`, {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},
};