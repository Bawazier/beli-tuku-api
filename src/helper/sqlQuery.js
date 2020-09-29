module.exports = {
	findAll: 'SELECT * FROM ??',
	insert: 'INSERT INTO ?? SET ?',
	update: 'UPDATE ?? SET ? WHERE ?',
	updateTwoCondition: 'UPDATE ?? SET ? WHERE ? AND ?',
	delete: 'DELETE FROM ?? WHERE ?',
	findById: 'SELECT * FROM ?? WHERE ?',
	validateTwoCondition: 'SELECT * FROM ?? WHERE ? AND ?',
};