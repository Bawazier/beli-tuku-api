const { format } = require('date-fns');
const Ratings = require('../models/productRatings');
const responeStandart = require('../helper/respone');
const schema = require('../helper/inputValidated');

const ratingsSchema = schema.profileSaller[4];

module.exports = {
	findByUserId: (req, res) => {
		Ratings.findByUserId(req.user.id, (err, respone) => {
			if(!err){
				return responeStandart(res, 'get info ratings success', {respone});
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, 'not found ratings', {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	createRatings: async (req, res) => {
		try{
			const result = await ratingsSchema.validateAsync(req.body);
			const ratings = {
				product_id: req.params.id,
				user_id: req.user.id,
				rating: result.rating,
				comment: result.comment,
				created_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
				updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'), 
			};
			Ratings.findByProductId(req.params.id, (err, data) => {
				if(!err && !data.length){
					Ratings.createByProductId(ratings, req.params.id, (err, respone) => {
						if (!err) {
							return responeStandart(res, 'create review success', { respone });
						} else {
							if (err.kind === 'not_found') {
								return responeStandart(res, 'not found product', {}, 404, false);
							} else {
								return responeStandart(res, err.sqlMessage, {}, 500, false);
							}
						}
					});
				}else{
					return responeStandart(res, 'ratings already for this product', {}, 404, false);
				}
			});
		}catch(e){
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
		
	},

	updateRatings: async (req, res) => {
		try{
			const result = await ratingsSchema.validateAsync(req.body);
			const ratings = {
				user_id: req.user.id,
				rating: result.rating,
				comment: result.comment,
				created_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
				updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'), 
			};
			Ratings.update(ratings, req.params.id, (err, respone) => {
				if (!err) {
					return responeStandart(res, 'create review success', { respone });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, 'not found product', {}, 404, false);
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