const mysql = require('mysql');

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'ecommerce'
});

conn.connect((error) => {
	if (error) throw error;
});

module.exports = conn;