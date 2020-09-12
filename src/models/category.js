const db = require('../config/db');

const tableName = '`category`';

const Category = function (category) {
	this.name = category.name;
};

Category.create = (category, result) => {
	db.query(`INSERT INTO ${tableName} (name) VALUES (?)`, [category.name], (err) => {
		if(!err){
			result(null, { ...category });
		}else{
			result(err, null);
		}
	});
};

Category.findAll = (result) => {
	db.query(`SELECT * FROM ${tableName}`, (err, res) => {
		if(!err){
			result(null, res);
		}else{
			result(err, null);
		}
	});
};



module.exports = Category;
