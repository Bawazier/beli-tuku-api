const Product = require('../models/product');
const responeStandart = require('../helper/respone');



module.exports = {
	findProductByUserId: (req, res) => {
		Product.findProductByUserId(req.user.id, (err, data) => {
			if (!err) {
				return responeStandart(res, 'get info product user success', { data });
			} else {
				if (err.kind === 'not_found') {
					return responeStandart(res, 'Not found Product', {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	// createProductByUserId: (req, res) => {},

	// updateProductByUserId: (req, res) => {},
	
	// updateProductAllByUserId: (req, res) => {},
};