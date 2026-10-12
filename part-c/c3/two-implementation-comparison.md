# C3 — Two Implementation Comparison

**Implementations Compared:**
- **B2:** `part-b/b2/checkSeatAvailability.ts` (My implementation)
- **C1:** `part-c/c1/checkSeatAvailability.ts` (AI implementation)
- **Specification:** `part-b/b1/feature-pseudocode.md`

## Testing Command
```bash
node part-c/c3/testHarness.js
```
*Note: Test files were compiled to JS via `tsc --target ES2020 --module CommonJS part-b/b2/checkSeatAvailability.ts part-c/c1/checkSeatAvailability.ts`.*

---

## Pass/Fail Summary

Both implementations passed 10 out of 10 tests. While the exact wording of the `reason` field strings differed between implementations, both exhibited the correct structural and logical behavior defined by the pseudocode specification in every scenario. The B1 pseudocode states intent for failure messages rather than exact string values, so both implementations are technically compliant.

| Test | Description | B2 Result | C1 Result | Expected (from Spec) |
|---|---|---|---|---|
| **1** | Trace 1 - Normal booking | PASS | PASS | PASS |
| **2** | Trace 2 - Exactly fills remaining seats | PASS | PASS | PASS |
| **3** | Trace 3 - Not enough seats | PASS | PASS | PASS |
| **4** | Trace 4 - Invalid requested seats | PASS | PASS | PASS |
| **5** | Trace 5 - Existing bookings exceed capacity | PASS | PASS | PASS |
| **6** | Edge - Invalid seat capacity (negative) | PASS | PASS | PASS |
| **7** | Edge - Existing bookings missing/null | PASS | PASS | PASS |
| **8** | Edge - Invalid seatsBooked value (negative) | PASS | PASS | PASS |
| **9** | Edge - Booking object is null | PASS | PASS | PASS |
| **10**| Edge - Requested seats not an integer | PASS | PASS | PASS |

---

## Detailed Test Cases & Results

### 1. Trace 1 - Normal booking
- **Input:** `seatCapacity: 100`, `existingBookings: [{seatsBooked: 40}]`, `requestedSeats: 2`
- **Expected:** `allowed: true`, `availableSeats: 60`, `remainingSeatsAfterBooking: 58`
- **B2 Result:** `{"allowed":true,"availableSeats":60,"remainingSeatsAfterBooking":58}`
- **C1 Result:** `{"allowed":true,"availableSeats":60,"remainingSeatsAfterBooking":58}`
- **Agreement:** Yes. Both implementations match the spec.

### 2. Trace 2 - Exactly fills remaining seats
- **Input:** `seatCapacity: 100`, `existingBookings: [{seatsBooked: 98}]`, `requestedSeats: 2`
- **Expected:** `allowed: true`, `availableSeats: 2`, `remainingSeatsAfterBooking: 0`
- **B2 Result:** `{"allowed":true,"availableSeats":2,"remainingSeatsAfterBooking":0}`
- **C1 Result:** `{"allowed":true,"availableSeats":2,"remainingSeatsAfterBooking":0}`
- **Agreement:** Yes. Both implementations match the spec.

### 3. Trace 3 - Not enough seats
- **Input:** `seatCapacity: 100`, `existingBookings: [{seatsBooked: 99}]`, `requestedSeats: 2`
- **Expected:** `allowed: false`, `availableSeats: 1`, reason indicating not enough seats.
- **B2 Result:** `{"allowed":false,"availableSeats":1,"reason":"There are not enough available seats."}`
- **C1 Result:** `{"allowed":false,"availableSeats":1,"reason":"There are not enough available seats."}`
- **Agreement:** Yes. Both implementations match the spec exactly.

### 4. Trace 4 - Invalid requested seats
- **Input:** `seatCapacity: 100`, `existingBookings: [{seatsBooked: 40}]`, `requestedSeats: 0`
- **Expected:** `allowed: false`, reason stating requested seat count is invalid.
- **B2 Result:** `{"allowed":false,"reason":"Requested seats must be a positive integer."}`
- **C1 Result:** `{"allowed":false,"reason":"The requested seat count is invalid."}`
- **Agreement:** Functionally yes, but string messages differ.
- **Correct Implementation:** Both. The spec (Step 7) says "Return a failure stating that the requested seat count is invalid." C1 matches the wording verbatim, while B2 explains *why* it is invalid. Both satisfy the requirement.

### 5. Trace 5 - Existing bookings exceed capacity
- **Input:** `seatCapacity: 100`, `existingBookings: [{seatsBooked: 60}, {seatsBooked: 50}]`, `requestedSeats: 1`
- **Expected:** `allowed: false`, reason stating existing bookings exceed capacity.
- **B2 Result:** `{"allowed":false,"reason":"Existing bookings exceed the flight capacity."}`
- **C1 Result:** `{"allowed":false,"reason":"The existing bookings exceed the flight capacity."}`
- **Agreement:** Functionally yes, strings differ trivially ("The").
- **Correct Implementation:** Both.

### 6. Edge - Invalid seat capacity (negative)
- **Input:** `seatCapacity: -10`, `existingBookings: []`, `requestedSeats: 2`
- **Expected:** `allowed: false`, reason stating flight seat capacity is invalid.
- **B2 Result:** `{"allowed":false,"reason":"Seat capacity must be a positive integer."}`
- **C1 Result:** `{"allowed":false,"reason":"The flight seat capacity is invalid."}`
- **Agreement:** Functionally yes.
- **Correct Implementation:** Both. (Same reasoning as Trace 4).

### 7. Edge - Existing bookings missing/null
- **Input:** `seatCapacity: 100`, `existingBookings: null`, `requestedSeats: 2`
- **Expected:** `allowed: false`, reason stating existing bookings are invalid.
- **B2 Result:** `{"allowed":false,"reason":"Existing bookings must be a list."}`
- **C1 Result:** `{"allowed":false,"reason":"The existing bookings are invalid."}`
- **Agreement:** Functionally yes.
- **Correct Implementation:** Both. Spec Step 3 states "Return a failure stating that the existing bookings are invalid."

### 8. Edge - Invalid seatsBooked value (negative)
- **Input:** `seatCapacity: 100`, `existingBookings: [{seatsBooked: -5}]`, `requestedSeats: 2`
- **Expected:** `allowed: false`, reason stating an existing booking contains an invalid seat count.
- **B2 Result:** `{"allowed":false,"reason":"An existing booking has an invalid seat count."}`
- **C1 Result:** `{"allowed":false,"reason":"An existing booking contains an invalid seat count."}`
- **Agreement:** Functionally yes.
- **Correct Implementation:** Both.

### 9. Edge - Booking object is null
- **Input:** `seatCapacity: 100`, `existingBookings: [null]`, `requestedSeats: 2`
- **Expected:** `allowed: false`, reason stating an existing booking contains an invalid seat count (due to ambiguous spec).
- **B2 Result:** `{"allowed":false,"reason":"An existing booking has an invalid seat count."}`
- **C1 Result:** `{"allowed":false,"reason":"An existing booking contains an invalid seat count."}`
- **Agreement:** Functionally yes.
- **Correct Implementation:** Both. Both implementations proactively guard against falsy array entries and return the error intended for invalid seat counts, successfully avoiding a crash.

### 10. Edge - Requested seats not an integer
- **Input:** `seatCapacity: 100`, `existingBookings: [{seatsBooked: 40}]`, `requestedSeats: 2.5`
- **Expected:** `allowed: false`, reason stating requested seat count is invalid.
- **B2 Result:** `{"allowed":false,"reason":"Requested seats must be a positive integer."}`
- **C1 Result:** `{"allowed":false,"reason":"The requested seat count is invalid."}`
- **Agreement:** Functionally yes.
- **Correct Implementation:** Both.

---

## Unresolved Specification Ambiguities

1. **Error Message Strings:** The B1 pseudocode dictates *what* the failure message should convey (e.g., "stating that the requested seat count is invalid"), but it does not specify exact literal strings. Consequently, the two implementations used slightly different phrasing. This should be explicitly defined if callers are expected to programmatically inspect the `reason` string.
2. **Missing `availableSeats` on failures:** The OUTPUT section mentions returning "The number of seats currently available", but the step-by-step pseudo-code only instructs its inclusion in Step 9 and Step 11. Both implementations chose to follow the step-by-step logic, omitting `availableSeats` for other validation failures.
3. **Falsy Booking Objects:** The B1 spec instructs checking the `seatsBooked` value but fails to explicitly dictate behavior when the `booking` array element itself is `null` or `undefined`. Both engineers (the human and the AI) autonomously chose to handle it defensively by checking for a falsy object and throwing the "invalid seat count" error, but the spec technically left this undefined.
