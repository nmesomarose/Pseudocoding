# updateFlight — Hand Traces

## Function Category
**Function Involving Money or Authorisation**
- Modifies flight commercial terms including ticket price (`price: number`) (money).
- Validates airline existence and relationship (`airlineId: string UUID`) (authorisation and resource ownership).

---

## Trace 1 — Normal Input

### Input
- `req.params.id`: Valid UUID of an existing flight (`"ee263772-e94b-4e56-a0cd-35760918b3ec"`)
- `req.body`: `{ destination: "Lagos" }` (partial update)

### Hand Trace
1. Get the flight ID from the request.
   - Result: Valid UUID is obtained.
2. Check whether the flight ID is a valid UUID.
   - Result: Valid.
3. IF the flight ID is not a valid UUID:
   - Condition is false. Continue.
4. Check whether the update information is valid.
   - Result: Valid.
5. IF the update information is invalid:
   - Condition is false. Continue.
6. Connect to the database.
   - Result: Connection obtained.
7. Find the flight using the flight ID.
   - Result: Flight exists.
8. IF the flight does not exist:
   - Condition is false. Continue.
9. Check whether the update includes a new airline ID.
   - Result: No airline ID was provided.
10. IF a new airline ID was provided:
    - Condition is false. Continue.
11. Take the fields provided in the update request.
    - Result: `destination`.
12. Prepare the update information using only provided fields.
    - Result: Destination is prepared for update.
13. IF a departure time was provided:
    - Condition is false.
14. IF an arrival time was provided:
    - Condition is false.
15. Send the prepared update information to the database to update the flight.
    - Result: Flight is updated.
16. IF the database update does not succeed:
    - Condition is false.
17. Convert the updated flight into the API response format.
18. Send a successful 200 response containing the updated flight.
19. IF an unexpected error occurs:
    - No unexpected error occurs.

### Expected Result
HTTP 200 OK with the updated flight record showing the destination changed to "Lagos".

### Actual Result
The real function successfully updated the destination from "Copenhagen" to "Lagos" and returned HTTP 200 with the updated flight object.

### Comparison
**MATCH** — No discrepancy found between hand trace prediction and runtime implementation.

---

## Trace 2 — Edge Input (Money / Pricing Update)

### Input
- `req.params.id`: Valid UUID of an existing flight
- `req.body`: `{ price: 50000 }` (monetary field update)

### Hand Trace
1. Get the flight ID from the request.
   - Result: Valid UUID obtained.
2. Check whether the flight ID is a valid UUID.
   - Result: Valid.
3. IF the flight ID is not a valid UUID:
   - Condition is false. Continue.
4. Check whether the update information is valid.
   - Result: Valid price value (positive number).
5. IF the update information is invalid:
   - Condition is false. Continue.
6. Connect to the database.
   - Result: Connection obtained.
7. Find the flight using the flight ID.
   - Result: Flight exists.
8. IF the flight does not exist:
   - Condition is false. Continue.
9. Check whether the update includes a new airline ID.
   - Result: No airline ID was provided.
10. IF a new airline ID was provided:
    - Condition is false. Continue.
11. Take the fields provided in the update request.
    - Result: `price`.
12. Prepare the update information using only the provided fields.
    - Result: `price = 50000` is prepared.
13. IF a departure time was provided:
    - Condition is false.
14. IF an arrival time was provided:
    - Condition is false.
15. Send prepared update to the database.
    - Result: Flight price updated.
16. IF the database update does not succeed:
    - Condition is false.
17. Convert updated flight into API format.
18. Send a successful 200 response containing the updated flight.
19. IF an unexpected error occurs:
    - No unexpected error occurs.

### Expected Result
HTTP 200 OK with the updated flight record reflecting the new monetary price of 50000, while leaving other fields unchanged.

### Actual Result
The real function successfully updated only the price from `50` to `50000`. The destination remained `"Lagos"` from the previous update, demonstrating that partial updates correctly isolate modified fields without overwriting unmodified state.

### Comparison
**MATCH** — No discrepancy found.

---

## Trace 3 — Invalid Input

### Input
- `req.params.id`: `"not-a-uuid"` (malformed resource identifier)
- `req.body`: `{ destination: "Lagos" }`

### Hand Trace
1. Get the flight ID from the request.
   - Result: `"not-a-uuid"`.
2. Check whether the flight ID is a valid UUID.
   - Result: Invalid format.
3. IF the flight ID is not a valid UUID:
   - Condition is true.
   - Send a 400 Bad Request response with the message: `"Flight ID must be a valid UUID"`.
   - Stop the function.
4–19. Steps are skipped because the function performed an early exit at validation.

### Expected Result
HTTP 400 Bad Request with message `"Flight ID must be a valid UUID"`. No database operations performed.

### Actual Result
The real function immediately rejected `"not-a-uuid"` and returned HTTP 400 Bad Request with the message `"Flight ID must be a valid UUID"`, halting before contacting the database.

### Comparison
**MATCH** — No discrepancy found.

---

## Overall Comparison Summary

| Case | Category | Hand Trace Prediction | Real Code Result | Match? |
|---|---|---|---|---|
| **Trace 1** | Normal | Destination updated to "Lagos", 200 OK | Destination updated to "Lagos", 200 OK | Yes |
| **Trace 2** | Edge (Money) | Price updated to 50000, 200 OK | Price updated to 50000, 200 OK | Yes |
| **Trace 3** | Invalid | 400 Bad Request, early exit | 400 Bad Request, early exit | Yes |

### Discrepancies
None found. The hand traces accurately predicted the implementation's behaviour across normal, edge, and invalid paths.
