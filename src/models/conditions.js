const db = require('../helper/db');
const query = require('../helper/sqlQuery');

const tableName = 'conditions';

const Conditions = function (conditions) {
	this.status = conditions.status;
};

Conditions.create = (conditions, result) => {
	const contents = [
		tableName,
		{
			...conditions
		}
	];

	db.query(query.insert, contents, (err) => {
		if (!err) {
			result(null, { ...conditions });
		} else {
			result(err, null);
		}
	});
};

Conditions.update = (conditions, id, result) => {
	const contents = [
		tableName,
		{
			...conditions
		},
		{ id: id },
	];

	db.query(query.update, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, conditions);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Conditions.findById = (id, result) => {
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

Conditions.findAll = (id, result) => {
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

Conditions.delete = (id, result) => {
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

module.exports = Conditions;
