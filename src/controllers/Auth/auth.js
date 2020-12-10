/* eslint-disable no-mixed-spaces-and-tabs */
const { User, Store, Credit } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const schema = require("../../helper/validation");
const responseStandart = require("../../helper/response");

const signupCustomerSchema = schema.SignupCustomer;
const signupSallerSchema = schema.SignupSaller;
const loginSchema = schema.Login;
const validationForgotPassSchema = schema.ValidationForgotPass;
const forgotPassSchema = schema.ForgotPass;

module.exports = {
  signin: async (req, res) => {
    try {
      const result = await loginSchema.required().validateAsync(req.body);

      const validate = await User.findOne({
        where: {
          email: result.email,
        },
      });
      if(validate !== null){
        const comparePass = await bcrypt.compareSync(
          result.password,
          validate.password
        );
        if (comparePass) {
          jwt.sign(
            { id: validate.id, roleId: validate.roleId },
            process.env.APP_KEY,
            { expiresIn: "2 days" },
            function (err, token) {
              if (!err) {
                return responseStandart(res, "Loggin Success", {
                  token: token,
                });
              } else {
                return responseStandart(res, err, {}, 403, false);
              }
            }
          );
        } else {
          return responseStandart(res, "Wrong Password", {}, 400, false);
        }
      }else{
        return responseStandart(res, "Wrong email", {}, 400, false);
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  signup: async (req, res) => {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSaltSync(saltRounds);
      let data = {};
      let dataStore = {};
      if (parseInt(req.params.id) === 2) {
        const result = await signupSallerSchema.required().validateAsync(req.body);
        const hash = await bcrypt.hashSync(result.password, salt);
        data = {
          name: result.name,
          email: result.email,
          phone: result.phoneNumber,
          password: hash,
          roleId: req.params.id
        };
        dataStore = {name: result.storeName};
      } else if (parseInt(req.params.id) === 3) {
        const result = await signupCustomerSchema.required().validateAsync(req.body);
        const hash = await bcrypt.hashSync(result.password, salt);
        data = {
          name: result.name,
          email: result.email,
          password: hash,
          roleId: req.params.id
        };
      } else {
        return responseStandart(res, "role not found", {}, 500, false);
      }
      const [user, created] = await User.findOrCreate({
        where: { email: data.email },
        defaults: data
      });
      if(created){
        if (parseInt(user.roleId) === 2){
          const [created] = await Store.findOrCreate({
            where: { name: dataStore.name },
            defaults: {
              ...dataStore,
              userId: user.id
            }
          });
          if(created){
            return responseStandart(res, "Success Registering As a Seller", {});
          }else{
            return responseStandart(res, "Store Name is Already in Use", {}, 400, false);
          }
        }else{
          const credit = await Credit.create({userId: user.id, saldo: 150000});
          return responseStandart(res, "success registering as a Customer", {credit});
        }
      }else{
        return responseStandart(res, "Email is Already in Use", {}, 400, false);
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  forgotPass: async (req, res) => {
    try {
      const result = await forgotPassSchema.required().validateAsync(req.body);
      const saltRounds = 10;
      const salt = await bcrypt.genSaltSync(saltRounds);
      const hash = await bcrypt.hashSync(result.newPassword, salt);

      const dataUser = {
        password: hash,
      };
      await User.update(dataUser, {
        where: {
          id: req.params.id,
        },
      });
      return responseStandart(res, "Change Password Success", {});
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  validateForgotPass: async (req, res) => {
    try {
      const result = await validationForgotPassSchema.required().validateAsync(req.body);
      const validate = await User.findOne({
        attributes: [
          "id",
          "name",
          "email",
        ],
        where: {
          email: result.email,
        },
      });
      if (validate !== null) {
        return responseStandart(res, "Email Valid", { validate });
      } else {
        return responseStandart(
          res,
          "The user is not registered yet",
          {},
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },
};
