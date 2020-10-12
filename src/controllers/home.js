const Product = require('../models/product');
const Category = require('../models/category');
const Images = require('../models/productImages');
const responeStandart = require('../helper/respone');

module.exports = {
	findProductBySearch: (req, res) => {
		let { search } = req.query;
		let searchKey = '';
		let searchValue = '';
		if (typeof (search) === 'object') {
			searchKey = Object.keys(search)[0];
			searchValue = Object.values(search)[0];
		} else {
			searchKey = 'products.name';
			searchValue = search || '';
		}
		
		Product.findBySearch(searchKey, searchValue, (err, respone) => {
			let data = respone.map(item => item.id);
			Images.findImageByPrimary(data, (err, image) => {
				let imagesPrimary = image.map(getImage => {
					return {
						id_product: getImage.product_id,
						URL_image: process.env.URL + getImage.picture
					};
				});
				if(!err){
					return responeStandart(res, `search ${searchValue}`, {respone, imagesPrimary});
				}else{
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found Product with ${searchValue}.`, {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		});	

	},

	findCategory: (req, res) => {
		Category.findAll((err, respone) => {
			if (!err) {
				const data = respone.map((item) => {
					const picture = { URL_image: process.env.URL + item.picture };
					return Object.assign({}, item, picture);
				});
				return responeStandart(res, 'get category', { data });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, 'not found category', {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},
	
	findProductByCategoryId: (req, res) => {
		Product.findByCategoryId(req.params.id, (err, respone) => {
			let data = respone.map(item => item.id);
			Images.findImageByPrimary(data, (err, image) => {
				let imagesPrimary = image.map(getImage => {
					return {
						id_product: getImage.product_id,
						URL_image: process.env.URL + getImage.picture
					};
				});
				if(!err){
					return responeStandart(res, `select product with category id ${req.params.id} success`, {respone, imagesPrimary});
				}else{
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found Product with category id ${req.params.id}.`, {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		});
	},

	findProductSortByCreatedAt: (req, res) => {
		Product.findByCreatedAt((err, respone) => {
			let data = respone.map(item => item.id);
			Images.findImageByPrimary(data, (err, image) => {
				let imagesPrimary = image.map(getImage => {
					return {
						id_product: getImage.product_id,
						URL_image: process.env.URL + getImage.picture
					};
				});
				if(!err){
					return responeStandart(res, 'find new products success', {respone, imagesPrimary});
				}else{
					if (err.kind === 'not_found') {
						return responeStandart(res, 'not found new products', {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		});
	},

	findProductSortByRatings: (req, res) => {
		Product.findByRatings((err, respone) => {
			let data = respone.map(item => item.id);
			Images.findImageByPrimary(data, (err, image) => {
				let imagesPrimary = image.map(getImage => {
					return {
						id_product: getImage.product_id,
						URL_image: process.env.URL + getImage.picture
					};
				});
				if(!err){
					return responeStandart(res, 'find populer products success', {respone, imagesPrimary});
				}else{
					if (err.kind === 'not_found') {
						return responeStandart(res, 'not found populer products', {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		});
	},
};