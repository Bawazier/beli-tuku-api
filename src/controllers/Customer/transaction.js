const {
  Topup,
  Credit,
  Address,
  Product,
  ProductColor,
  ProductImage,
  ProductSize,
  DetailProduct,
  Cart,
  Order,
} = require("../../models");
const responseStandart = require("../../helper/response");
const { Op } = require("sequelize");
const { sequelize } = require("../../models");
const pagination = require("../../helper/pagination");

module.exports = {
  listTopup: async (req, res) => {
    try {
      const { count, rows } = await Topup.findAndCountAll({
        order: [["charge", "ASC"]],
      });
      if (rows.length) {
        return responseStandart(res, "success to display list topup", {
          count: count,
          results: rows,
        });
      } else {
        return responseStandart(
          res,
          "unable to display list topup",
          {},
          400,
          false
        );
      }
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  },

  topupCredit: async (req, res) => {
    const results = await sequelize.transaction(async (t) => {
      try {
        const topup = await Topup.findByPk(req.params.id, {transaction: t});
        const credit = await Credit.findOne(
          { where: { userId: req.user.id } },
          { transaction: t }
        );
        await Credit.update(
          { saldo: credit.saldo + topup.charge },
          { where: { userId: req.user.id } },
          { transaction: t }
        );
        return { saldo: credit.saldo + topup.charge };
      }catch(err){
        return responseStandart(res, err, {}, 500, false);
      }
    });
    return responseStandart(res, "topup success", { results });
  },

  addProductToCart: async (req, res) => {
    const { productColorId, productImageId, productSizeId } = req.query;
    const results = await sequelize.transaction(async (t) => {
      try {
        const product = await Product.findByPk(
          req.params.id,
          {
            include: [
              {
                model: ProductImage,
                attributes: ["id", "picture"],
                where: { isPrimary: true },
                limit: 1,
              },
              {
                model: ProductColor,
                attributes: ["id", "name", "hexa"],
                where: { isPrimary: true },
                limit: 1,
              },
              {
                model: ProductSize,
                attributes: ["id", "size"],
                where: { isPrimary: true },
                limit: 1,
              },
            ],
          },
          {
            transaction: t,
          }
        );
        const detailProduct = await DetailProduct.create(
          {
            productId: product.id,
            productColorId: productColorId || product.ProductColors[0].id,
            productImageId: productImageId || product.ProductImages[0].id,
            productSizeId: productSizeId || product.ProductSizes[0].id,
          },
          {
            transaction: t,
          }
        );
        await Cart.create(
          {
            userId: req.user.id,
            detailProductId: detailProduct.dataValues.id,
            quantity: req.body.quantity || 1,
            totalPrice: product.price * (req.body.quantity || 1),
            isCheck: true,
            status: "IN",
          },
          {
            transaction: t,
          }
        );
        return product;
      } catch (err) {
        return responseStandart(res, err, {}, 500, false);
      }
    });
    return responseStandart(res, "add product to cart success", { results });
  },

  checkOutCart: async (req, res) => {
    const results = await sequelize.transaction(async (t) => {
      try {
        const cart = await Cart.findOne(
          {
            where: {
              id: req.params.id,
              status: "IN",
              isCheck: true,
            },
          },
          {
            transaction: t,
          }
        );
        if(cart !== null){
          await Cart.update(
            {
              quantity: req.body.quantity || 1,
              totalPrice: (cart.totalPrice / cart.quantity) * (req.body.quantity || 1),
              isCheck: false,
              status: "OUT",
            },
            {
              where: {
                id: cart.id,
              },
            },
            {
              transaction: t,
            }
          );
          return {
            totalPrice:
              (cart.totalPrice / cart.quantity) * (req.body.quantity || 1),
          };
        }else{
          return { message: "cart is up to date"};
        }
      } catch (err) {
        return responseStandart(res, err, {}, 500, false);
      }
    });
    return responseStandart(res, "checkout cart success", { results });
  },

  discardCheckoutCart: async (req, res) => {
    await sequelize.transaction(async (t) => {
      try {
        const cart = await Cart.findOne(
          {
            where: {
              userId: req.user.id,
              status: "OUT",
              isCheck: false,
            },
          },
          {
            transaction: t,
          }
        );
        if (cart !== null) {
          await Cart.update(
            {
              isCheck: true,
              status: "IN",
            },
            {
              where: {
                userId: req.user.id,
                status: "OUT",
                isCheck: false,
              },
            },
            {
              transaction: t,
            }
          );
          return responseStandart(res, "discard checkout cart success", { cart });
        } else {
          return responseStandart(
            res,
            "You do not have items with check out status",
            {},
            400,
            false
          );
        }
      } catch (err) {
        return responseStandart(res, err, {}, 500, false);
      }
    });
  },

  orderByCredit: async (req, res) => {
    await sequelize.transaction(async (t) => {
      try {
        const address = await Address.findOne(
          {
            where: {
              userId: req.user.id,
              isPrimary: true,
            },
          },
          {
            transaction: t,
          }
        );
        if (address !== null) {
          const cart = await Cart.findAll(
            {
              where: { userId: req.user.id, isCheck: false, status: "OUT" },
            },
            {
              transaction: t,
            }
          );
          if(cart.length){
            const totalPrice = cart.map((item) => item.totalPrice);
            let totalAmount = 0;
            for (let i = 0; i < totalPrice.length; i++) {
              totalAmount += totalPrice[i];
            }
            const credit = await Credit.findOne(
              { where: { userId: req.user.id } },
              {
                transaction: t,
              }
            );
            if (credit.saldo >= totalAmount) {
              const currentBalance = await Credit.update(
                { saldo: credit.saldo - totalAmount - 20000 },
                { where: { userId: req.user.id } },
                {
                  transaction: t,
                }
              );
              const order = await Order.create(
                {
                  userId: req.user.id,
                  addressId: address.id,
                  noOrder: Math.random(),
                  noTracking: Math.random()
                    .toString(36)
                    .replace(/[^a-z]+/g, "")
                    .substr(0, 5),
                  totalAmount: totalAmount,
                  status: "packed",
                  delivery: 20000,
                },
                {
                  transaction: t,
                }
              );

              await Cart.update(
                { status: "ORDER", noOrder: order.dataValues.noOrder },
                { where: { userId: req.user.id, isCheck: false, status: "OUT" } },
                {
                  transaction: t,
                }
              );
              return responseStandart(
                res,
                "Your order will be delivered soon. Thank you for choosing our app!",
                { currentBalance: currentBalance.saldo, order }
              );
            } else {
              return responseStandart(
                res,
                "your balance is not sufficient to make a payment, please do a top up first",
                {},
                400,
                false
              );
            }
          }else{
            return responseStandart(
              res,
              "No shopping items were found, please shop first",
              {},
              400,
              false
            );
          }
        } else {
          return responseStandart(
            res,
            "Please fill in your shipping address first",
            {},
            400,
            false
          );
        }
      } catch (err) {
        return responseStandart(res, err, {}, 500, false);
      }
    });
  },

  listCart: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortType = "DESC",
        status = "IN",
        noOrder = ""
      } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await Cart.findAndCountAll({
        include: [
          {
            model: DetailProduct,
            include: [Product, ProductColor, ProductSize, ProductImage],
          },
        ],
        where: {
          userId: req.user.id,
          status: status,
          noOrder: status === "ORDER" ? {
            [Op.substring]: null || noOrder,
          } : null,
        },
        order: [[sortBy, sortType]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit) || 10,
      });
      const pageInfo = pagination.paging(
        "customer/cart/",
        req,
        count,
        page,
        limit
      );
      if (rows.length) {
        return responseStandart(res, "success to display list cart", {
          pageInfo,
          results: rows,
        });
      } else {
        return responseStandart(
          res,
          "unable to display list cart",
          {
            pageInfo,
          },
          400,
          false
        );
      }
    } catch (err) {
      return responseStandart(res, err, {}, 500, false);
    }
  },

  listOrder: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortType = "DESC",
      } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await Order.findAndCountAll({
        where: {
          userId: req.user.id,
        },
        order: [[sortBy, sortType]],
        offset: parseInt(offset) || 0,
        limit: parseInt(limit) || 10,
      });
      const result = async () => {
        return Promise.all(
          rows.map(async (item) => {
            const amount = await Cart.count({
              where: {
                status: "ORDER",
                noOrder: item.noOrder
              },
            });
            return Object.assign({}, item.dataValues, {
              Quantity: amount,
            });
          })
        );
      };
      const pageInfo = pagination.paging(
        "customer/order/",
        req,
        count,
        page,
        limit
      );
      result().then((results) => {
        if (results.length) {
          return responseStandart(res, "success to display list order", {
            pageInfo,
            results,
          });
        } else {
          return responseStandart(
            res,
            "unable to display list order",
            {
              pageInfo,
            },
            400,
            false
          );
        }
      });
    } catch (err) {
      return responseStandart(res, err, {}, 500, false);
    }
  },

  detailOrder: async (req, res) => {
    try {
      const results = await Order.findByPk(req.params.id, {
        include: [Address]
      });
      return responseStandart(res, "success to display details order", {
        results
      });
    } catch (err) {
      return responseStandart(res, err, {}, 500, false);
    }
  }
};
