const { Product, ProductColor, ProductImage, ProductSize, Store } = require("../../models");
const responseStandart = require("../../helper/response");
const multer = require("multer");
const schema = require("../../helper/validation");
const options = require("../../helper/upload");
const { sequelize } = require("../../models");

const upload = options.array("picture", 4);
const SellingProductSchema = schema.SellingProduct;


module.exports = {
  postProduct: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false);
      } else if (err) {
        return responseStandart(res, err, {}, 500, false);
      }
      try {
        await sequelize.transaction(async (t) => {
          try {
            const result = await SellingProductSchema.required().validateAsync(
              req.body
            );
            const store = await Store.findOne({
              where: { userId: req.user.id },
            });
            const dataProduct = {
              storeId: store.id,
              categoryId: result.categoryId,
              conditionId: result.conditionId,
              name: result.name,
              price: result.price,
              stock: result.stock,
              description: result.description,
            };
            const product = await Product.create(dataProduct, {
              transaction: t,
            });
            await ProductColor.bulkCreate(
              [
                {
                  productId: product.dataValues.id,
                  name: result.nameColor[0],
                  hexa: result.hexaColor[0],
                  status: result.statusColor[0],
                  isPrimary: true,
                },
                {
                  productId: product.dataValues.id,
                  name: result.nameColor[1],
                  hexa: result.hexaColor[1],
                  status: result.statusColor[1],
                  isPrimary: false,
                },
                {
                  productId: product.dataValues.id,
                  name: result.nameColor[2],
                  hexa: result.hexaColor[2],
                  status: result.statusColor[2],
                  isPrimary: false,
                },
                {
                  productId: product.dataValues.id,
                  name: result.nameColor[3],
                  hexa: result.hexaColor[3],
                  status: result.statusColor[3],
                  isPrimary: false,
                },
              ],
              { transaction: t }
            );
            await ProductImage.bulkCreate(
              [...req.files.map((item, index) => {
                return {
                  productId: product.dataValues.id,
                  picture: item.path,
                  isPrimary: index === 0 ? true : false,
                };
              })],
              { transaction: t }
            );
            await ProductSize.bulkCreate(
              [
                ...result.size.map((item, index) => {
                  return {
                    productId: product.dataValues.id,
                    size: item,
                    isPrimary: index === 0 ? true : false,
                  };
                }),
              ],
              { transaction: t }
            );
            return responseStandart(res, "has successfully sold the product", {
              results: product,
            });
          } catch (errs) {
            return responseStandart(res, errs, {}, 500, false);
          }
        });
      } catch (e) {
        return responseStandart(res, e, {}, 400, false);
      }
    });
  },
};