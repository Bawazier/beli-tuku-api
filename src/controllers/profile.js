const User = require('../models/user');
const responeStandart = require('../helper/respone');
const schema = require('../helper/inputValidated');

const multer = require('multer');
const options = require('../helper/upload');
const upload = options.single('picture');

const accountSchema = schema.profileCustomer[0];


module.exports = {
	findAccountById: (req, res) => {
		User.findByUserId(req.user.id, (err, respone) => {
			if(!err){
				const data = respone.map(item => {
					const picture = {URL_image: process.env.URL + item.picture};
					return Object.assign({}, item, picture);
				});
				return responeStandart(res, 'get info account success', {data});
			}else{
				if (err.kind === 'not_found') {
					return responeStandart(res, 'not found account', {}, 404, false);
				} else {
					return responeStandart(res, err.sqlMessage, {}, 500, false);
				}
			}
		});
	},

	updateAccountById: (req, res) => {
		upload(req, res, async (err) => {
			if (err instanceof multer.MulterError) {
				return responeStandart(res, err, {}, 500, false);
			} else if (err) {
				return responeStandart(res, err, {}, 500, false);
			}
			try {
				const result = await accountSchema.validateAsync(req.body);
				const user = {
					name: result.name,
					email: result.email,
					phone: result.phone,
					gender: result.gender,
					dateOfBirth: result.dateOfBirth,
					picture: req.file === undefined ? undefined:req.file.path
				};
				let filteredObject = Object.keys(user).reduce((result, key) => {
					if (user[key] !== undefined) result[key] = user[key];
					return result;
				}, {});
				User.updateByUserId(filteredObject, req.user.id, (err, respone) => {
					if (!err) {
						return responeStandart(res, 'Update Account Success', { respone });
					} else {
						if (err.kind === 'not_found') {
							return responeStandart(res, 'not found account', {}, 404, false);
						} else {
							return responeStandart(res, err.sqlMessage, {}, 500, false);
						}
					}
				});
			} catch (e) {
				return responeStandart(res, e.details[0].message, {}, 400, false);
			}
		});
	},
    
	updateAccountAllById: async (req, res) => {
		upload(req, res, async (err) => {
			if (err instanceof multer.MulterError) {
				return responeStandart(res, err, {}, 500, false);
			} else if (err) {
				return responeStandart(res, err, {}, 500, false);
			}
			try {
				const result = await accountSchema.required().validateAsync(req.body);
				const user = {
					name: result.name,
					email: result.email,
					phone: result.phone,
					gender: result.gender,
					dateOfBirth: result.dateOfBirth,
					picture: req.file === undefined ? undefined:req.file.path
				};
				User.updateByUserId(user, req.user.id, (err, respone) => {
					if (!err) {
						return responeStandart(res, 'Update Account Success', { respone });
					} else {
						if (err.kind === 'not_found') {
							return responeStandart(res, 'not found account', {}, 404, false);
						} else if (err.kind === 'Email Already Used') {
							return responeStandart(res, 'Email Already Used', {}, 404, false);
						}else{
							return responeStandart(res, err.sqlMessage, {}, 500, false);
						}
					}
				});
			} catch (e) {
				return responeStandart(res, e.details[0].message, {}, 400, false);
			}
		});
	},
};