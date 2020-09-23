const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(5000, () => {
	console.log('Listening on http://localhost:5000/');
});

//provide static file
app.use('/product/uploads/img', express.static('assets/uploads'));

const productRouter = require('./src/routes/product');
const categoryRouter = require('./src/routes/category');
const userRouter = require('./src/routes/user');
const cartRouter = require('./src/routes/cart');

// attach member router
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/cart', cartRouter);
app.use('/user', userRouter);
