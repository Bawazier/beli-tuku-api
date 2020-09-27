const joi = require('joi');

const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const userSchema = joi.object({
	roles_id: joi.number().integer().positive().required(),
	name: joi.string()
		.min(3)
		.max(30)
		.required(),

	email: joi.string().email().required(),

	password: joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

	phone: joi.string().regex(/^\d{4}-\d{4}-\d{4}$/).required(),

	gender: joi.string().valid('male', 'female').lowercase().required(),

	dateOfBirth: joi.date().max('1-1-2018').required(),

});

const userUpdateSchema = joi.object({
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
	user_id: joi.number().integer().positive().required(),
	category_id: joi.number().integer().positive().required(),
	conditions_id: joi.number().integer().positive().required(),
	name: joi.string().min(3).max(80).required(),
	price: joi.number().integer().positive().required(),
	stock: joi.number().integer().positive().required(),
	maxSize: joi.number().integer().positive(),
	description: joi.string()
});

const productUpdateSchema = joi.object({
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
	user_id: joi.number().integer().positive().required(),
	product_id: joi.number().integer().positive().required(),
	quantity: joi.number().integer().positive().required()
});

const cartUpdateSchema = joi.object({
	quantity: joi.number().integer().positive().required()
});

const productImagesSchema = joi.number().integer().positive().required();
const productColorsSchema = joi.object({
	product_id: joi.number().integer().positive().required(),
	color: joi.string().lowercase().required(),
	status: joi.string().valid('available', 'empty').lowercase().required(),
});
const productColorsUpdateSchema = joi.object({
	color: joi.string().lowercase(),
	status: joi.string().valid('available', 'empty').lowercase(),
});

const productRatingsSchema = joi.object({
	product_id: joi.number().integer().positive().required(),
	user_id: joi.number().integer().positive().required(),
	rating: joi.number().integer().min(0).max(5).required(),
});
const productRatingsUpdateSchema = joi.object({
	rating: joi.number().integer().min(0).max(5).required(),
});

const userAddressSchema = joi.object({
	user_id: joi.number().integer().positive().required(),
	name: joi.string().min(3).max(80).required(),
	recipient_name: joi.string().min(3).max(80).required(),
	recipient_tlp: joi.number().integer().required(),
	address: joi.string().required(),
	region: joi.string().required(),
	postal_code: joi.number().integer().positive().required(),
});
const userAddressUpdateSchema = joi.object({
	name: joi.string().min(3).max(80),
	recipient_name: joi.string().min(3).max(80),
	recipient_tlp: joi.number().integer(),
	address: joi.string(),
	region: joi.string(),
	postal_code: joi.number().integer().positive(),
});

const globalSchema = joi.object({
	name: joi.string().min(3).max(30),
	status: joi.string().min(3).max(30),
	role: joi.string().min(3).max(30),
});

const imagesSchema = joi.string().pattern(/\.(jpg|jpeg|png)$/);

module.exports = {
	schemaUser: userSchema,
	schemaUpdateUser: userUpdateSchema,
	schemaUpdateProduct: productUpdateSchema,
	schemaProduct: productSchema,
	schemaCart: cartSchema,
	schemaUpdateCart: cartUpdateSchema,
	schemaLogin: loginSchema,
	schemaGlobal: globalSchema,
	schemaImages: imagesSchema,
	schemaProductImages: productImagesSchema,
	schemaProductColors: productColorsSchema,
	schemaUpdateProductColors: productColorsUpdateSchema,
	schemaProductRatings: productRatingsSchema,
	schemaUpdateProductRatings: productRatingsUpdateSchema,
	schemaUserAddress: userAddressSchema,
	schemaUpdateUserAddress: userAddressUpdateSchema,
};