const Ratings = require('../models/productRatings');
const { format } = require('date-fns');
const schema = require('../helper/userValidated');
const productRatingsSchema = schema.schemaProductRatings;
const productRatingsUpdateSchema = schema.schemaUpdateProductRatings;
const responeStandart = require('../helper/respone');

module.exports = {
	create: async (req, res) => {
		try{
			const result = await productRatingsSchema.validateAsync(req.body);
			const ratings = {
				product_id: result.product_id,
				user_id: result.user_id,
				rating: result.rating,
				created_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
				updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
			};
			Ratings.create(ratings, (err, data) => {
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
			const result = await productRatingsUpdateSchema.validateAsync(req.body);
			const ratings = {
				rating: result.rating,
				updated_at: format(new Date(), 'yyyy-MM-dd kk:mm:ss'),
			};
			Ratings.update(ratings, req.params.id, (err, data) => {
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

	findByUserId: async (req, res) => {
		try{
			Ratings.findByUserId(req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Find By User Id Success', { data });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
					} else {
						return responeStandart(res, err.sqlMessage, {}, 500, false);
					}
				}
			});
		}catch(e){
			return responeStandart(res, e.details[0].message, {}, 400, false);
		}
	},

	deleteByUserId: async (req, res) => {
		try{
			Ratings.deleteByUserId(req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Delete By User Id Success', { data });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found User with id ${req.params.id}.`, {}, 404, false);
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
			Ratings.deleteByProductId(req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Delete By Product Id Success', { data });
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
			Ratings.delete(req.params.id, (err, data) => {
				if (!err) {
					return responeStandart(res, 'Delete image Success', { data });
				} else {
					if (err.kind === 'not_found') {
						return responeStandart(res, `Not found Ratings with id ${req.params.id}.`, {}, 404, false);
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