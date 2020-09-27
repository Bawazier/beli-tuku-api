const db = require('../helper/db');

const tableName = 'user_address';
const tableJoin = 'user';

const Address = function (address) {
	this.user_id = address.user_id;
	this.name = address.name;
	this.recipient_name = address.recipient_name;
	this.recipient_tlp = address.recipient_tlp;
	this.address = address.address;
	this.region = address.region;
	this.postal_code = address.postal_code;
};

// const queryFindAll = 'SELECT * FROM ??';
const queryFind = 'SELECT ?? FROM ?? WHERE ?';
const queryInsert = 'INSERT INTO ?? SET ?';
const queryUpdate = 'UPDATE ?? SET ? WHERE ?';
const queryDelete = 'DELETE FROM ?? WHERE ?';
const queryValidate = 'SELECT * FROM ?? WHERE ?';

Address.create = (address, result) => {
	const contentsValidate = [
		tableJoin,
		{ id: address.user_id }
	];
	const contents = [
		tableName,
		{
			...address
		}
	];

	db.query(queryValidate, contentsValidate, (err, res) => {
		if (res.length) {
			db.query(queryInsert, contents, (err) => {
				if (!err) {
					result(null, { ...address });
				} else {
					result(err, null);
				}
			});
		} else {
			result('User is not found', null);
		}
	});
};

Address.update = (address, id, result) => {
	const contents = [
		tableName,
		{
			...address
		},
		{ id: id }
	];

	db.query(queryUpdate, contents, (err, res) => {
		if (!err) {
			if (res.affectedRows != 0) {
				result(null, address);
			} else {
				result({ kind: 'not_found' }, null);
			}
		} else {
			result(err, null);
		}
	});
};

Address.findByUserId = (id, result) => {
	const contents = [
		[
			'id',
			'user_id',
			'name',
			'recipient_name',
			'recipient_tlp',
			'address',
			'region',
			'postal_code',
		],
		tableName,
		{user_id: id}
	];

	db.query(queryFind, contents, (err, res) => {
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

Address.deleteByUserId = (id, result) => {
	const contents = [
		tableName,
		{user_id: id}
	];
	db.query(queryDelete, contents, (err, res) => {
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

Address.delete = (id, result) => {
	const contents = [
		tableName,
		{id: id}
	];
	db.query(queryDelete, contents, (err, res) => {
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

module.exports = Address;