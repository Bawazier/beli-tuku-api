const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(5000, () => {
	console.log('Listening on http://localhost:5000/');
});

const productRouter = require('./src/routes/product');
const categoryRouter = require('./src/routes/category');
const userRouter = require('./src/routes/user');

// attach member router
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/user', userRouter);
