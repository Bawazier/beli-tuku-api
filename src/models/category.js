const db = require('../helper/db');

const tableName = 'category';

const Category = function (category) {
	this.name = category.name;
	this.image = category.image;
};

const queryFindAll = 'SELECT * FROM ??';
// const queryFindById = 'SELECT * FROM ?? WHERE ?';
// const queryFind = 'SELECT ??, DATE_FORMAT(??, "%d %M %Y") AS dateOfBirth FROM ??';
const queryInsert = 'INSERT INTO ?? SET ?';
const queryUpdate = 'UPDATE ?? SET ? WHERE ?';
const queryDelete = 'DELETE FROM ?? WHERE ?';

Category.create = (category, result) => {
	const contents = [
		tableName,
		{
			...category
		}
	];

	db.query(queryInsert, contents, (err) => {
		if(!err){
			result(null, { ...category });
		}else{
			result(err, null);
		}
	});
};

Category.findAll = (result) => {
	db.query(queryFindAll, [tableName], (err, res) => {
		if(!err){
			if (res.length) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		}else{
			result(err, null);
		}
	});
};

Category.update = (category, id, result) => {
	const contents = [
		tableName,
		{
			...category
		},
		{id: id}
	];

	db.query(queryUpdate, contents, (err, res) => {
		if(!err){
			if(res.affectedRows != 0){
				result(null, {...category});
			}else{
				result({ kind: 'not_found' }, null);
			}
		}else{
			result(err, null);
		}
	});
};

Category.delete = (id, result) => {
	const contents = [
		tableName,
		{id: id}
	];

	db.query(queryDelete, contents, (err, res) => {
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

module.exports = Category;
