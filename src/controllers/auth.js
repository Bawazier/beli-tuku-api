/* eslint-disable no-mixed-spaces-and-tabs */
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const schema = require("../helper/validation");
const responseStandart = require("../helper/response");

const signupSignupCustomer = schema.SignupCustomer;
const loginSchema = schema.Login;
const changePassSchema = schema.ChangePass;
const forgotPassSchema = schema.ForgotPass;

module.exports = {
  login: async (req, res) => {
    try {
      const result = await loginSchema.required().validateAsync(req.body);
      const user = {
        email: result.email,
      };

      const validate = await User.findAll({
        where: {
          email: user.email,
        },
      });
      if(validate.length){
        const comparePass = await bcrypt.compareSync(
          result.password,
          validate[0].password
        );
        if (comparePass) {
          jwt.sign(
            { id: validate[0].id, rolesId: validate[0].rolesId },
            process.env.APP_KEY,
            { expiresIn: "2 days" },
            function (err, token) {
              if (!err) {
                return responseStandart(res, "Loggin Success", {
                  token: token,
                  auth: { id: validate[0].id },
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
      return responseStandart(res, e.details[0].message, {}, 400, false);
    }
  },

  signup: async (req, res) => {
    try {
	  const result = await signupSignupCustomer
        .required()
        .validateAsync(req.body);
      const saltRounds = 10;
      const salt = await bcrypt.genSaltSync(saltRounds);
      const hash = await bcrypt.hashSync(result.password, salt);
      const user = {
        name: result.name,
        email: result.email,
        password: hash,
        rolesId: 3
      };

      const validate = User.findAll({
        where: {
          email: user.email,
        },
	  });
      if (!validate.length) {
        await User.create(user);
        console.log(validate);
        return responseStandart(res, "Signup Success", {});
      } else {
        return responseStandart(res, "Email already used", {}, 400, false);
      }
    } catch (e) {
      return responseStandart(res, e.details[0].message, {}, 400, false);
    }
  },

  changePass: async (req, res) => {
    try {
      const result = await changePassSchema.required().validateAsync(req.body);
      if (result.newPassword === result.confirmNewPassword) {
        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(result.newPassword, salt);

        const user = {
          password: hash,
        };
        await User.update(user, {
          where: {
            id: req.params.id,
          },
        });
        return responseStandart(res, "Change Password Success", {});
      } else {
        return responseStandart(
          res,
          "Passwords are not the same",
          {},
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e.details[0].message, {}, 400, false);
    }
  },

  forgotPass: async (req, res) => {
    try {
      const result = await forgotPassSchema.required().validateAsync(req.body);
      const validate = await User.findAll({
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
        where: {
          email: result.email,
        },
      });
      if (validate.length) {
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
      return responseStandart(res, e.details[0].message, {}, 400, false);
    }
  },
};