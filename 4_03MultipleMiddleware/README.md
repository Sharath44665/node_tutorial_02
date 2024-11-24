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

# chaining multiple middleware functions

tourController js
``` js
exports.checkBody = (req, res, next) => {

  console.log(req.body.name)
  if (!req.body.name || !req.body.price){
    return res.status(400).json({
      "status": "fail",
      "msg": "not found name or price"

    })
  }
```

tourRouter.js

calling the middleware function
``` js
tourRouter.route("/").get(getAllTours).post(checkBody, createTour);
```

output:

during post request in postman if there is no name and price, it wont create.


