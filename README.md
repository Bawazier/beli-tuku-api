# Ecommerce :octocat:
1. Method Used
- [x] GET
- [x] POST
- [x] PATCH
- [ ] PUT :construction:
- [x] DELETE
2. Routes
- [x] Admin
- [x] Home
- [x] Products
- [x] Login
- [x] Saller
- [x] Customer
3. Features
- [x] CRUD
- [x] JOIN table
- [x] Hash and compare password
- [ ] Search :recycle:
- [ ] Limit :recycle:
- [ ] Sort :recycle:
- [ ] Page Info :recycle:
- [x] Prepared Statement
- [x] JOI validation
- [ ] Upload Images :construction:
- [x] Authentication and Authorization
- [ ] Roles :construction:
- [ ] Error Handling :construction:

## Public Routes

### Home Route
#### GET /home/products

> REQUEST PARAMS

KEY | VALUE
--- | -----
page | \[number of pages\]
limit | \[max number for data\]
search | \[some string for search data\]
sortBy | \[specific order data\]
sort | \[ASC or DESC for order data\]

> Example REQUEST
```javascript
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:5000/home/products/',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
> Example RESPONE
```javascript
{
    success: true,
    message: 'Get All Procucts Success',
    data: [
        {
            "user_id": 26,
            "category_id": 24,
            "conditions_id": 1,
            "name": "Polo Shirt",
            "price": 1000000,
            "stock": 20,
            "maxSize": 45,
            "description": "Filma production",
            "saller_name": "FILMA",
            "category_name": "T-Shirt",
            "conditions_status": "New",
            "created_at": "26 September 2020",
            "updated_at": "26 September 2020"
        }
    ],
    "pageInfo": {
        "count": 1,
        "pages": 1,
        "currentPage": 1,
        "limitPage": 5,
        "nextLink": null,
        "prevLink": null
    }
}
```
#### GET /home/categories
> Example REQUEST
```javascript
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:5000/home/categories/',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```
> Example RESPONE
```javascript
{
    success: true,
    message: 'Get All Procucts Success',
    data: [
        {
            "id": 24,
            "name": "T-Shirt",
            "image": "assets/uploads/1600989276723-hiclipart 15.png",
            "URL_image": "http://localhost:5000/assets/uploads/1600989276723-hiclipart 15.png"
        },
        {
            "id": 27,
            "name": "Teknologi",
            "image": "assets/uploads/1601220206619-hiclipart 21.png",
            "URL_image": "http://localhost:5000/assets/uploads/1601220206619-hiclipart 21.png"
        }
    ]
}
```