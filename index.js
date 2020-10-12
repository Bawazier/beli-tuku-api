require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(process.env.PORT, () => {
	console.log('Listening on http://localhost:5000/');
});

//provide static file
app.use('/assets/uploads/', express.static('assets/uploads'));

const homeRouter = require('./src/routes/home');
const productDetailsRouter = require('./src/routes/productDetails');
const customerRouter = require('./src/routes/customer');
const sallerRouter = require('./src/routes/saller');
const auth = require('./src/routes/auth');

// attach member router
app.use('/auth', auth);
app.use('/home', homeRouter);
app.use('/products', productDetailsRouter);

//Customer auth
const customerAuth = require('./src/middlewares/auth');
const validation = require('./src/middlewares/rolesValidation');
app.use('/customer', customerAuth, validation.customer, customerRouter);
app.use('/saller', customerAuth, validation.saller, sallerRouter);