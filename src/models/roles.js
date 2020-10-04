const db = require('../helper/db');
const query = require('../helper/sqlQuery');

const tableName = 'roles';

const Roles = function (roles) {
	this.role = roles.role;
};

Roles.create = (roles, result) => {
	const contents = [
		tableName,
		{
			...roles
		}
	];

	db.query(query.insert, contents, (err) => {
		if (!err) {
			result(null, { ...roles });
		} else {
			result(err, null);
		}
	});
};

Roles.update = (roles, id, result) => {
	const contents = [
		tableName,
		{
			...roles
		},
		{ id: id },
	];

	db.query(query.update, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, roles);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Roles.findById = (id, result) => {
	const contents = [
		tableName,
		{ id: id }
	];

	db.query(query.findById, contents, (err, res) => {
		if (!err) {
			if (res.length) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Roles.findAll = (result) => {
	const contents = [
		tableName
	];

	db.query(query.findById, contents, (err, res) => {
		if (!err) {
			if (res.length) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Roles.delete = (id, result) => {
	const contents = [
		tableName,
		{ id: id }
	];
	db.query(query.delete, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, res);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

module.exports = Roles;
