/* eslint-disable no-unused-vars */
const db = require('../config/db');

const tableName = '`product`';
const tableJoin = '`category`';

const Product = function (product) {
	this.name = product.name;
	this.price = product.price;
	this.created_at = product.created_at;
	this.updated_at = product.updated_at;
	this.categoryId = product.categoryId;
	this.description = product.description;
};

Product.create = (product, result)=>{
	db.query(`SELECT * FROM ${tableJoin} WHERE id = ?`, [product.categoryId], (err, res) =>{
		if(res.length){
			db.query(`INSERT INTO ${tableName} (name, price, created_at, updated_at, category_id, description)
	VALUES (?,?,?,?,?,?)`, [product.name, product.price, product.created_at, product.updated_at, 
				product.categoryId, product.description], (err) => {
				if(!err){
					result(null, {...product});
				}else{
					result(err, null);
				}
			});
		}else{
			result('Category is not found', null);
		}
	});
	
};

Product.findById = (id, result) => {
	db.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id], (err, res) => {
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

Product.findAll = (offset, limit, searchKey, searchValue, sortBy, sort, result) =>{
	db.query(`SELECT product.id, product.name AS productName, product.price, category.name AS Category, product.created_at, product.updated_at, product.description 
	AS categoryName FROM ${tableName} 
	INNER JOIN ${tableJoin} ON product.category_id = category.id WHERE ${searchKey} LIKE '%${searchValue}%' 
	ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
		if(!err){
			if(res.length){
				db.query(`SELECT COUNT(*) AS count FROM ${tableName} WHERE ${searchKey} LIKE '%${searchValue}%'`, 
					(err, data) => {
						result(null, res, data);
					});
			}else{
				result({ kind: 'not_found' }, null, null);
			}
		}else{
			result(err, null, null);
		}
	});
};

Product.updateAll = (product, id, result) => {
	db.query(`SELECT * FROM ${tableJoin} WHERE id = ?`, [product.categoryId], (err, res) =>{
		if(res.length){
			db.query(`UPDATE ${tableName} SET name=?, price=?, updated_at=?, category_id=?, description=? WHERE id=?`, 
				[product.name, product.price, product.updated_at, product.categoryId, product.description, id], 
				(err, res) => {
					if(!err){
						result(null, {...product});
					}else{
						result(err, null);
					}
				});
		}else{
			result('Category is not found', null);
		}
	});
};

Product.updateById = (product, id, result) => {
	db.query(`UPDATE ${tableName} SET ${product} WHERE id=?`, 
		[id], 
		(err, res) => {
			if(!err){
				if(res.affectedRows != 0){
					result(null, product);
				}else{
					result({ kind: 'not_found' }, null);
				}
			}else{
				result(err, null);
			}
		});
};

Product.deleteById = (id, result) => {
	db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id], (err, res) => {
		if(!err){
			if(res.affectedRows != 0){
				result(null, res);
			}else{
				result({ kind: 'not_found' }, null);
			}
		}else{
			result(err, null);
		}
	});
};

module.exports = Product;