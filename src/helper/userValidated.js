const joi = require('joi');

const profileAccount = joi.object({
	name: joi.string()
		.min(3)
		.max(30),

	email: joi.string().email(),

	phone: joi.string().regex(/^\d{4}-\d{4}-\d{4}$/),

	gender: joi.string().valid('male', 'female').lowercase(),

	dateOfBirth: joi.date().max('1-1-2018'),
	password: joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const profileAddress = joi.object({
	name: joi.string().min(3).max(80),
	recipient_name: joi.string().min(3).max(80),
	recipient_tlp: joi.number().integer(),
	address: joi.string(),
	region: joi.string(),
	postal_code: joi.number().integer().positive(),
});

const loginSchema = joi.object({
	email: joi.string().email(),
	password: joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	roles_id: joi.string().lowercase(),
});

const userSchema = joi.object({
	roles_id: joi.number().integer().positive(),
	name: joi.string()
		.min(3)
		.max(30),

	email: joi.string().email(),

	password: joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

	phone: joi.string().regex(/^\d{4}-\d{4}-\d{4}$/),

	gender: joi.string().valid('male', 'female').lowercase(),

	dateOfBirth: joi.date().max('1-1-2018')
});

const productSchema = joi.object({
	user_id: joi.number().integer().positive(),
	category_id: joi.number().integer().positive(),
	conditions_id: joi.number().integer().positive(),
	name: joi.string().min(3).max(30),
	price: joi.number().integer().positive(),
	stock: joi.number().integer().positive(),
	maxSize: joi.number().integer().positive(),
	description: joi.string()
});

const cartSchema = joi.object({
	user_id: joi.number().integer().positive(),
	product_id: joi.number().integer().positive(),
	quantity: joi.number().integer().positive()
});

const cartUpdateSchema = joi.object({
	quantity: joi.number().integer().positive()
});

const productColorsSchema = joi.object({
	product_id: joi.number().integer().positive(),
	color: joi.string().lowercase(),
	status: joi.string().valid('available', 'empty').lowercase(),
});

const productRatingsSchema = joi.object({
	product_id: joi.number().integer().positive(),
	user_id: joi.number().integer().positive(),
	rating: joi.number().integer().min(0).max(5),
});

const userAddressSchema = joi.object({
	user_id: joi.number().integer().positive(),
	name: joi.string().min(3).max(80),
	recipient_name: joi.string().min(3).max(80),
	recipient_tlp: joi.number().integer(),
	address: joi.string(),
	region: joi.string(),
	postal_code: joi.number().integer().positive(),
});

const id = joi.number().integer().positive();
const name = joi.string().min(3).max(30);
const status = joi.string().min(3).max(30);
const role = joi.string().min(3).max(30);
const imagesSchema = joi.string().pattern(/\.(jpg|jpeg|png)$/);

module.exports = {
	User: [userSchema, imagesSchema],
	Product: productSchema,
	category: [name, imagesSchema],
	conditions: status,
	roles: role,
	productImages : [id, imagesSchema],
	Cart: [cartSchema, cartUpdateSchema],
	Login: loginSchema,
	ProductColors: productColorsSchema,
	ProductRatings: productRatingsSchema,
	UserAddress: userAddressSchema,
	address: userAddressSchema,
	profile : [profileAccount, profileAddress, loginSchema]
};