const db = require('../helper/db');

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

// const queryFindAll = 'SELECT * FROM ??';
const queryFindById = 'SELECT * FROM ?? WHERE ?';
const queryFind = 'SELECT ??, DATE_FORMAT(??, "%d %M %Y") AS dateOfBirth FROM ??';
const queryInsert = 'INSERT INTO ?? SET ?';
const queryUpdate = 'UPDATE ?? SET ? WHERE ?';
const queryDelete = 'DELETE FROM ?? WHERE ?';

const queryLogin = 'SELECT * FROM ?? WHERE email=? AND password=?';

User.login = (user, result) => {
	const contents = [tableName, user.email, user.password];

	db.query(queryLogin, contents, 
		(err, res) => {
			if(!err){
				result(null, res);
			}else{
				result(err, false);
			}
		});
};

User.create = (user, result) => {
	const contentsValidate = [
		tableName,
		{email: user.email}
	];
	const contents = [
		tableName,
		{
			name: user.name,
			email: user.email,
			password: user.password,
			phone: user.phone,
			gender: user.gender,
			dateOfBirth: user.dateOfBirth,
			picture: user.picture
		}
	];

	db.query(queryFindById, contentsValidate, (_err, res)=>{
		if(!res.length){
			db.query(queryInsert, contents,(err, res) => {
				if(!err){
					result(null, { ...user });
				}else{
					result('Insert Data Failled', res);
				}
			});
		}else{
			result('Email already used', null);
		}
	});
	
};

User.findById = (id, result) => {
	const contents = [
		tableName,
		{id: id}
	];

	db.query(queryFindById, contents, (err, res) => {
		if(!err) {
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

User.update = (user, id, result) => {
	const contents = [
		tableName,
		{
			name: user.name,
			email: user.email,
			password: user.password,
			phone: user.phone,
			gender: user.gender,
			dateOfBirth: user.dateOfBirth,
			picture: user.picture
		},
		{
			id: id
		}
	];

	db.query(queryUpdate, [contents], (err, res) => {
		if(!err){
			result(null, {...user});
		}else{
			result(err, res);
		}
	});
};

User.findAll = (result) =>{
	const contents = [
		[
			'name',
			'email',
			'gender',
			'gender',
			'picture'
		],
		'dateOfBirth',
		tableName,
	];

	db.query(queryFind, contents, (err, res) => {
		if(!err){
			result(null, res);
		}else{
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

	db.query(queryDelete, contents, (err, res) => {
		if(!err){
			result(null, res);
		}else{
			result(err, null);
		}
	});
};

module.exports = User;