FUNCTION app.use



INPUTS:

\- fn: the item passed to Express to be used as middleware



OUTPUT:

\- the Express application



SIDE EFFECTS:

\- Adds the provided middleware to the Express application



FAILS WHEN:

\- fn is not a middleware function



1\. Check the value provided as fn.

2\. IF fn is not a function:

&#x20;  - Throw an error stating that app.use requires a middleware function.

&#x20;  - Stop the function.
MY FIRST-PASS UNDERSTANDING:



\- Express checks what was passed to app.use.

\- It can receive middleware and can also deal with path-related arguments.

\- It checks the arguments and separates the relevant values.

\- When an array of arguments is involved, the code uses array operations to process them.

\- It eventually gets the router and passes the middleware toward it.

\- I am not fully sure about the exact purpose of the slice/arguments/array operations yet.

