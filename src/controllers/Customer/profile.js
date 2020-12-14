const { User, Credit } = require("../../models");
const responseStandart = require("../../helper/response");
const schema = require("../../helper/validation");

const multer = require("multer");
const options = require("../../helper/upload");
const upload = options.single("picture");

const userSchema = schema.User;

module.exports = {
  getUser: async (req, res) => {
    try {
      const results = await User.findByPk(req.user.id, {
        attributes: [
          "id",
          "name",
          "email",
          "phone",
          "gender",
          "dateOfBirth",
          "picture",
          "createdAt",
        ],
        include: [Credit],
      });
      return responseStandart(res, "success display user data", {
        results,
      });
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  patchUser: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false);
      } else if (err) {
        return responseStandart(res, err, {}, 500, false);
      }
      try {
        const result = await userSchema.validateAsync(req.body);
        const user = {
          name: result.name,
          email: result.email,
          phone: result.phone,
          gender: result.gender,
          dateOfBirth: result.dateOfBirth,
          picture: req.file === undefined ? undefined : req.file.path,
        };
        const filteredObject = Object.keys(user).reduce((results, key) => {
          if (user[key] !== undefined) results[key] = user[key];
          return results;
        }, {});
        await User.update(filteredObject, {
          where: {
            id: req.user.id,
          },
        });
        return responseStandart(res, "success update user data", {});
      } catch (e) {
        return responseStandart(res, e, {}, 400, false);
      }
    });
  },

  putUser: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false);
      } else if (err) {
        return responseStandart(res, err, {}, 500, false);
      }
      try {
        const result = await userSchema.required().validateAsync(req.body);
        const user = {
          name: result.name,
          email: result.email,
          phone: result.phone,
          gender: result.gender,
          dateOfBirth: result.dateOfBirth,
          picture: req.file === undefined ? undefined : req.file.path,
        };
        const filteredObject = Object.keys(user).reduce((results, key) => {
          if (user[key] !== undefined) results[key] = user[key];
          return results;
        }, {});
        await User.update(filteredObject, {
          where: {
            id: req.user.id,
          },
        });
        return responseStandart(res, "success update user data", {});
      } catch (e) {
        return responseStandart(res, e, {}, 400, false);
      }
    });
  },

  
};
