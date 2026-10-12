# B2 — Trace vs. Test Comparison

## Overview
This document compares the actual test results of the Part B2 implementation (`part-b/b2/checkSeatAvailability.ts`) against the pre-implementation predictions recorded in the Part B1 hand traces (`part-b/b1/hand-traces.md`).

---

## Comparison Matrix

| Trace | Scenario | Hand-Traced Expectation | Actual Implementation Result | Match? |
|---|---|---|---|---|
| **Trace 1** | Normal Booking (`capacity: 100`, `booked: 40`, `requested: 2`) | `allowed: true`, `availableSeats: 60`, `remainingSeatsAfterBooking: 58` | `allowed: true`, `availableSeats: 60`, `remainingSeatsAfterBooking: 58` | **YES** |
| **Trace 2** | Exactly Fills Remaining Seats (`capacity: 100`, `booked: 98`, `requested: 2`) | `allowed: true`, `availableSeats: 2`, `remainingSeatsAfterBooking: 0` | `allowed: true`, `availableSeats: 2`, `remainingSeatsAfterBooking: 0` | **YES** |
| **Trace 3** | Not Enough Seats (`capacity: 100`, `booked: 99`, `requested: 2`) | `allowed: false`, `availableSeats: 1`, reason: not enough seats | `allowed: false`, `availableSeats: 1`, `reason: "There are not enough available seats."` | **YES** |
| **Trace 4** | Invalid Requested Seats (`requestedSeats: 0`) | `allowed: false`, reason: requested seats must be a positive integer | `allowed: false`, `reason: "Requested seats must be a positive integer."` | **YES** |
| **Trace 5** | Existing Bookings Exceed Capacity (`booked: 110`, `capacity: 100`) | `allowed: false`, reason: existing bookings exceed flight capacity | `allowed: false`, `reason: "Existing bookings exceed the flight capacity."` | **YES** |

---

## Detailed Trace Analysis & Discrepancy Investigation

### 1. Trace 1 — Normal Booking
- **Input:** `seatCapacity = 100`, `existingBookings = [{ seatsBooked: 40 }]`, `requestedSeats = 2`
- **Hand Trace Prediction:** Available seats = 60, remaining after booking = 58, booking allowed.
- **Actual Runtime Result:** `{ allowed: true, availableSeats: 60, remainingSeatsAfterBooking: 58 }`
- **Finding:** Complete match. The function calculates cumulative bookings accurately and computes correct remainders.

### 2. Trace 2 — Boundary Case (Boundary Investigation)
- **Input:** `seatCapacity = 100`, `existingBookings = [{ seatsBooked: 98 }]`, `requestedSeats = 2`
- **Hand Trace Prediction:** Available seats = 2. Since `requestedSeats (2) > availableSeats (2)` is false, booking is allowed. `remainingSeatsAfterBooking = 0`.
- **Actual Runtime Result:** `{ allowed: true, availableSeats: 2, remainingSeatsAfterBooking: 0 }`
- **Investigation of Discrepancy during Development:**
  - In the planted-bug experiment (see `part-a/a3/`), the boundary check was written with `>=` instead of `>` (`if (requestedSeats >= availableSeats)`).
  - When tested against this Trace 2 boundary condition, the buggy version erroneously rejected the booking with `{ allowed: false, availableSeats: 2, reason: "There are not enough available seats." }`.
  - Tracing back to the Part B1 specification (`part-b/b1/feature-pseudocode.md`, Step 9) confirmed that the specification explicitly requires: `IF requestedSeats is greater than availableSeats`.
  - The implementation was verified and corrected to `requestedSeats > availableSeats`, ensuring that boundary bookings that exactly exhaust remaining capacity succeed.

### 3. Trace 3 — Insufficient Seats
- **Input:** `seatCapacity = 100`, `existingBookings = [{ seatsBooked: 99 }]`, `requestedSeats = 2`
- **Hand Trace Prediction:** Available seats = 1, requested = 2, rejected because `2 > 1`.
- **Actual Runtime Result:** `{ allowed: false, availableSeats: 1, reason: "There are not enough available seats." }`
- **Finding:** Complete match. The function includes `availableSeats` in the failure return object as required by Step 9.

### 4. Trace 4 — Invalid Requested Seat Count
- **Input:** `seatCapacity = 100`, `requestedSeats = 0`
- **Hand Trace Prediction:** Rejection at step 7 because 0 is not a positive integer.
- **Actual Runtime Result:** `{ allowed: false, reason: "Requested seats must be a positive integer." }`
- **Finding:** Complete match. Input validation guards fire before capacity calculations occur.

### 5. Trace 5 — Pre-existing Overbooking
- **Input:** `seatCapacity = 100`, `existingBookings = [{ seatsBooked: 60 }, { seatsBooked: 50 }]`, `requestedSeats = 1`
- **Hand Trace Prediction:** Total booked seats (110) > capacity (100). Rejection at step 6.
- **Actual Runtime Result:** `{ allowed: false, reason: "Existing bookings exceed the flight capacity." }`
- **Finding:** Complete match. Pre-existing invalid flight states are rejected before evaluating passenger requests.

---

## Test Execution Summary
- **Test File:** `part-b/b2/testSeatAvailability.ts`
- **Execution Command:** `node part-b/b2/testSeatAvailability.js`
- **Result:** `5/5 tests passed` (100% agreement between specification hand traces and implementation).
