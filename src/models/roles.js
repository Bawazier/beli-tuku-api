const db = require('../helper/db');

const tableName = 'roles';

const Roles = function (roles) {
	this.role = roles.role;
};

const queryFindAll = 'SELECT * FROM ??';
// const queryFindById = 'SELECT * FROM ?? WHERE ?';
// const queryFind = 'SELECT ??, DATE_FORMAT(??, "%d %M %Y") AS dateOfBirth FROM ??';
const queryInsert = 'INSERT INTO ?? SET ?';
const queryUpdate = 'UPDATE ?? SET ? WHERE ?';
const queryDelete = 'DELETE FROM ?? WHERE ?';

Roles.create = (roles, result) => {
	const contents = [
		tableName,
		{
			role: roles.role
		}
	];

	db.query(queryInsert, contents, (err) => {
		if(!err){
			result(null, { ...roles });
		}else{
			result(err, null);
		}
	});
};

Roles.findAll = (result) => {
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

Roles.update = (roles, id, result) => {
	const contents = [
		tableName,
		{
			role: roles.role
		},
		{id: id}
	];

	db.query(queryUpdate, contents, (err, res) => {
		if(!err){
			if(res.affectedRows != 0){
				result(null, {...roles});
			}else{
				result({ kind: 'not_found' }, null);
			}
		}else{
			result(err, null);
		}
	});
};

Roles.delete = (id, result) => {
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

module.exports = Roles;
