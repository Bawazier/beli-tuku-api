module.exports = {
	//default
	findAll: 'SELECT * FROM ??',
	insert: 'INSERT INTO ?? SET ?',
	update: 'UPDATE ?? SET ? WHERE ?',
	delete: 'DELETE FROM ?? WHERE ?',
	findById: 'SELECT * FROM ?? WHERE ?',

	//custom find
	customFindAll: 'SELECT ?? FROM ??',
	customFindById: 'SELECT ?? FROM ?? WHERE ?',

	//custom join
	findJoinTable: 'SELECT ?? FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?',
	findJoinSecondTable: 'SELECT ?? FROM ?? INNER JOIN ?? ON ?? = ?? INNER JOIN ?? ON ?? = ?? WHERE ?',

	//custom limit
	findAllWithLimit: 'SELECT ?? FROM ?? WHERE ?? LIKE ? ORDER BY ?? ? LIMIT ? OFFSET ?',
	

	//custom update
	updateSecondCondition: 'UPDATE ?? SET ? WHERE ? AND ?',

	//validate
	validateSecondCondition: 'SELECT * FROM ?? WHERE ? AND ?',
};