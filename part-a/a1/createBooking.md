FUNCTION createBooking

CATEGORY:
Complex function (orchestrates multi-step payload validation, database lookups across customers and flights, UUID generation, date conversions, default seat handling, database insertion, and API mapping).

INPUTS:
- req: Request object containing `req.body` with:
  - customerId (string, required): valid UUID of the customer
  - flightId (string, required): valid UUID of the flight
  - bookingTimestamp (string, required): valid ISO 8601 datetime
  - seatsBooked (number, optional): positive integer (defaults to 1 if omitted)
- res: Response object used to send HTTP status and JSON response
- next: Function (error-handling middleware callback for unexpected errors)

OUTPUT:
- HTTP 201 Created response containing the created booking object
- OR an HTTP error response (400 Bad Request, 404 Not Found, 500 Internal Server Error)
- Return type: Promise<void> / void (response returned via `res`)

SIDE EFFECTS:
- Checks that the customer exists
- Checks that the flight exists
- Creates a booking record in the database
- Sends an HTTP response

FAILS WHEN:
- The request body is invalid
- customerId is missing, empty, or not a valid UUID
- flightId is missing, empty, or not a valid UUID
- bookingTimestamp is missing, not a string, or not a valid ISO 8601 datetime
- seatsBooked is provided but is not a positive integer or exceeds 2147483647
- The customer does not exist
- The flight does not exist
- An unexpected error occurs
1. Receive the request.
 2. Validate the booking information.

   * Check that the request body is a JSON object.
   * Check that `customerId` is a non-empty string.
   * Check that `customerId` is a valid UUID.
   * Check that `flightId` is a non-empty string.
   * Check that `flightId` is a valid UUID.
   * Check that `bookingTimestamp` is a string.
   * Check that `bookingTimestamp` is a valid ISO 8601 datetime.
   * IF `seatsBooked` is provided:

     * Check that it is a positive integer.
     * Check that it does not exceed 2147483647.

3. IF any validation check fails:

   * Send a 400 Bad Request response containing the appropriate validation error.
   * Stop the function.


4. Read the customer ID, flight ID, booking timestamp, and seats booked from the request.

5. Connect to the database.

6. Find the customer using the customer ID.

7. IF the customer does not exist:
   - Send a 404 Not Found response with the message "Customer not found".
   - Stop the function.

8. Find the flight using the flight ID.

9. IF the flight does not exist:
   - Send a 404 Not Found response with the message "Flight not found".
   - Stop the function.

10. Generate a unique ID for the new booking.

11. Prepare the booking information.

12. Convert the booking timestamp into a date value.

13. IF seats booked was not provided:
    - Use 1 as the default number of seats.

14. Create the booking in the database.

15. Convert the created booking into the format expected by the API.

16. Send a 201 Created response containing the booking.

17. IF an unexpected error occurs:
    - Pass the error to the error-handling function.
    ## Trace 1 — Normal Input

### Input

- Customer ID: a valid UUID for an existing customer
- Flight ID: a valid UUID for an existing flight
- Booking timestamp: "2026-10-02T11:00:00.000Z"
- Seats booked: 2

### Hand Trace

1. Receive the request.
   - Result: booking request is received.

2. Validate the booking information.
   - Result: all required information is valid.
   - customerId is a valid UUID.
   - flightId is a valid UUID.
   - bookingTimestamp is a valid ISO 8601 datetime.
   - seatsBooked is a positive integer and does not exceed 2147483647.

3. IF any validation check fails:
   - Condition is false.
   - Continue.

4. Read the customer ID, flight ID, booking timestamp, and seats booked from the request.
   - Result: all four values are obtained.

5. Connect to the database.
   - Result: database connection is obtained.

6. Find the customer using the customer ID.
   - Result: customer exists.

7. IF the customer does not exist:
   - Condition is false.
   - Continue.

8. Find the flight using the flight ID.
   - Result: flight exists.

9. IF the flight does not exist:
   - Condition is false.
   - Continue.

10. Generate a unique ID for the new booking.
    - Result: a new booking ID is generated.

11. Prepare the booking information.
    - Result: customer ID, flight ID, booking timestamp, and seats booked are prepared.

12. Convert the booking timestamp into a date value.
    - Result: timestamp is converted successfully.

13. IF seats booked was not provided:
    - Condition is false because seats booked is 2.

14. Create the booking in the database.
    - Result: booking is created successfully.

15. Convert the created booking into the format expected by the API.
    - Result: booking is converted successfully.

16. Send a 201 Created response containing the booking.
    - Result: booking is returned successfully.

17. IF an unexpected error occurs:
    - No unexpected error occurs.

### Expected Result

The booking is successfully created and a 201 Created response is returned.

### Actual Result

The real function successfully created the booking and returned a 201 Created response.

The booking was created with:
- Customer ID: c476754f-8fad-4201-8ec2-8fda5046231b
- Flight ID: ee263772-e94b-4e56-a0cd-35760918b3ec
- Booking timestamp: 2026-10-02T10:00:00.000Z
- Seats booked: 2
- Generated booking ID: 669cea68-f5c0-4e55-ab3e-bccf1ef275c0

### Comparison

MATCH — the real function behaved exactly as predicted by the hand trace.
## Trace 2 — Edge Input

### Input

- Customer ID: a valid UUID for an existing customer
- Flight ID: a valid UUID for an existing flight
- Booking timestamp: "2026-09-16T11:00:00.000Z"
- Seats booked: not provided

### Hand Trace

1. Receive the request.
   - Result: booking request is received.

2. Validate the booking information.
   - Result: all required information is valid.
   - customerId is a valid UUID.
   - flightId is a valid UUID.
   - bookingTimestamp is a valid ISO 8601 datetime.
   - seatsBooked is not provided, which is allowed.

3. IF any validation check fails:
   - Condition is false.
   - Continue.

4. Read the customer ID, flight ID, booking timestamp, and seats booked from the request.
   - Result: customer ID, flight ID, and booking timestamp are obtained.
   - seatsBooked is undefined.

5. Connect to the database.
   - Result: database connection is obtained.

6. Find the customer using the customer ID.
   - Result: customer exists.

7. IF the customer does not exist:
   - Condition is false.
   - Continue.

8. Find the flight using the flight ID.
   - Result: flight exists.

9. IF the flight does not exist:
   - Condition is false.
   - Continue.

10. Generate a unique ID for the new booking.
    - Result: a new booking ID is generated.

11. Prepare the booking information.
    - Result: customer ID, flight ID, and booking timestamp are prepared.

12. Convert the booking timestamp into a date value.
    - Result: timestamp is converted successfully.

13. IF seats booked was not provided:
    - Condition is true.
    - Use 1 as the default number of seats.

14. Create the booking in the database.
    - Result: booking is created with 1 seat.

15. Convert the created booking into the format expected by the API.
    - Result: booking is converted successfully.

16. Send a 201 Created response containing the booking.
    - Result: booking is returned successfully.

17. IF an unexpected error occurs:
    - No unexpected error occurs.

### Expected Result

The booking is successfully created with `seatsBooked = 1`.

### Actual Result

The real function successfully created the booking and returned a 201 Created response.

The booking was created with:

Customer ID: c476754f-8fad-4201-8ec2-8fda5046231b
Flight ID: ee263772-e94b-4e56-a0cd-35760918b3ec
Booking timestamp: 2026-10-02T11:00:00.000Z
seatsBooked: 1
Generated booking ID: fc88108d-262b-4f52-857f-622ca84dbe57

The request did not provide seatsBooked, and the function correctly used 1 as the default.

### Comparison

MATCH — the real function behaved exactly as predicted by the hand trace.
## Trace 3 — Invalid Input

### Input

- Customer ID: "not-a-uuid"
- Flight ID: a valid UUID for an existing flight
- Booking timestamp: "2026-10-02T11:00:00.000Z"
- Seats booked: 1

### Hand Trace

1. Receive the request.
   - Result: booking request is received.

2. Validate the booking information.
   - Result: customerId is checked first.

3. IF the booking information is invalid:
   - Condition is true because customerId is not a valid UUID.
   - Send a 400 Bad Request response.
   - Return the validation error.
   - Stop the function.

4–17. These steps are not reached because the function stopped during validation.

### Expected Result

HTTP 400 Bad Request with an error message stating that `customerId` must be a valid UUID.

No booking should be created.

### Actual Result

The real function rejected the request and returned a 400 Bad Request response.

The response contained the error code BAD_REQUEST and the message "Field \"customerId\" must be a valid UUID".

The function stopped during validation, so no booking was created.

### Comparison

MATCH — the real function behaved exactly as predicted by the hand trace.