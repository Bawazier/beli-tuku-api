# API Specs

## Authentication

API must use this authentication

###  Sign Up

Request : 
- Method : POST
- Endpoint : `/auth/signup/{id_roles}`
- Header : 
  - Content-Type: application/json
  - Accept: application/json
- Body for customer:

```json 
{
    "name" : "string",
    "email" : "string, unique",
    "password" : "string",
}
```
- Body for saller:

```json 
{
    "name" : "string",
    "email" : "string, unique",
    "phoneNumber": "bigint",
    "storeName": "string",
    "password" : "string",
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  // only for customer
  "credit": {
    "id": "integer, PK",
    "userId": "integer",
    "saldo": "integer",
    "createdAt": "date",
    "updatedAt": "date",
  } 
}
```

###  Sign In

Request : 
- Method : POST
- Endpoint : `/auth/signin`
- Header : 
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json 
{
    "email" : "string, unique",
    "password" : "string",
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "token": "string"
}
```

### Validation Forgot Password

Request : 
- Method : POST
- Endpoint : `/auth/forgot/password`
- Header : 
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json 
{
    "email" : "string, unique",
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "validate": [
    {
        "id": "integer, PK",
        "name": "string",
        "email": "string"
    }
  ]
}
```

###  Forgot Password

Request : 
- Method : POST
- Endpoint : `/auth/forgot/password/{id_user}`
- Header : 
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json 
{
    "newPassword" : "string",
    "confirmPassword" : "string",
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string"
}
```

## Public API

public api does not need authentication

### List Products

Request :
- Method : GET
- Endpoint : `/public/products`
- Header :
  - Accept: application/json
- Query Param : 
  - search : string,
  - page : number,
  - limit : number,
  - sortBy : string || `createdAt`,
  - sortType : string || `DESC`,
  - searchColor : string,
  - searchSize : string,
  - searchStore : string,
  - searchCategory : string,
  - color : array,
  - size : array,
  - store : array,
  - category : array,
  - status : array,

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "pageInfo" : {
    "count" : "number",
    "pages" : "number",
    "currentPage" : "number",
    "dataPerPage" : "number,
    "nextLink" : "string",
    "prevLink" : "string",
  },
  "results" : [
    {
      "id" : "integer, PK",
      "name" : "string",
      "price" : "integer",
      "stock" : "integer",
      "description" : "string",
      "createdAt" : "date",
      "updatedAt" : "date",
      "Condition" : {"status" : "string"},
      "User" : {"name" : "string", "picture" : "string"},
      "Image" : {"picture" : "string"},
      "Rating" : "number"
    },
    {
      "id" : "integer, PK",
      "name" : "string",
      "price" : "integer",
      "stock" : "integer",
      "description" : "string",
      "createdAt" : "date",
      "updatedAt" : "date",
      "Condition" : {"id" : "integer", "status" : "string"},
      "Category" : {"id" : "integer", "name" : "string"},
      "Store" : {"id" : "integer", "name" : "string", "description" : "string"},
      "ProductColors": [
                {
                    "id": "integer",
                    "name": "string",
                    "hexa": "string",
                    "status": "available" || "empty",
                    "isPrimary": "boolean"
                },
                {
                    "id": "integer",
                    "name": "string",
                    "hexa": "string",
                    "status": "available" || "empty",
                    "isPrimary": "boolean"
                },
            ],
      "ProductSizes": [
                {
                    "id": "integer",
                    "size": "string",
                    "isPrimary": "boolean"
                },
                {
                    "id": "integer",
                    "size": "string",
                    "isPrimary": "boolean"
                },
            ],
      "ProductImages": [
                {
                    "id": "integer",
                    "picture": "string, path",
                    "isPrimary": "true"
                }
            ],
      "ratings" : "number"
    }
  ]
}
```

### List Categories

Request :
- Method : GET
- Endpoint : `/public/categories`
- Header :
  - Accept: application/json
- Query Param : 
  - search : string,
  - page : number,
  - limit : number,

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "pageInfo" : {
    "count" : "number",
    "pages" : "number",
    "currentPage" : "number",
    "dataPerPage" : "number,
    "nextLink" : "string",
    "prevLink" : "string",
  },
  "results" : [
    {
      "id" : "integer, PK",
      "name" : "string",
      "picture" : "string",
      "color" : "color",
      "createdAt" : "date",
      "updatedAt" : "date"
    },
    {
      "id" : "integer, PK",
      "name" : "string",
      "picture" : "string",
      "color" : "color",
      "createdAt" : "date",
      "updatedAt" : "date"
    },
  ]
}
```

### Get Details Product

Request :
- Method : GET
- Endpoint : `/public/products/{id_product}`
- Header :
  - Accept: application/json

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "results" : [
    {
      "id" : "integer, PK",
      "name" : "string",
      "price" : "integer",
      "stock" : "integer",
      "description" : "string",
      "createdAt" : "date",
      "updatedAt" : "date",
      "Condition" : {"status" : "string"},
      "User" : {"name" : "string", "picture" : "string"},
      "Image" : {"picture" : "string"},
      "Rating" : "number"
    },
    {
      "id" : "integer, PK",
      "name" : "string",
      "price" : "integer",
      "stock" : "integer",
      "description" : "string",
      "createdAt" : "date",
      "updatedAt" : "date",
      "Condition" : {"id" : "integer", "status" : "string"},
      "Category" : {"id" : "integer", "name" : "string"},
      "Store" : {"id" : "integer", "name" : "string", "description" : "string"},
      "ProductColors": [
                {
                    "id": "integer",
                    "name": "string",
                    "hexa": "string",
                    "status": "available" || "empty",
                    "isPrimary": "boolean"
                },
                {
                    "id": "integer",
                    "name": "string",
                    "hexa": "string",
                    "status": "available" || "empty",
                    "isPrimary": "boolean"
                },
            ],
      "ProductSizes": [
                {
                    "id": "integer",
                    "size": "string",
                    "isPrimary": "boolean"
                },
                {
                    "id": "integer",
                    "size": "string",
                    "isPrimary": "boolean"
                },
            ],
      "ProductImages": [
                {
                    "id": "integer",
                    "picture": "string, path",
                    "isPrimary": "boolean"
                }
            ],
      "ratings" : "number"
    }
  ]
}
```

### Get Details Product Reviews

Request :
- Method : GET
- Endpoint : `/public/product/reviews/{id_product}`
- Header :
  - Accept: application/json
- Query Param : 
  - search : string,
  - page : number,
  - limit : number,
  - sortBy : string || `createdAt`,
  - sortType : string || `DESC`,

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "pageInfo" : {
      "count" : "number",
      "pages" : "number",
      "currentPage" : "number",
      "dataPerPage" : "number,
      "nextLink" : "string",
      "prevLink" : "string",
    },
  "results": [
        {
            "id": "integer",
            "productId": "integer",
            "userId": "integer",
            "rating": "integer",
            "comment": "string",
            "createdAt": "date",
            "updatedAt": "date",
            "RatingImages": [
                {
                    "id": "integer",
                    "picture": "string"
                },
                {
                    "id": "integer",
                    "picture": "string"
                },
                {
                    "id": "integer",
                    "picture": "string"
                }
            ],
            "User": {
                "id": "integer",
                "name": "string",
                "picture": "string"
            }
        }
    ]
}
```

## Customer API

Customer API must use this authentication

Request :
- Header :
    - X-Api-Key : "your secret api key"

### Change Password

- Method : POST
- Endpoint : `/customer/change/password`
- Header : 
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json 
{
    "oldPassword" : "string",
    "newPassword" : "string",
    "confirmNewPassword" : "string",
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string"
}
```

### Get Account

Request :
- Method : GET
- Endpoint : `/customer/account`
- Header :
  - Accept: application/json

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "results" : {
    "id" : "integer, PK",
    "name" : "string",
    "email" : "string",
    "phone" : "string",
    "gender" : "string",
    "dateOfBirth" : "date",
    "picture" : "string",
    "createdAt" : "date",
    "updatedAt" : "date",
    "URL_picture" : "string",
    "Credit": {
                "id": "integer",
                "userId": "integer",
                "saldo": "integer",
                "createdAt": "date",
                "updatedAt": "date"
            },
  }
}
```

### Update Account

Request :
- Method : PATCH/PUT
- Endpoint : `/customer/account`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
    "email" : "string",
    "phone" : "string",
    "gender" : "string",
    "dateOfBirth" : "date",
    "picture" : "string",
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string"
}
```

### Post Address

Request :
- Method : POST
- Endpoint : `/customer/address`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
    "recipientName" : "string",
    "recipientTlp" : "string",
    "address" : "string",
    "region" : "string",
    "postalCode" : "string",
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string"
}
```

### Update Address

Request :
- Method : PATCH/PUT
- Endpoint : `/customer/address/{id_address}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "name" : "string",
    "recipientName" : "string",
    "recipientTlp" : "string",
    "address" : "string",
    "region" : "string",
    "postalCode" : "string",
    "isPrimary" : "boolean",
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string"
}
```

### Get Address

Request :
- Method : GET
- Endpoint : `/customer/address/{id_address}`
- Header :
  - Accept: application/json

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "results" : {
      "id" : "integer, PK",
      "name" : "string",
      "recipientName" : "string",
      "recipientTlp" : "string",
      "address" : "string",
      "region" : "string",
      "postalCode" : "string",
      "isPrimary" : "boolean",
  },
}
```

### List Address

Request :
- Method : GET
- Endpoint : `/customer/address`
- Header :
  - Accept: application/json

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "results" : [
    {
      "id" : "integer, PK",
      "name" : "string",
      "recipientName" : "string",
      "recipientTlp" : "string",
      "address" : "string",
      "region" : "string",
      "postalCode" : "string",
      "isPrimary" : "boolean",
    },
    {
      "id" : "integer, PK",
      "name" : "string",
      "recipientName" : "string",
      "recipientTlp" : "string",
      "address" : "string",
      "region" : "string",
      "postalCode" : "string",
      "isPrimary" : "boolean",
    },
  ]
}
```

### Delete Address

Request :
- Method : DELETE
- Endpoint : `/customer/address/{id_address}`
- Header :
    - Accept: application/json

Response :
```json
{
  "status" : "boolean",
  "message" : "string"
}
```

### Post Product Ratings

Request :
- Method : POST
- Endpoint : `/customer/rating/product/{id_product}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "rating" : "string",
    "comment" : "string",
    "picture" : "file"
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string"
}
```

### List Topups

Request :
- Method : GET
- Endpoint : `/customer/topup`
- Header :
  - Accept: application/json

Response :
```json
{
  "success": "boolean",
  "message": "string",
  "count": "number",
  "results": [
      {
          "id": "integer, PK",
          "charge": "bigint",
          "createdAt": "date",
          "updatedAt": "date"
      },
      {
          "id": "integer, PK",
          "charge": "bigint",
          "createdAt": "date",
          "updatedAt": "date"
      },
  ],
}
```

### Topup Credit

Request :
- Method : POST
- Endpoint : `/customer/topup/{id_topup}`
- Header :
  - Accept: application/json

Response :
```json
{
  "success": "boolean",
  "message": "string",
  "count": "number",
  "results": {
      "saldo": "bigint"
   }
}
```


### Post Shooping Cart

Request :
- Method : POST,
- Endpoint : `/customer/cart/{id_product}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Query Params :
    - productColorId : "number"
    - productImageId : "number"
    - productSizeId : "number"
- Body :

```json 
{
    "quantity" : "string",
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "results": {
        "id": "integer, PK",
        "storeId": "integer",
        "categoryId": "integer",
        "conditionId": "integer",
        "name": "string",
        "price": "bigint",
        "stock": "integer",
        "description": "string",
        "createdAt": "date",
        "updatedAt": "date",
        "ProductImages": [
            {
                "id": "integer, PK",
                "picture": "string"
            }
        ],
        "ProductColors": [
            {
                "id": "integer, PK",
                "name": "string",
                "hexa": "string"
            }
        ],
        "ProductSizes": [
            {
                "id": "integer, PK",
                "size": "string"
            }
        ]
    }
}
```

### Checkout Shooping Cart

Request :
- Method : PUT
- Endpoint : `/customer/cart/out/{id_cart}`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
    "quantity" : "string",
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "results": {
      "totalPrice": "bigint"
   }
}
```

### Discard Checkout Shooping Cart

Request :
- Method : PUT
- Endpoint : `/customer/cart/in`
- Header :
    - Content-Type: application/json
    - Accept: application/json

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
}
```

### List Shooping Cart

Request :
- Method : GET,
- Endpoint : `/customer/cart`
- Header :
  -Accept: application/json
- Query Param : 
  - page : number,
  - limit : number,
  - sortBy : string || `createdAt`,
  - sortType : string || `DESC`,
  - status = "IN" || "OUT" || "ORDER",
  - noOrder = "string" //only if status ORDER,

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "pageInfo" : {
      "count" : "number",
      "pages" : "number",
      "currentPage" : "number",
      "dataPerPage" : "number,
      "nextLink" : "string",
      "prevLink" : "string",
    },
  "results" : [
    {
      "id" : "integer, PK",
      "detailProductId" : "integer",
      "productId" : "integer",
      "quantity" : "integer",
      "totalPrice" : "integer",
      "isCheck" : "boolean",
      "status" : "string",
      "noOrder": "string",
      "createdAt" : "date",
      "updatedAt" : "date",
      "DetailProduct": {
                "id": 14,
                "productId": 16,
                "productColorId": 61,
                "productImageId": 17,
                "productSizeId": 33,
                "createdAt": "2020-12-11T12:30:50.000Z",
                "updatedAt": "2020-12-11T12:30:50.000Z",
                "Product": {
                    "id": "integer, PK",
                    "storeId": "integer",
                    "categoryId": "integer",
                    "conditionId": "integer",
                    "name": "string",
                    "price": "bigint",
                    "stock": "integer",
                    "description": "string",
                    "createdAt": "date",
                    "updatedAt": "date",
                },
                "ProductColor": {
                    "id": "integer, PK",
                    "productId": "integer",
                    "name": "string",
                    "hexa": "string",
                    "status": "string",
                    "isPrimary": "boolean",
                    "createdAt": "date",
                    "updatedAt": "date"
                },
                "ProductSize": {
                    "id": "integer, PK",
                    "productId": "integer",
                    "size": "string",
                    "isPrimary": "boolean",
                    "createdAt": "date",
                    "updatedAt": "date"
                },
                "ProductImage": {
                    "id": "integer, PK",
                    "productId": "integer",
                    "picture": "string",
                    "isPrimary": "boolean",
                    "createdAt": "date",
                    "updatedAt": "date"
                }
            }
    }
  ]
}
```

### Order By Credit

Request : 
- Method : POST
- Endpoint : `customer/order`
- Header :
    - Accept: application/json

Response :
```json
{
  "status" : "boolean",
  "message" : "string"
}
```

### Get Order

Request :
- Method : GET
- Endpoint : `customer/order/{id_order}`
- Header :
  -Accept: application/json

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "results" : {
    "userId" : "integer",
    "addressId" : "integer",
    "noOrder" : "string, unique",
    "noTracking" : "string, unique",
    "totalAmount" : "integer",
    "status" : "string",
    "discount" : "integer",
    "delivery" : "integer",
    "createdAt" : "date",
    "updatedAt" : "date",
    "quantity" : "integer",
    "Address" : {
      "id" : "integer, PK",
      "name" : "string",
      "recipientName" : "string",
      "recipientTlp" : "string",
      "address" : "string",
      "region" : "string",
      "postalCode" : "string",
      "isPrimary" : "boolean",
    }
  }
}
```

### List Order

Request :
- Method : GET
- Endpoint : `customer/order`
- Header :
    - Accept: application/json
- Query Param : 
  - page : number,
  - limit : number,
  - sortBy : string || `createdAt`,
  - sortType : string || `DESC`,

Response :
```json
{
  "status" : "boolean",
  "message" : "string",
  "pageInfo" : {
      "count" : "number",
      "pages" : "number",
      "currentPage" : "number",
      "dataPerPage" : "number,
      "nextLink" : "string",
      "prevLink" : "string",
    },
  "results" : [
    {
      "userId" : "integer",
      "addressId" : "integer",
      "noOrder" : "string, unique",
      "noTracking" : "string, unique",
      "totalAmount" : "integer",
      "status" : "string",
      "discount" : "integer",
      "delivery" : "integer",
      "createdAt" : "date",
      "updatedAt" : "date",
      "Quantity" : "integer",
    }
  ]
}
```

## Saller API

Customer API must use this authentication

Request :
- Header :
    - X-Api-Key : "your secret api key"

### Post Product

Request :
- Method : GET
- Endpoint : `saller/product`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
  "name" : "string",
  "price" : "integer",
  "stock" : "integer",
  "description" : "string",
  "categoryId" : "integer",
  "conditionId" : "integer",
  "Image" : [
    {
      "id" : "integer, Pk",
      "picture" : "string",
      "isPrimary" : "boolean"
    },
    {
      "id" : "integer, Pk",
      "picture" : "string",
      "isPrimary" : "boolean"
    }
  ],
  "Color" : [
    {
      "id" : "integer, Pk",
      "hexa" : "string"
    },
    {
      "id" : "integer, Pk",
      "hexa" : "string"
    }
  ],
}
```

Response :
```json
{
  "status" : "boolean",
  "message" : "string"
}
```
