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
// const productRouter = require('./src/routes/product');
// const customerRouter = require('./src/routes/customer');
const sallerRouter = require('./src/routes/saller');
// const adminRouter = require('./src/routes/admin');

// attach member router
app.use('/saller', sallerRouter);

//Customer auth
// const customerAuth = require('./src/middlewares/auth');
// app.use('/cart', customerAuth, cartRouter);
