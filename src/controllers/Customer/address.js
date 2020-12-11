const { Address, User } = require("../../models");
const { Op } = require("sequelize");
const responseStandart = require("../../helper/response");
const schema = require("../../helper/validation");
const pagination = require("../../helper/pagination");
const { sequelize } = require("../../models");

const addressSchema = schema.Address;

module.exports = {
  listAddress: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "createdAt",
        sortType = "DESC",
      } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await Address.findAndCountAll({
        include: [{ model: User, attributes: ["name", "picture"] }],
        where: {
          userId: req.user.id,
          name: {
            [Op.substring]: search,
          },
        },
        order: [[sortBy, sortType]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit) || 10,
      });
      const pageInfo = pagination.paging(
        "customer/address/",
        req,
        count,
        page,
        limit
      );
      if (rows.length) {
        return responseStandart(res, "success to display address", {
          results: rows,
          pageInfo,
        });
      } else {
        return responseStandart(
          res,
          "unable to display address",
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

  getAddressId: async (req, res) => {
    try {
      const results = await Address.findByPk(req.params.id);
      if (results) {
        return responseStandart(res, "success to display address", {
          results,
        });
      } else {
        return responseStandart(
          res,
          "unable to display address",
          {},
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  postAddress: async (req, res) => {
    try {
      const result = await addressSchema.required().validateAsync(req.body);
      const address = {
        userId: req.user.id,
        name: result.name,
        recipientName: result.recipientName,
        recipientTlp: result.recipientTlp,
        address: result.address,
        region: result.region,
        postalCode: result.postalCode,
        isPrimary: 1,
      };
      await Address.update(
        { isPrimary: 0 },
        {
          where: {
            userId: req.user.id,
          },
        }
      );
      await Address.create(address);
      return responseStandart(
        res,
        "success create your shipping address",
        {}
      );
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  patchAddress: async (req, res) => {
    try {
      const result = await addressSchema.validateAsync(req.body);
      const address = {
        userId: req.user.id,
        name: result.name,
        recipientName: result.recipientName,
        recipientTlp: result.recipientTlp,
        address: result.address,
        region: result.region,
        postalCode: result.postalCode,
        isPrimary: result.isPrimary ? 1:0,
      };
      if (result.isPrimary){
        await Address.update(
          { isPrimary: 0 },
          {
            where: {
              userId: req.user.id,
            },
          }
        );
      }
      await Address.update(address, {
        where: {
          id: req.params.id,
        },
      });
      return responseStandart(res, "success update your shipping address", {});
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  deleteAddress: async (req, res) => {
    try {
      await Address.destroy({
        where: {
          id: req.params.id,
        },
      });
      return responseStandart(res, "success delete your shipping address", {});
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  }
};
