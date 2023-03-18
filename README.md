# Monolith estructure module based

## Run tests

`npm run test`

## Run server

`npm run server`

# Requests

## Get products

```
curl localhost:3030/products
{"products":[]}
```

## Create product

```
curl -d '{"name": "my product", "description": "value2", "price": 230, "stock": 1}' -H "Content-Type: application/json" -X POST localhost:3030/product

```
