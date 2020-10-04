const responeStandart = require('../helper/respone');

module.exports = {
	customer: (req, res, next) => {
		if(req.user.roles_id === 3){
			next();
		}else{
			return responeStandart(res, 'Forbidden access', {}, 403, false);
		}
	},
	saller: (req, res, next) => {
		if(req.user.roles_id === 2){
			next();
		}else{
			return responeStandart(res, 'Forbidden access', {}, 403, false);
		}
	}
};