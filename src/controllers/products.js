const {Product, ProductColor, ProductImage, ProductRating} = require("../models");
const responseStandart = require("../helper/response");
const multer = require("multer");
const schema = require("../helper/validation");
const options = require("../helper/upload");

const upload = options.array("picture", 4);
const ProductSchema = schema.Products;
const RatingsSchema = schema.Ratings;


module.exports = {
  postProduct: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false);
      } else if (err) {
        return responseStandart(res, err, {}, 500, false);
      }
      try {
        const result = await ProductSchema.required().validateAsync(req.body);
        const dataProduct = {
          userId: req.user.id,
          categoryId: result.categoryId,
          conditionId: result.conditionId,
          name: result.name,
          price: result.price,
          stock: result.stock,
          description: result.description,
        };
        const product = await Product.create(dataProduct);
        if(product.dataValues){
          await result.hexa.map((item) => {
            const dataColor = {
              productId: product.dataValues.id,
              name: item,
              hexa: item,
            };
            ProductColor.create(dataColor);
          });
          await req.files.map((item, index) => {
            const dataImage = {
              productId: product.dataValues.id,
              picture: item.path,
              isPrimary: index === 0 ? true : false,
            };
            ProductImage.create(dataImage);
          });
          return responseStandart(res, "success create your product", {});
        }else{
          return responseStandart(
            res,
            "product not found",
            {},
            404,
            false
          );}
      } catch (e) {
        return responseStandart(res, e, {}, 400, false);
      }
    });
  },

  postRating: async (req, res) => {
    try {
      const result = await RatingsSchema.required().validateAsync(req.body);
      const dataProductRating = {
        userId: req.user.id,
        productId: result.productId,
        rating: result.rating,
        comment: result.comment,
      };
      await ProductRating.create(dataProductRating);
      return responseStandart(res, "success add rating for this product", {});
    } catch (e) {
      return responseStandart(res, e, {}, 400, false);
    }
  }
};