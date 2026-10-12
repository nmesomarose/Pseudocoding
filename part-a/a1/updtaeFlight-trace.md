\# updateFlight — Hand Trace



\## Trace 1 — Normal Input



\### Input



\* Flight ID: a valid UUID for an existing flight

\* Update: destination = "Lagos"



\### Hand Trace



1\. Get the flight ID from the request.



&#x20;  \* Result: valid UUID is obtained.



2\. Check whether the flight ID is a valid UUID.



&#x20;  \* Result: valid.



3\. IF the flight ID is not a valid UUID:



&#x20;  \* Condition is false.

&#x20;  \* Continue.



4\. Check whether the update information is valid.



&#x20;  \* Result: valid.



5\. IF the update information is invalid:



&#x20;  \* Condition is false.

&#x20;  \* Continue.



6\. Connect to the database.



&#x20;  \* Result: database connection is obtained.



7\. Find the flight using the flight ID.



&#x20;  \* Result: flight exists.



8\. IF the flight does not exist:



&#x20;  \* Condition is false.

&#x20;  \* Continue.



9\. Check whether the update includes a new airline ID.



&#x20;  \* Result: no airline ID was provided.



10\. IF a new airline ID was provided:



&#x20;   \* Condition is false.

&#x20;   \* Continue.



11\. Take the fields provided in the update request.



&#x20;   \* Result: destination.



12\. Prepare the update information.



&#x20;   \* Result: destination is prepared for update.



13\. IF a departure time was provided:



&#x20;   \* Condition is false.



14\. IF an arrival time was provided:



&#x20;   \* Condition is false.



15\. Send the prepared update information to the database.



&#x20;   \* Result: flight is updated.



16\. IF the database update does not succeed:



&#x20;   \* Condition is false.



17\. Convert the updated flight into the API response format.



18\. Send a successful response containing the updated flight.



19\. IF an unexpected error occurs:



&#x20;   \* No unexpected error occurs.



\### Expected Result



The flight is successfully updated and returned in the response.



\### Actual Result



The real function successfully updated the destination from "Copenhagen" to "Lagos".



\### Comparison



MATCH — no discrepancy found.



\---



\## Trace 2 — Edge Input



\### Input



\* Flight ID: a valid UUID for an existing flight

\* Update: price = 50000



\### Hand Trace



1\. Get the flight ID from the request.



&#x20;  \* Result: valid UUID is obtained.



2\. Check whether the flight ID is a valid UUID.



&#x20;  \* Result: valid.



3\. IF the flight ID is not a valid UUID:



&#x20;  \* Condition is false.

&#x20;  \* Continue.



4\. Check whether the update information is valid.



&#x20;  \* Result: valid.



5\. IF the update information is invalid:



&#x20;  \* Condition is false.

&#x20;  \* Continue.



6\. Connect to the database.



&#x20;  \* Result: database connection is obtained.



7\. Find the flight using the flight ID.



&#x20;  \* Result: flight exists.



8\. IF the flight does not exist:



&#x20;  \* Condition is false.

&#x20;  \* Continue.



9\. Check whether the update includes a new airline ID.



&#x20;  \* Result: no airline ID was provided.



10\. IF a new airline ID was provided:



&#x20;   \* Condition is false.

&#x20;   \* Continue.



11\. Take the fields provided in the update request.



&#x20;   \* Result: price.



12\. Prepare the update information.



&#x20;   \* Result: price is prepared for update.



13\. IF a departure time was provided:



&#x20;   \* Condition is false.



14\. IF an arrival time was provided:



&#x20;   \* Condition is false.



15\. Send the prepared update information to the database.



&#x20;   \* Result: flight price is updated.



16\. IF the database update does not succeed:



&#x20;   \* Condition is false.



17\. Convert the updated flight into the API response format.



18\. Send a successful response containing the updated flight.



19\. IF an unexpected error occurs:



&#x20;   \* No unexpected error occurs.



\### Expected Result



The flight is successfully updated with the new price of 50000.



\### Actual Result



The real function successfully updated only the price from `50` to `50000`.



The destination remained `"Lagos"` from the previous test, showing that the partial update changed only the field provided in this request.



\### Comparison



MATCH — no discrepancy found.



\---



\## Trace 3 — Invalid Input



\### Input



\* Flight ID: "not-a-uuid"

\* Update: destination = "Lagos"



\### Hand Trace



1\. Get the flight ID from the request.



&#x20;  \* Result: "not-a-uuid".



2\. Check whether the flight ID is a valid UUID.



&#x20;  \* Result: invalid.



3\. IF the flight ID is not a valid UUID:



&#x20;  \* Condition is true.

&#x20;  \* Send a 400 Bad Request response.

&#x20;  \* Return the message: "Flight ID must be a valid UUID".

&#x20;  \* Stop the function.



4–19. These steps are not reached because the function already stopped.



\### Expected Result



HTTP 400 Bad Request with the message:



"Flight ID must be a valid UUID"



\### Actual Result



The real function rejected `"not-a-uuid"` and returned a 400 Bad Request response with the message `"Flight ID must be a valid UUID"`.



The function stopped before performing the database lookup.



\### Comparison



MATCH — no discrepancy found.



\---



\## Overall Comparison



| Case    | Hand Trace                       | Real Code                        | Match? |

| ------- | -------------------------------- | -------------------------------- | ------ |

| Normal  | Destination updated successfully | Destination updated successfully | Yes    |

| Edge    | Only price updated successfully  | Only price updated successfully  | Yes    |

| Invalid | 400 error and early exit         | 400 error and early exit         | Yes    |



\### Discrepancies



None found.



The hand trace correctly predicted the behavior of the real `updateFlight` function for all three tested inputs.



