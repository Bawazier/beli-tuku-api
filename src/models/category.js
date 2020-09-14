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

Category.findById = (id, result) => {
	db.query(`SELECT * FROM ${tableName} WHERE id=?`, [id], (err, res) => {
		if(!err){
			if(res.length){
				result(null, res);
			}else{
				result({ kind: 'not_found' }, null);
			}
		}else{
			result(err, null);
		}
	});
};

Category.update = (category, id, result) => {
	db.query(`UPDATE ${tableName} SET name=? WHERE id=?`, [category.name, id], (err, res) => {
		if(!err){
			if(res.length){
				result(null, res);
			}else{
				result({ kind: 'not_found' }, null);
			}
		}else{
			result(err, null);
		}
	});
};

Category.delete = (id, result) => {
	db.query(`DELETE FROM ${tableName} WHERE id=?`, [id], (err, res) => {
		if(!err){
			if(res.length){
				result(null, res);
			}else{
				result({ kind: 'not_found' }, null);
			}
		}else{
			result(err, null);
		}
	});
};

module.exports = Category;
