/* eslint-disable no-unused-vars */
const db = require('../config/db');

const tableName = '`product`';

const Product = function (product) {
	this.name = product.name;
	this.price = product.price;
	this.date = product.date;
	this.categoryId = product.categoryId;
	this.description = product.description;
};

Product.create = (product, result)=>{
	db.query(`INSERT INTO ${tableName} (name, price, date, category_id, description)
	VALUES (?,?,?,?,?)`, [product.name, product.price, product.date, product.categoryId, product.description], (err, res) => {
		if(!err){
			result(null, {...product});
		}else{
			result(err, null);
		}
	});
};

module.exports = Product;