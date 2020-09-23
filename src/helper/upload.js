/* eslint-disable no-unused-vars */
const multer = require('multer');

// const options = {
// 	dest: 'assets/uploads/'
// };

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, 'assets/uploads/');
	},
	filename: (_req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	}
});


module.exports = multer({storage});