FUNCTION updateFlight

CATEGORY:
Function involving money or authorisation (modifies monetary pricing terms `price` and validates airline entity relations `airlineId`).

INPUTS:
- req: Request object containing:
  - req.params.id (string): flight ID (must be a valid UUID)
  - req.body (object): partial update fields including destination (string), price (number, representing ticket price in currency units), departureTime (string ISO 8601), arrivalTime (string ISO 8601), and airlineId (optional string UUID)
- res: Response object used to send HTTP status and JSON response
- next: Function (error-handling middleware callback for unexpected runtime errors)

OUTPUT:
- HTTP 200 OK response containing the updated flight JSON object, OR an HTTP error response (400, 404, or 500)
- Return type: Promise<void> / void (response sent via `res`)

SIDE EFFECTS:
- Updates a flight record in the database
- Sends an HTTP response

FAILS WHEN:
- The flight ID is not a valid UUID (400 Bad Request)
- The update body is invalid or empty (400 Bad Request)
- The flight does not exist in the database (404 Not Found)
- A new airline ID is provided but that airline does not exist in the database (404 Not Found)
- The database update operation fails (500 Internal Server Error)
- An unexpected database or runtime error occurs (passes to `next(error)`)

1. Get the flight ID from the request.

2. Check whether the flight ID is a valid UUID.

3. IF the flight ID is not a valid UUID:
   - Send a 400 Bad Request response with the error message "Flight ID must be a valid UUID".
   - Stop the function.

4. Check whether the update information is valid.

5. IF the update information is invalid:
   - Send a 400 Bad Request response containing the validation error.
   - Stop the function.

6. Connect to the database.

7. Find the flight using the flight ID.

8. IF the flight does not exist:
   - Send a 404 Not Found response with the message "Flight not found".
   - Stop the function.

9. Check whether the update includes a new airline ID.

10. IF a new airline ID was provided:
    - Find the airline using the new airline ID.
    - IF the airline does not exist:
      - Send a 404 Not Found response with the message "Airline not found".
      - Stop the function.

11. Take the fields provided in the update request.

12. Prepare the update information using only the fields that were provided.

13. IF a departure time was provided:
    - Convert the departure time into a date value.

14. IF an arrival time was provided:
    - Convert the arrival time into a date value.

15. Send the prepared update information to the database to update the flight.

16. IF the database update does not succeed:
    - Send a 500 Internal Server Error response with the message "Failed to update flight".
    - Stop the function.

17. Convert the updated flight into the format expected by the API response.

18. Send a successful response containing the updated flight.

19. IF an unexpected error occurs at any point:
    - Pass the error to the error-handling function.