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
        const results = await sequelize.transaction(async (t) => {
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
              [
                {
                  productId: product.dataValues.id,
                  picture: req.files[0].path,
                  isPrimary: true,
                },
                {
                  productId: product.dataValues.id,
                  picture: req.files[1].path,
                  isPrimary: false,
                },
                {
                  productId: product.dataValues.id,
                  picture: req.files[2].path,
                  isPrimary: false,
                },
                {
                  productId: product.dataValues.id,
                  picture: req.files[3].path,
                  isPrimary: false,
                },
              ],
              { transaction: t }
            );
            await ProductSize.bulkCreate(
              [
                {
                  productId: product.dataValues.id,
                  size: result.size[0],
                  isPrimary: true,
                },
                {
                  productId: product.dataValues.id,
                  size: result.size[1],
                  isPrimary: false,
                },
                {
                  productId: product.dataValues.id,
                  size: result.size[2],
                  isPrimary: false,
                },
                {
                  productId: product.dataValues.id,
                  size: result.size[3],
                  isPrimary: false,
                },
              ],
              { transaction: t }
            );
          } catch (errs) {
            return responseStandart(res, errs, {}, 500, false);
          }
        });
        console.log(results);
        return responseStandart(res, "has successfully sold the product", {
          results,
        });
      } catch (e) {
        return responseStandart(res, e, {}, 400, false);
      }
    });
  },
};