const joi = require('joi');

const loginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

const userSchema = joi.object({
	name: joi.string()
		.min(3)
		.max(30)
		.required(),

	email: joi.string().email().required(),

	password: joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

	phone: joi.string().regex(/^\d{4}-\d{4}-\d{4}$/).required(),

	gender: joi.string().valid('male', 'female').lowercase().required(),

	dateOfBirth: joi.date().max('1-1-2018').iso().required()
});

const userUpdateSchema = joi.object({
	name: joi.string()
		.min(3)
		.max(30),

	email: joi.string().email(),

	password: joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

	phone: joi.string().regex(/^\d{4}-\d{4}-\d{4}$/),

	gender: joi.string().valid('male', 'female').lowercase(),

	dateOfBirth: joi.date().max('1-1-2018').iso()
});

const productSchema = joi.object({
	name: joi.string().min(3).max(80).required(),
	price: joi.number().integer().positive().required(),
	categoryId: joi.number().integer().positive().required(),
	description: joi.string()
});

const productUpdateSchema = joi.object({
	name: joi.string().min(3).max(30),
	price: joi.number().integer().positive(),
	categoryId: joi.number().integer().positive(),
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

const globalSchema = joi.object({
	name: joi.string().min(3).max(30),
	status: joi.string().min(3).max(30),
	role: joi.string().min(3).max(30)
});

module.exports = {
	schemaUser: userSchema,
	schemaUpdateUser: userUpdateSchema,
	schemaUpdateProduct: productUpdateSchema,
	schemaProduct: productSchema,
	schemaCart: cartSchema,
	schemaUpdateCart: cartUpdateSchema,
	shemaLogin: loginSchema,
	schemaGlobal: globalSchema
};