const Product = require('../models/product');
const Images = require('../models/productImages');
const Colors = require('../models/productColors');
const Ratings = require('../models/productRatings');

const responeStandart = require('../helper/respone');



module.exports = {
	findProductDetails: (req, res) => {
		Product.findById(req.params.id, (err, data) => {
			if(!err){
				Images.findByProductId(req.params.id, (err, image)=>{
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
								return responeStandart(
									res,
									'GET ALL Products success No Ratings',
									Object.assign({}, {data}, {images: image}));
							}
						});
					}else{
						return responeStandart(
							res,
							'GET ALL Products success No Ratings',
							Object.assign({}, {data}));
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
};