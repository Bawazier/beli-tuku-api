const Joi = require("joi");

module.exports = {
  Login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }),

  SignupCustomer: Joi.object({
    name: Joi.string().min(3).max(80).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }),

  SignupSaller: Joi.object({
    name: Joi.string().min(3).max(80).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number()
      .integer()
      .min(1000000000)
      .max(99999999999)
      .required(),
    storeName: Joi.string().min(3).max(80).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }),

  ForgotPass: Joi.object({
    newPassword: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
  }),

  ValidationForgotPass: Joi.object({
    email: Joi.string().email().required(),
  }),

  ChangePass: Joi.object({
    oldPassword: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    newPassword: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    confirmNewPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
  }),

  SellingProduct: Joi.object({
    categoryId: Joi.number().integer().positive(),
    conditionId: Joi.number().integer().positive(),
    name: Joi.string().min(3).max(80),
    price: Joi.number().integer().positive(),
    stock: Joi.number().integer().positive(),
    description: Joi.string(),

    nameColor: Joi.array().min(1).max(4),
    hexaColor: Joi.array().min(1).max(4),
    statusColor: Joi.array().min(1).max(4),

    size: Joi.array().min(1).max(4),
  }),

  User: Joi.object({
    name: Joi.string().min(3).max(80),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    phone: Joi.number().integer(),
    gender: Joi.string().valid("male", "female").lowercase(),
    dateOfBirth: Joi.date(),
  }),

  Products: Joi.object({
    categoryId: Joi.number().integer().positive(),
    conditionId: Joi.number().integer().positive(),
    name: Joi.string().min(3).max(80),
    price: Joi.number().integer().positive(),
    stock: Joi.number().integer().positive(),
    description: Joi.string(),
    hexa: Joi.array(),
    // status: Joi.array().valid("available", "empty"),
    // isPrimary: Joi.array().valid(0, 1),
  }),

  Ratings: Joi.object({
    productId: Joi.number().integer().positive(),
    userId: Joi.number().integer().positive(),
    rating: Joi.number().min(0).max(5),
    comment: Joi.string(),
  }),

  Address: Joi.object({
    userId: Joi.number().integer().positive(),
    name: Joi.string().min(3).max(80),
    recipientName: Joi.string().min(3).max(80),
    recipientTlp: Joi.number().integer().positive(),
    address: Joi.string(),
    region: Joi.string(),
    postalCode: Joi.number().integer().positive(),
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