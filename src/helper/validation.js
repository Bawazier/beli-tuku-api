const Joi = require("joi");

module.exports = {
  login: Joi.object({
    roles_id: Joi.string().valid("customer", "saller").lowercase(),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  }),

  registerCustomer: Joi.object({
    name: Joi.string().min(3).max(80),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  }),
  
  registerSaller: Joi.object({
    name: Joi.string().min(3).max(80),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    phone: Joi.number().integer(),
  }),

  User: Joi.object({
    roles_id: Joi.number().integer().positive(),
    name: Joi.string().min(3).max(80),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    phone: Joi.number().integer(),
    gender: Joi.string().valid("male", "female").lowercase(),
    dateOfBirth: Joi.date(),
  }),

  Products: Joi.object({
    category_id: Joi.number().integer().positive(),
    conditions_id: Joi.number().integer().positive(),
    user_id: Joi.number().integer().positive(),
    name: Joi.string().min(3).max(80),
    price: Joi.number().integer().positive(),
    stock: Joi.number().integer().positive(),
    description: Joi.string(),
  }),

  Address: Joi.object({
    user_id: Joi.number().integer().positive(),
    name: Joi.string().min(3).max(80),
    recipient_name: Joi.string().min(3).max(80),
    recipient_tlp: Joi.number().integer().positive(),
    address: Joi.string(),
    region: Joi.string(),
    postal_code: Joi.number().integer().positive(),
    isPrimary: Joi.string().valid("true", "false").lowercase(),
  }),

  Cart: Joi.object({
    user_id: Joi.number().integer().positive(),
    product_id: Joi.number().integer().positive(),
    quantity: Joi.number().integer().positive(),
    totalPrice: Joi.number().integer().positive(),
    isCheck: Joi.string().valid("true", "false").lowercase(),
    status: Joi.string().valid("in", "out").uppercase(),
  }),

  product_ratings: Joi.object({
    product_id: Joi.number().integer().positive(),
    user_id: Joi.number().integer().positive(),
    rating: Joi.number().min(0).max(5),
    comment: Joi.string(),
  }),

  product_images: Joi.object({
    product_id: Joi.number().integer().positive(),
    isPrimary: Joi.string().valid("true", "false").lowercase(),
  }),

  product_colors: Joi.object({
    product_id: Joi.number().integer().positive(),
    name: Joi.string().min(3).max(80),
    hexa: Joi.string().max(15),
    status: Joi.string().valid("available", "empty").lowercase(),
  }),

  Category: Joi.object({
    name: Joi.string().min(3).max(80),
  }),

  Conditions: Joi.object({
    status: Joi.string().max(15),
  }),

  Roles: Joi.object({
    role: Joi.string().max(15),
  }),

  picture: Joi.object().keys({
    a: Joi.string().pattern(/\.(jpg|jpeg|png)$/),
  }),
};