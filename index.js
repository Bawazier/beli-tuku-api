const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/helper/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(5000, ()=>{
    console.log('Listening on http://localhost:5000/');
})

app.post('/items', (req, res) => {
    const {name, price, description} = req.body;
    if(name && price && description){
        db.query(`INSERT INTO items(name, price, description) VALUES ('${name}', ${price}, '${description}')`, (err, results, fields) => {
            if(!err){
                res.status(201).send({
                    status: true,
                    message: 'Insert Data Success',
                    data: req.body
                });
            }else{
                console.log(err);
                res.status(500).send({
                    status: false,
                    message: 'Insert Data Fialled'
                });
            }
        });
    }
});