const {
  User,
  Product,
  Category,
  Condition,
  Store,
  ProductColor,
  ProductImage,
  ProductRating,
  ProductSize,
  RatingImage,
} = require("../../models");
const responseStandart = require("../../helper/response");
const { Op } = require("sequelize");
const pagination = require("../../helper/pagination");

module.exports = {
  listProducts: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "createdAt",
        sortType = "DESC",
        color = [],
        searchColor = "",
        size = [],
        searchSize = "",
        store = [],
        searchStore = "",
        category = [],
        searchCategory = "",
        status = "New",
      } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await Product.findAndCountAll({
        include: [
          {
            model: Condition,
            attributes: ["id", "status"],
            where: { status: status },
          },
          {
            model: Category,
            attributes: ["id", "name"],
            where: {
              name: category.length
                ? category
                : { [Op.substring]: searchCategory },
            },
          },
          {
            model: Store,
            attributes: ["id", "name", "description"],
            where: {
              name: store.length ? store : { [Op.substring]: searchStore },
            },
          },
          {
            model: ProductColor,
            attributes: ["id", "name", "hexa", "status", "isPrimary"],
            where: {
              hexa: color.length ? color : { [Op.substring]: searchColor },
            },
          },
          {
            model: ProductSize,
            attributes: ["id", "size", "isPrimary"],
            where: {
              size: size.length ? size : { [Op.substring]: searchSize },
            },
          },
          {
            model: ProductImage,
            attributes: ["id", "picture", "isPrimary"],
            where: { isPrimary: 1 },
          },
          {
            model: ProductRating,
            attributes: ["id", "rating"],
            where: {
              rating: { [Op.gte]: 5 },
            },
            order: [["rating", "DESC"]],
            limit: 1,
          },
        ],
        where: {
          name: {
            [Op.substring]: search,
          },
        },
        order: [[sortBy, sortType]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit) || 10,
      });
      const result = async () => {
        return Promise.all(
          rows.map(async (item) => {
            const amount = await ProductRating.sum("rating", {
              where: {
                productId: item.id,
              },
            });
            return Object.assign({}, item.dataValues, {
              ratings: Math.ceil(amount / 5) || 0,
            });
          })
        );
      };
      const pageInfo = pagination.paging("public/products", req, count, page, limit);
      result().then((results) => {
        if (results.length) {
          return responseStandart(res, "success to display products", {
            pageInfo,
            results,
          });
        } else {
          return responseStandart(
            res,
            "unable to display products",
            { pageInfo },
            400,
            false
          );
        }
      });
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  detailsProduct: async (req, res) => {
    try {
      const results = await Product.findByPk(req.params.id, {
        include: [
          Condition,
          Category,
          Store,
          ProductColor,
          ProductSize,
          ProductImage,
        ],
      });
      const amount = await ProductRating.sum("rating", {
        where: {
          productId: req.params.id,
        },
      });
      return responseStandart(res, "success to display details product", {
        results,
        ratings: Math.ceil(amount / 5) || 0,
      });
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  detailsProductReview: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "createdAt",
        sortType = "DESC",
      } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await ProductRating.findAndCountAll({
        include: [
          {
            model: RatingImage,
            attributes: ["id", "picture"],
          },
          {
            model: User,
            attributes: ["id", "name", "picture"],
          },
        ],
        where: {
          name: {
            [Op.substring]: search,
          },
        },
        order: [[sortBy, sortType]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit) || 10,
      });
      const pageInfo = pagination.paging(
        "public/product/reviews",
        req,
        count,
        page,
        limit
      );
      if (rows.length) {
        return responseStandart(res, "success to display categories", {
          pageInfo,
          results: rows,
        });
      } else {
        return responseStandart(
          res,
          "unable to display categories",
          {
            pageInfo,
          },
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
    
  },

  listCategories: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
      } = req.query;
      const { count, rows } = await Category.findAndCountAll({
        where: {
          name: {
            [Op.startsWith]: search || "",
          },
        },
        offset: parseInt(page) || 0,
        limit: parseInt(limit) || 10,
      });
      const pageInfo = pagination.paging(
        "public/categories",
        req,
        count,
        page,
        limit
      );
      if (rows.length) {
        return responseStandart(res, "success to display categories", {
          pageInfo,
          results: rows,
        });
      } else {
        return responseStandart(
          res,
          "unable to display categories",
          {
            pageInfo,
          },
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  }
};
