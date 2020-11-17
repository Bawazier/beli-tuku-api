const responseStandart = require("../helper/response");

module.exports = {
  customer: (req, res, next) => {
    if(req.user.rolesId === 3){
      next();
    }else{
      return responseStandart(res, "Forbidden access", {}, 403, false);
    }
  },
  saller: (req, res, next) => {
    if(req.user.rolesId === 2){
      next();
    }else{
      return responseStandart(res, "Forbidden access", {}, 403, false);
    }
  }
};