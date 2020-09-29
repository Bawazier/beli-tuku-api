const db = require('../helper/db');
const query = require('../helper/sqlQuery');

const tableName = 'user';

const User = function (user) {
	this.roles_id = user.roles_id;
	this.name = user.name;
	this.email = user.email;
	this.password = user.password;
	this.phone = user.phone;
	this.gender = user.gender;
	this.dateOfBirth = user.dateOfBirth;
	this.picture = user.picture;
};

// custom query;
const queryFindById = 'SELECT ??, DATE_FORMAT(??, "%d %M %Y") AS dateOfBirth FROM ?? WHERE ?';
const queryFind = 'SELECT ??, DATE_FORMAT(??, "%d %M %Y") AS dateOfBirth FROM ??';

User.login = (result) => {
	const contents = [tableName];

	db.query(query.findAll, contents, (err, res) => {
		if (!err) {
			result(null, res);
		} else {
			result(err, false);
		}
	});
};

User.validateEmail = (user, result) => {
	const contents = [tableName, { email: user.email}, {roles_id: user.roles_id}];

	db.query(query.validateTwoCondition, contents,
		(err, res) => {
			if (!err) {
				if (res.length) {
					result(null, res);
				} else {
					result('Email already used', null);
				}
			} else {
				result(err, false);
			}
		});
};

User.create = (user, result) => {
	const contentsValidate = [
		tableName,
		{ email: user.email }
	];
	const contents = [
		tableName,
		{
			...user
		}
	];

	db.query(query.findById, contentsValidate, (err, res) => {
		if (!res.length) {
			db.query(query.insert, contents, (err, res) => {
				if (!err) {
					result(null, { ...user });
				} else {
					result(err, res);
				}
			});
		} else {
			result('Email already used', null);
		}
	});

};

User.findById = (id, result) => {
	const contents = [
		[
			'name',
			'email',
			'phone',
			'roles_id',
			'gender',
			'picture'
		],
		'dateOfBirth',
		tableName,
		{ id: id }
	];

	db.query(queryFindById, contents, (err, res) => {
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

User.update = (user, id, result) => {
	const contentsValidate = [
		tableName,
		{ email: user.email }
	];
	const contents = [
		tableName,
		{ ...user },
		{ id: id }
	];

	db.query(query.findById, contentsValidate, (err, res) => {
		if (!res.length) {
			db.query(query.update, contents, (err, res) => {
				if (!err) {
					if (res.affectedRows != 0) {
						result(null, { ...user });
					} else {
						result({ kind: 'not_found' }, null);
					}
				} else {
					result(err, res);
				}
			});
		} else {
			result('Email Already Used', null);
		}
	});
};

User.findAll = (result) => {
	const contents = [
		[
			'name',
			'email',
			'phone',
			'roles_id',
			'gender',
			'picture'
		],
		'dateOfBirth',
		tableName,
	];

	db.query(queryFind, contents, (err, res) => {
		if (!err) {
			result(null, res);
		} else {
			result(err, null);
		}
	});
};

User.deleteById = (id, result) => {
	const contents = [
		tableName,
		{
			id: id
		}
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

module.exports = User;