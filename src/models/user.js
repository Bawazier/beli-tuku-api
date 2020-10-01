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

User.create = (user, result) => {
	const contents = [
		tableName,
		{
			...user
		}
	];

	db.query(query.insert, contents, (err) => {
		if (!err) {
			result(null, { ...user });
		} else {
			result(err, null);
		}
	});
};

User.update = (user, id, result) => {
	const contents = [
		tableName,
		{
			...user
		},
		{ id: id },
	];

	db.query(query.update, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, user);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

User.findById = (id, result) => {
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

User.findAll = (id, result) => {
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

User.delete = (id, result) => {
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


//Custom

User.login = (user, result) => {
	const contents = [tableName, { email: user.email}, {roles_id: user.roles_id}];

	db.query(query.validateSecondCondition, contents,
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

User.createUser = (user, result) => {
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

User.updateUser = (user, id, result) => {
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

User.customFindById = (id, result) => {
	const contents = [
		[
			'name',
			'email',
			'phone',
			'gender',
			'DATE_FORMAT(dateOfBirth, "%d %M %Y") AS dateOfBirth',
			'picture'
		],
		tableName,
		{ id: id }
	];

	db.query(query.customFindById, contents, (err, res) => {
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

User.customFindAll = (result) => {
	const contents = [
		[
			'name',
			'email',
			'phone',
			'gender',
			'picture',
			'DATE_FORMAT(dateOfBirth, "%d %M %Y") AS dateOfBirth',
		],
		tableName,
	];

	db.query(query.customFindAll, contents, (err, res) => {
		if (!err) {
			result(null, res);
		} else {
			result(err, null);
		}
	});
};

module.exports = User;