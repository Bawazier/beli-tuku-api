const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/helper/db');
const qs = require('querystring');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(5000, () => {
    console.log('Listening on http://localhost:5000/');
})

app.post('/items', (req, res) => {
    const { name, price, description } = req.body;
    if (name && price && description) {
        db.query(`INSERT INTO items(name, price, description) VALUES ('${name}', ${price}, '${description}')`, (err, results, fields) => {
            if (!err) {
                res.status(201).send({
                    success: true,
                    message: 'Insert Data Success',
                    data: req.body
                });
            } else {
                console.log(err);
                res.status(500).send({
                    success: false,
                    message: 'Insert Data Failled'
                });
            }
        });
    } else {
        res.status(400).send({
            success: false,
            message: 'Input data Failled'
        });
    }
});

app.get('/items', (req, res) => {
    let { page, limit, search } = req.query;
    let searchKey = '';
    let searchValue = '';
    if (typeof (search) === 'object') {
        searchKey = Object.keys(search)[0];
        serachValue = Object.values(search)[0];
    } else {
        searchKey = 'name';
        serachValue = search || '';
    }

    if (!limit) {
        limit = 5;
    } else {
        limit = parseInt(limit);
    }

    if (!page) {
        page = 1;
    } else {
        page = parseInt(page);
    }

    const offset = (page - 1) * limit;

    db.query(`SELECT * FROM items WHERE ${searchKey} LIKE '%${searchValue}%' 
    LIMIT ${limit} OFFSET ${offset}`, (err, results, fields) => {
        if (!err) {
            const pageInfo = {
                count: 0,
                pages: 0,
                currentPage: page,
                limitPage: limit,
                nextLink: null,
                prevLink: null
            }

            if (results.length) {
                db.query(`SELECT COUNT(*) AS count FROM items WHERE ${searchKey} LIKE '%${searchValue}%'`,
                    (err, data, fields) => {
                        const { count } = data[0];
                        pageInfo.count = count;
                        pageInfo.pages = Math.ceil(count / limit);

                        const { pages, currentPage } = pageInfo;

                        if (currentPage < pages) {
                            pageInfo.nextLink = `http://localhost:5000/items?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`;
                        }

                        if (currentPage > 1) {
                            pageInfo.prevLink = `http://localhost:5000/items?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`;
                        }

                        res.send({
                            success: true,
                            message: 'List of items',
                            data: results,
                            pageInfo
                        });
                    })
            } else {
                res.send({
                    success: false,
                    message: 'List of items'
                });
            }
        } else {
            console.log(err);
        }
    });
});

app.put('/items/:id', (req, res) => {
    const { name, price, description } = req.body;
    let { id } = req.params;
    if (name && price && description) {
        db.query(`UPDATE items SET name = '${name}', price = ${price}, description = '${description}' WHERE id = ${id}`,
            (err, respone, fields) => {
                if (!err) {
                    res.send({
                        success: true,
                        message: 'Updated Success',
                        data: respone
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'Updated Failled'
                    });
                }
            });
    } else {
        res.send("Data you must be true");
    }
});

app.delete('/items/:id', (req, res) => {
    let {id} = req.params;
    db.query(`DELETE FROM items WHERE id = ${id}`, (err, respone, fields) => {
        if(!err){
            res.send({
                success: true,
                message: 'Deleted Success',
                data: respone
            });
        }else{
            res.send({
                success: false,
                message: 'Deleted Failled'
            });
        }
    });
});

app.get('/items/:id', (req, res) => {
    let {id} = req.params;
    db.query(`SELECT * FROM items WHERE id = ${id}`, (err, respone, fields) => {
        if(!err){
            res.send({
                success: true,
                message: 'SELECT BY ID SUCCESS',
                data: respone
            });
        }else{
            res.send({
                success: false,
                message: 'SELECT BY ID FAILLED'
            });
        }
    });
})