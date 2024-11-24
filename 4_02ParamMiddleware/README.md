# params

``` js
tourRouter.param("id", (req, res, next, val) => {
  console.log(`tour id is: ${val}`);
  next();
});
```

**output:**

postman url: http://localhost:3000/api/v1/tour/3


```
app running on 3000...
hello this is middleware
tour id is: 3
GET /api/v1/tour/3 200 3.664 ms - 950
```