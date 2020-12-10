const {
  ProductRating,
  RatingImage,
} = require("../../models");
const responseStandart = require("../../helper/response");
const multer = require("multer");
const schema = require("../../helper/validation");
const options = require("../../helper/upload");
const { sequelize } = require("../../models");

const upload = options.array("picture", 4);
const RatingsSchema = schema.Ratings;


module.exports = {
  postRating: async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return responseStandart(res, err, {}, 500, false);
      } else if (err) {
        return responseStandart(res, err, {}, 500, false);
      }
      try{
        const [rating, created] = await ProductRating.findOrCreate(
          {
            where: { userId: req.user.id, productId: req.params.id },
            defaults: {
              userId: req.user.id,
              productId: req.params.id,
              rating: req.body.rating,
              comment: req.body.comment,
            },
          }
        );
        console.log(rating.dataValues.id);
        if (created) {
          const ratingImage = await RatingImage.bulkCreate([...req.files.map((item) => {
            return {
              ratingId: rating.dataValues.id,
              picture: item.path || null,
            };
          })
          ]); 
          return responseStandart(
            res,
            "success create review for this product",
            { rating, ratingImage }
          );
        }else {
          return responseStandart(
            res,
            "you have already given a review for this product",
            {},
            400,
            false
          );
        }
      }catch(e){
        return responseStandart(res, e, {}, 500, false);
      }
    });
  },
};