const db = require('../helper/db');

const tableName = 'conditions';

const Conditions = function (conditions) {
	this.status = conditions.status;
};

const queryFindAll = 'SELECT * FROM ??';
// const queryFindById = 'SELECT * FROM ?? WHERE ?';
// const queryFind = 'SELECT ??, DATE_FORMAT(??, "%d %M %Y") AS dateOfBirth FROM ??';
const queryInsert = 'INSERT INTO ?? SET ?';
const queryUpdate = 'UPDATE ?? SET ? WHERE ?';
const queryDelete = 'DELETE FROM ?? WHERE ?';

Conditions.create = (conditions, result) => {
	const contents = [
		tableName,
		{
			status: conditions.status
		}
	];

	db.query(queryInsert, contents, (err) => {
		if(!err){
			result(null, { ...conditions });
		}else{
			result(err, null);
		}
	});
};

Conditions.findAll = (result) => {
	db.query(queryFindAll, [tableName], (err, res) => {
		if(!err){
			result(null, res);
		}else{
			result(err, null);
		}
	});
};

Conditions.update = (conditions, id, result) => {
	const contents = [
		tableName,
		{
			status: conditions.status
		},
		{id: id}
	];

	db.query(queryUpdate, contents, (err, res) => {
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

Conditions.delete = (id, result) => {
	const contents = [
		tableName,
		{id: id}
	];

	db.query(queryDelete, contents, (err, res) => {
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

module.exports = Conditions;
