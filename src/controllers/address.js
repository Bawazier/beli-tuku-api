const { UserAddress, User } = require("../models");
const { Op } = require("sequelize");
const responseStandart = require("../helper/response");
const schema = require("../helper/validation");

const addressSchema = schema.Address;

module.exports = {
  getAddress: async (req, res) => {
    try {
      const { count, rows } = await UserAddress.findAndCountAll({
        include: [{ model: User, attributes: ["name", "picture"] }],
        where: {
          userId: req.user.id,
          name: {
            [Op.startsWith]: req.query.search || "",
          },
        },
        order: [["isPrimary", "DESC"]],
        offset: parseInt(req.query.page) || 0,
        limit: parseInt(req.query.limit) || 10,
      });
      if (rows.length) {
        return responseStandart(res, "success to display address", {
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
          "unable to display address",
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
        "unable to display address",
        { ValidationError: e.details[0].message, sqlError: e },
        400,
        false
      );
    }
  },

  getAddressId: async (req, res) => {
    try {
      const results = await UserAddress.findByPk(req.params.id);
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
      return responseStandart(
        res,
        "unable to display address",
        { ValidationError: e.details[0].message, sqlError: e },
        400,
        false
      );
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
        isPrimary: 0,
      };
      await UserAddress.create(address);
      return responseStandart(res, "success create your shipping address", {});
    } catch (e) {
      return responseStandart(
        res,
        "failed for create story",
        { ValidationError: e.details[0].message, sqlError: e },
        400,
        false
      );
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
      await UserAddress.update(address, {
        where: {
          id: req.params.id,
        },
      });
      return responseStandart(res, "success update your shipping address", {});
    } catch (e) {
      return responseStandart(
        res,
        "failed for update story",
        { ValidationError: e.details[0].message, sqlError: e },
        400,
        false
      );
    }
  },
};
