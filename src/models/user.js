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

User.findById = (id, result) => {
	db.query(`SELECT * FROM ${tableName} WHERE id=?`, [id], (err, res) => {
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

User.updateAll = (user, id, result) => {
	db.query(`UPDATE ${tableName} SET name=?, email=?, password=?, phone=?, gender=?, dateOfBirth=? 
	WHERE id=?`, [user.name, user.email, user.password, user.phone, user.gender, user.dateOfBirth, id], 
	(err, res) => {
		if(!err){
			result(null, {...user});
		}else{
			result(err, res);
		}
	});
};

User.findAll = (result) =>{
	db.query(`SELECT * FROM ${tableName}`, (err, res) => {
		if(!err){
			result(null, res);
		}else{
			result(err, null);
		}
	});
};

User.deleteById = (id, result) => {
	db.query(`DELETE FROM ${tableName} WHERE id = ?`, [id], (err, res) => {
		if(!err){
			result(null, res);
		}else{
			result(err, null);
		}
	});
};

module.exports = User;