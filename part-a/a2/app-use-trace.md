# app.use — Hand Traces

## Trace 1 — Normal Input

### Input

app.use('/v1/flights', logRequests, listFlightsHandler)

### Hand Trace

1. Start with offset = 0 and path = "/".
2. Check the first argument.
3. The first argument is "/v1/flights", which is not a function.
4. Store it in arg.
5. arg is not an array.
6. Therefore, treat "/v1/flights" as the path.
7. Set offset = 1.
8. Take the arguments starting from offset.
9. Convert them into an array.
10. Flatten the middleware arguments.
11. The resulting middleware list contains:
    - logRequests
    - listFlightsHandler
12. The list is not empty, so no error is thrown.
13. Get the application's router.
14. Register logRequests with the router.
15. Register listFlightsHandler with the router.
16. Return the Express application.

### Expected Result

Both middleware functions are registered in order.

### Actual Result

The runtime showed:

logRequests
listFlightsHandler

### Comparison

MATCH — the runtime behaved as predicted.


## Trace 2 — Edge Input

### Input

app.use([[logRequests, metrics], auditLog])

### Hand Trace

1. Start with offset = 0 and path = "/".
2. The first argument is not a function.
3. Store it in arg.
4. arg is an array.
5. Take the first item repeatedly until reaching logRequests, which is a function.
6. Because the value reached is a function, the first argument is not treated as a path.
7. offset remains 0.
8. path remains "/".
9. Take all arguments starting from offset.
10. Flatten the nested arrays completely.
11. The resulting middleware list is:
    - logRequests
    - metrics
    - auditLog
12. The list is not empty.
13. Get the application's router.
14. Register each middleware in order.
15. Return the Express application.

### Expected Result

The three middleware functions are registered in this order:

logRequests → metrics → auditLog

### Actual Result

The runtime showed:

logRequests
metrics
auditLog

### Comparison

MATCH — the nested middleware arrays were flattened and registered in the expected order.


## Trace 3 — Invalid Input

### Input

app.use('/v1/flights')

### Hand Trace

1. Start with offset = 0 and path = "/".
2. The first argument is "/v1/flights", which is not a function.
3. Store it in arg.
4. arg is not an array.
5. Treat "/v1/flights" as the path.
6. Set offset = 1.
7. Take the arguments starting from offset.
8. There are no middleware arguments.
9. Flattening produces an empty middleware list.
10. The middleware list has length 0.
11. Throw a TypeError.
12. Stop the function.

### Expected Result

A TypeError is thrown with the message:

app.use() requires a middleware function

No middleware should be registered.

### Actual Result

The runtime returned:

TypeError
app.use() requires a middleware function

### Comparison

MATCH — the function correctly rejected the empty middleware list.