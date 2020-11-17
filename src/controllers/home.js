const {
  Product,
  Category,
  Condition,
  User,
  ProductColor,
  ProductImage,
  ProductRating,
} = require("../models");
const responseStandart = require("../helper/response");
const { Op } = require("sequelize");

module.exports = {
  searchProduct: async (req, res) => {
    try {
      const { count, rows } = await Product.findAndCountAll({
        attributes: [
          "id",
          "name",
          "price",
          "stock",
          "description",
          "createdAt",
          "updatedAt",
        ],
        include: [
          { model: Category, attributes: ["name", "picture", "color"] },
          { model: Condition, attributes: ["status"] },
          { model: User, attributes: ["name", "picture"] },
          { model: ProductColor, attributes: ["hexa"] },
          { model: ProductImage, attributes: ["picture", "isPrimary"] },
          { model: ProductRating, attributes: ["userId", "rating", "comment"] },
        ],
        where: {
          name: {
            [Op.startsWith]: req.query.search,
          },
        },
        order: [["createdAt", "DESC"]],
        offset: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      });
      if (rows.length) {
        return responseStandart(res, "success to display products", {
          rows,
          pageInfo: [
            {
              count: count,
              page: parseInt(req.query.page) || 0,
              limit: parseInt(req.query.limit) || 10,
            },
          ],
        });
      } else {
        return responseStandart(
          res,
          "unable to display products",
          {
            pageInfo: [
              {
                count: count,
                page: parseInt(req.query.page) || 0,
                limit: parseInt(req.query.limit) || 10,
              },
            ],
          },
          400,
          false
        );
      }
    } catch (e) {
      console.log(e);
      return responseStandart(
        res,
        "unable to display products",
        { ValidationError: e.details[0].message, sqlError: e },
        400,
        false
      );
    }
  },

  searchNews: async (req, res) => {
    try {
      const { count, rows } = await Product.findAndCountAll({
        attributes: [
          "id",
          "name",
          "price",
          "stock",
          "description",
          "createdAt",
          "updatedAt",
        ],
        include: [
          { model: Category, attributes: ["name", "picture", "color"] },
          { model: Condition, attributes: ["status"] },
          { model: User, attributes: ["name", "picture"] },
          { model: ProductColor, attributes: ["hexa"] },
          { model: ProductImage, attributes: ["picture", "isPrimary"] },
          { model: ProductRating, attributes: ["userId", "rating", "comment"] },
        ],
        order: [["createdAt", "DESC"]],
        offset: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      });
      if (rows.length) {
        return responseStandart(res, "success to display products", {
          rows,
          pageInfo: [
            {
              count: count,
              page: parseInt(req.query.page) || 0,
              limit: parseInt(req.query.limit) || 10,
            },
          ],
        });
      } else {
        return responseStandart(
          res,
          "unable to display products",
          {
            pageInfo: [
              {
                count: count,
                page: parseInt(req.query.page) || 0,
                limit: parseInt(req.query.limit) || 10,
              },
            ],
          },
          400,
          false
        );
      }
    } catch (e) {
      console.log(e);
      return responseStandart(
        res,
        "unable to display products",
        { ValidationError: e.details[0].message, sqlError: e },
        400,
        false
      );
    }
  },
  
  searchPopular: async (req, res) => {
    try {
      const { count, rows } = await Product.findAndCountAll({
        attributes: [
          "id",
          "name",
          "price",
          "stock",
          "description",
          "createdAt",
          "updatedAt",
        ],
        include: [
          { model: Category, attributes: ["name", "picture", "color"] },
          { model: Condition, attributes: ["status"] },
          { model: User, attributes: ["name", "picture"] },
          { model: ProductColor, attributes: ["hexa"] },
          { model: ProductImage, attributes: ["picture", "isPrimary"] },
          { model: ProductRating, attributes: ["userId", "rating", "comment"] },
        ],
        order: [[ProductRating, "rating", "DESC"]],
        offset: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      });
      if (rows.length) {
        return responseStandart(res, "success to display products", {
          rows,
          pageInfo: [
            {
              count: count,
              page: parseInt(req.query.page) || 0,
              limit: parseInt(req.query.limit) || 10,
            },
          ],
        });
      } else {
        return responseStandart(
          res,
          "unable to display products",
          {
            pageInfo: [
              {
                count: count,
                page: parseInt(req.query.page) || 0,
                limit: parseInt(req.query.limit) || 10,
              },
            ],
          },
          400,
          false
        );
      }
    } catch (e) {
      console.log(e);
      return responseStandart(
        res,
        "unable to display products",
        { ValidationError: e.details[0].message, sqlError: e },
        400,
        false
      );
    }
  },

  searchCategory: async (req, res) => {
    try {
      const { count, rows } = await Product.findAndCountAll({
        attributes: [
          "id",
          "name",
          "price",
          "stock",
          "description",
          "createdAt",
          "updatedAt",
        ],
        include: [
          { model: Category, attributes: ["name", "picture", "color"] },
          { model: Condition, attributes: ["status"] },
          { model: User, attributes: ["name", "picture"] },
          { model: ProductColor, attributes: ["hexa"] },
          { model: ProductImage, attributes: ["picture", "isPrimary"] },
          { model: ProductRating, attributes: ["userId", "rating", "comment"] },
        ],
        where: {
          categoryId: req.params.id,
        },
        order: [["createdAt", "DESC"]],
        offset: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      });
      if (rows.length) {
        return responseStandart(res, "success to display products", {
          rows,
          pageInfo: [
            {
              count: count,
              page: parseInt(req.query.page) || 0,
              limit: parseInt(req.query.limit) || 10,
            },
          ],
        });
      } else {
        return responseStandart(
          res,
          "unable to display products",
          {
            pageInfo: [
              {
                count: count,
                page: parseInt(req.query.page) || 0,
                limit: parseInt(req.query.limit) || 10,
              },
            ],
          },
          400,
          false
        );
      }
    } catch (e) {
      console.log(e);
      return responseStandart(
        res,
        "unable to display products",
        { ValidationError: e.details[0].message, sqlError: e },
        400,
        false
      );
    }
  },

  findCategory: async (req, res) => {
    try {
      const { count, rows } = await Category.findAndCountAll({
        where: {
          name: {
            [Op.startsWith]: req.query.search || "",
          },
        },
        offset: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      });
      if (rows.length) {
        return responseStandart(res, "success to display categories", {
          results: rows,
          pageInfo: [
            {
              count: count,
              page: parseInt(req.query.page) || 0,
              limit: parseInt(req.query.limit) || 10,
            },
          ],
        });
      } else {
        return responseStandart(
          res,
          "unable to display categories",
          {
            pageInfo: [
              {
                count: count,
                page: parseInt(req.query.page) || 0,
                limit: parseInt(req.query.limit) || 10,
              },
            ],
          },
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(
        res,
        "unable to display categories",
        { ValidationError: e.details[0].message, sqlError: e },
        400,
        false
      );
    }
  },
};
