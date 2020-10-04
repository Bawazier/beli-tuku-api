const joi = require('joi');

const login = joi.object({
	roles_id: joi.string().valid('customer', 'saller').lowercase(),
	email: joi.string().email(),
	password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const registerCustomer = joi.object({
	name: joi.string().min(3).max(80),
	email: joi.string().email(),
	password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const registerSaller = joi.object({
	name: joi.string().min(3).max(80),
	email: joi.string().email(),
	password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	phone: joi.number().integer(),
});

const User = joi.object({
	roles_id: joi.number().integer().positive(),
	name: joi.string().min(3).max(80),
	email: joi.string().email(),
	password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	phone: joi.number().integer(),
	gender: joi.string().valid('male', 'female').lowercase(),
	dateOfBirth: joi.date(),
});

const Products = joi.object({
	category_id: joi.number().integer().positive(),
	conditions_id: joi.number().integer().positive(),
	user_id: joi.number().integer().positive(),
	name: joi.string().min(3).max(80),
	price: joi.number().integer().positive(),
	stock: joi.number().integer().positive(),
	description: joi.string()
});

const Address = joi.object({
	user_id: joi.number().integer().positive(),
	name: joi.string().min(3).max(80),
	recipient_name: joi.string().min(3).max(80),
	recipient_tlp: joi.number().integer().positive(),
	address: joi.string(),
	region: joi.string(),
	postal_code: joi.number().integer().positive(),
	isPrimary: joi.string().valid('true', 'false').lowercase()
});

const Cart = joi.object({
	user_id: joi.number().integer().positive(),
	product_id: joi.number().integer().positive(),
	quantity: joi.number().integer().positive(),
	totalPrice: joi.number().integer().positive(),
	isCheck: joi.string().valid('true', 'false').lowercase(),
	status: joi.string().valid('in', 'out').lowercase()
});

const product_ratings = joi.object({
	product_id: joi.number().integer().positive(),
	user_id: joi.number().integer().positive(),
	rating: joi.number().min(0).max(5),
	comment: joi.string(),
});

const product_images = joi.object({
	product_id: joi.number().integer().positive(),
	isPrimary: joi.string().valid('true', 'false').lowercase(),
});

const product_colors = joi.object({
	product_id: joi.number().integer().positive(),
	name: joi.string().min(3).max(80),
	hexa: joi.string().max(15),
	status: joi.string().valid('available', 'empty').lowercase()
});

const Category = joi.object({
	name: joi.string().min(3).max(80),
});

const Conditions = joi.object({
	status: joi.string().max(15),
});

const Roles = joi.object({
	role: joi.string().max(15)
});

const picture = joi.object().keys({
	a: joi.string().pattern(/\.(jpg|jpeg|png)$/)
});

module.exports = {
	auth: [login, registerCustomer, registerSaller],
	profileCustomer: [User, Address, picture],
	profileSaller: [User, Products, product_colors, product_images, product_ratings, picture],
	cart: Cart,

	admin: [Category, Conditions, Roles]
};