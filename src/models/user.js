const db = require('../config/db');

const tableName = '`user`';

const User = function (user) {
	this.name = user.name;
	this.email = user.email;
	this.password = user.password;
	this.phone = user.phone;
	this.gender = user.gender;
	this.dateOfBirth = user.dateOfBirth;
};

User.create = (user, result) => {
	db.query(`INSERT INTO ${tableName} (name, email, password, phone, gender, dateOfBirth) 
	VALUES (?,?,?,?,?,?)`, [user.name, user.email, user.password, user.phone, user.gender, user.dateOfBirth],
	(err, res) => {
		if(!err){
			result(null, { ...user });
		}else{
			result(err, res);
		}
	});
};

module.exports = User;