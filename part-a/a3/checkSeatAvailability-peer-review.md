# A3 — checkSeatAvailability Bug Analysis and Peer Review

## 1. Planted Bug Identification

- **Function Name:** `checkSeatAvailability`
- **Bug Name:** Off-by-one boundary condition error (Relational Operator Error: `>=` instead of `>`)
- **Bug Location:** Step 7 / Step 9 (Seat sufficiency check)

### Intended Behaviour vs. Buggy Behaviour

```
Intended condition:  requestedSeats > availableSeats
Buggy condition:     requestedSeats >= availableSeats
```

### Explanation of the Bug
The intended business rule allows a booking as long as the requested number of seats does not exceed the remaining capacity. Therefore, a booking must only be rejected when `requestedSeats` is strictly greater than `availableSeats` (`requestedSeats > availableSeats`).

In the buggy implementation, the comparison operator was changed to `>=` (`requestedSeats >= availableSeats`). This creates a boundary condition error where the function incorrectly rejects any booking that attempts to book *exactly* the remaining available seats (when `requestedSeats == availableSeats`), even though every requested seat is physically vacant and available.

---

## 2. Intended Pseudocode (Specification)

```
FUNCTION checkSeatAvailability
INPUTS: seatCapacity (integer), existingBookings (list), requestedSeats (integer)
OUTPUT: allowed (boolean), availableSeats (integer), remainingSeatsAfterBooking (integer), or reason (string)

1. Check that seatCapacity is a positive integer. If not, return failure.
2. Check that existingBookings is a list. If not, return failure.
3. Set totalBookedSeats = 0.
4. FOR EACH booking in existingBookings:
     Check that booking.seatsBooked is a positive integer. If not, return failure.
     Add booking.seatsBooked to totalBookedSeats.
5. IF totalBookedSeats > seatCapacity:
     Return failure stating existing bookings exceed capacity.
6. Check that requestedSeats is a positive integer. If not, return failure.
7. Calculate availableSeats = seatCapacity - totalBookedSeats.
8. IF requestedSeats > availableSeats:
     Return failure { allowed: false, availableSeats: availableSeats, reason: "There are not enough available seats." }
9. Calculate remainingSeatsAfterBooking = availableSeats - requestedSeats.
10. Return success { allowed: true, availableSeats: availableSeats, remainingSeatsAfterBooking: remainingSeatsAfterBooking }.
```

---

## 3. Buggy Pseudocode (Actual Behaviour of Planted Bug)

```
FUNCTION checkSeatAvailability_Buggy
INPUTS: seatCapacity (integer), existingBookings (list), requestedSeats (integer)
OUTPUT: allowed (boolean), availableSeats (integer), remainingSeatsAfterBooking (integer), or reason (string)

1. Check that seatCapacity is a positive integer. If not, return failure.
2. Check that existingBookings is a list. If not, return failure.
3. Set totalBookedSeats = 0.
4. FOR EACH booking in existingBookings:
     Check that booking.seatsBooked is a positive integer. If not, return failure.
     Add booking.seatsBooked to totalBookedSeats.
5. IF totalBookedSeats > seatCapacity:
     Return failure stating existing bookings exceed capacity.
6. Check that requestedSeats is a positive integer. If not, return failure.
7. Calculate availableSeats = seatCapacity - totalBookedSeats.
8. [BUGGY STEP] IF requestedSeats >= availableSeats:
     Return failure { allowed: false, availableSeats: availableSeats, reason: "There are not enough available seats." }
9. Calculate remainingSeatsAfterBooking = availableSeats - requestedSeats.
10. Return success { allowed: true, availableSeats: availableSeats, remainingSeatsAfterBooking: remainingSeatsAfterBooking }.
```

---

## 4. Concrete Example Demonstrating the Bug

Consider the following flight scenario:
- **Flight Capacity:** 100 seats
- **Existing Bookings:** 60 seats already booked (`totalBookedSeats = 60`)
- **Available Seats:** 40 seats (`100 - 60 = 40`)
- **Customer Request:** 40 seats (`requestedSeats = 40`)

### Step-by-Step Evaluation:
1. Available seats are evaluated: `100 - 60 = 40`.
2. Under the **Intended Logic** (`40 > 40`):
   - Condition evaluates to `false`.
   - Booking is **allowed**.
   - `remainingSeatsAfterBooking = 40 - 40 = 0`.
3. Under the **Buggy Logic** (`40 >= 40`):
   - Condition evaluates to `true`.
   - Booking is **rejected** with reason: *"There are not enough available seats."*
   - Even though all 40 seats are open, the customer cannot book them.

---

## 5. Peer Review Feedback (Verbatim)

The following feedback was received from my peer reviewer:

> "I reviewed your `checkSeatAvailability` function.
> 
> I found an issue in the condition that checks whether enough seats are available. The function currently rejects a booking when the requested seats are equal to the available seats.
> 
> For example, if a flight has 100 seats, 60 are already booked, and a customer requests the remaining 40 seats, the function rejects the booking. I believe it should allow the booking because all 40 seats are available.
> 
> The condition `requestedSeats >= availableSeats` should be changed to `requestedSeats > availableSeats`.
> 
> That way, the function rejects bookings only when the requested seats exceed the available seats."

---

## 6. Commentary and Confirmation

*(Note: The following commentary represents my own analysis and is distinct from the peer reviewer's original words above.)*

### What the Peer Review Confirms
1. **Accurate Bug Detection:** The peer reviewer correctly identified the planted off-by-one boundary bug without false positives or misdiagnosing other parts of the logic.
2. **Matching Concrete Test Case:** The peer's flight scenario (`seatCapacity: 100`, `booked: 60`, `requested: 40`) matches the exact boundary case described in Trace 2 of the Part B1 hand traces where remaining seats are exactly filled.
3. **Correct Remediation:** The peer's proposed fix—replacing `>=` with `>`—restores strict compliance with the original Part B1 specification (`feature-pseudocode.md`, step 9) and allows bookings that exactly fill remaining aircraft capacity.
