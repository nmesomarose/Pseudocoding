FUNCTION app.use



INPUTS:

\- The arguments passed to app.use.

\- The first argument may be a middleware function, a path, or an array.

\- Additional arguments may contain middleware functions or arrays of middleware functions.



OUTPUT:

\- The Express application.



SIDE EFFECTS:

\- Registers middleware with the application's router.

\- If an Express sub-application is provided, mounts that application on the router.



FAILS WHEN:

\- No middleware function is provided.

\- The middleware list is empty.



1\. Start with:

&#x20;  - offset = 0

&#x20;  - path = "/"



2\. Check the first argument.



3\. IF the first argument is not a function:

&#x20;  - Store the first argument in a temporary variable called arg.



4\. IF arg is an array:

&#x20;  - Keep taking the first item from the array until the first non-array value is reached.



5\. IF the value reached is not a function:

&#x20;  - Treat the first argument as the path.

&#x20;  - Set offset = 1.

&#x20;  - Set path to the first argument.



6\. Take all arguments starting from offset.



7\. Convert those arguments into an array.



8\. Flatten any nested middleware arrays completely.



9\. IF the resulting middleware list is empty:

&#x20;  - Throw an error stating that app.use requires a middleware function.

&#x20;  - Stop the function.



10\. Get the application's router.



11\. FOR EACH middleware function:



&#x20;   11a. IF it is ordinary middleware:

&#x20;        - Register it with the router using the path.



&#x20;   11b. IF it is an Express sub-application:

&#x20;        - Set its mount path.

&#x20;        - Set its parent application.

&#x20;        - Create a wrapper that runs the sub-application.

&#x20;        - Restore the parent request and response objects when the sub-application finishes.

&#x20;        - Register the wrapper with the router.

&#x20;        - Notify the sub-application that it has been mounted.



12\. Return the Express application.

