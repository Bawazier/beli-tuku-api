require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(process.env.PORT, () => {
	console.log('Listening on http://localhost:5000/');
});

//provide static file
app.use('/assets/uploads/', express.static('assets/uploads'));

// const homeRouter = require('./src/routes/home');
const productRouter = require('./src/routes/products');
const customerRouter = require('./src/routes/customer');
const sallerRouter = require('./src/routes/saller');
const loginRouter = require('./src/routes/login');
// const adminRouter = require('./src/routes/admin');

// attach member router

app.use('/products', productRouter);
app.use('/user', loginRouter);

//Customer auth
const customerAuth = require('./src/middlewares/auth');
app.use('/saller', customerAuth, sallerRouter);
app.use('/customer', customerAuth, customerRouter);