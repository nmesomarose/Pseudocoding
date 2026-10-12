# B1 — Hand Traces

## Trace 1 — Normal Booking

### Input

- seatCapacity: 100
- existingBookings:
  - Booking 1: seatsBooked = 40
- requestedSeats: 2

### Hand Trace

1. Receive seat capacity, existing bookings, and requested seats.
2. Check seat capacity.
   - 100 is a positive integer.
   - Continue.
3. Check existing bookings.
   - existingBookings is a list.
   - Continue.
4. Set totalBookedSeats to 0.
5. Process Booking 1.
   - seatsBooked is 40, which is a positive integer.
   - totalBookedSeats becomes 40.
6. Check whether totalBookedSeats exceeds capacity.
   - 40 is not greater than 100.
   - Continue.
7. Check requestedSeats.
   - 2 is a positive integer.
   - Continue.
8. Calculate availableSeats.
   - 100 - 40 = 60
9. Check requestedSeats against availableSeats.
   - 2 is not greater than 60.
   - Booking is allowed.
10. Calculate remainingSeatsAfterBooking.
    - 60 - 2 = 58
11. Return:
    - booking allowed
    - available seats: 60
    - remaining seats after booking: 58

### Expected Result

Booking allowed. 60 seats are available before the booking and 58 seats remain after it.

### Match?

Yes - matches
---

## Trace 2 — Exactly Fills Remaining Seats

### Input

- seatCapacity: 100
- existingBookings:
  - Booking 1: seatsBooked = 98
- requestedSeats: 2

### Hand Trace

1. Receive seat capacity, existing bookings, and requested seats.
2. Check seat capacity.
   - 100 is a positive integer.
   - Continue.
3. Check existing bookings.
   - existingBookings is a list.
   - Continue.
4. Set totalBookedSeats to 0.
5. Process Booking 1.
   - seatsBooked is 98, which is a positive integer.
   - totalBookedSeats becomes 98.
6. Check whether totalBookedSeats exceeds capacity.
   - 98 is not greater than 100.
   - Continue.
7. Check requestedSeats.
   - 2 is a positive integer.
   - Continue.
8. Calculate availableSeats.
   - 100 - 98 = 2
9. Check requestedSeats against availableSeats.
   - 2 is not greater than 2.
   - Booking is allowed.
10. Calculate remainingSeatsAfterBooking.
    - 2 - 2 = 0
11. Return:
    - booking allowed
    - available seats: 2
    - remaining seats after booking: 0

### Expected Result

Booking allowed. The requested 2 seats exactly fill the remaining capacity.

### Match?

Yes - matches

---

## Trace 3 — Not Enough Seats

### Input

- seatCapacity: 100
- existingBookings:
  - Booking 1: seatsBooked = 99
- requestedSeats: 2

### Hand Trace

1. Receive seat capacity, existing bookings, and requested seats.
2. Check seat capacity.
   - 100 is a positive integer.
   - Continue.
3. Check existing bookings.
   - existingBookings is a list.
   - Continue.
4. Set totalBookedSeats to 0.
5. Process Booking 1.
   - seatsBooked is 99, which is a positive integer.
   - totalBookedSeats becomes 99.
6. Check whether totalBookedSeats exceeds capacity.
   - 99 is not greater than 100.
   - Continue.
7. Check requestedSeats.
   - 2 is a positive integer.
   - Continue.
8. Calculate availableSeats.
   - 100 - 99 = 1
9. Check requestedSeats against availableSeats.
   - 2 is greater than 1.
   - Booking is not allowed.
10. Return:
    - booking not allowed
    - available seats: 1
    - reason: not enough available seats

### Expected Result

Booking rejected because only 1 seat is available but 2 seats were requested.

### Match?

Yes - matches


---

## Trace 4 — Invalid Requested Seats

### Input

- seatCapacity: 100
- existingBookings:
  - Booking 1: seatsBooked = 40
- requestedSeats: 0

### Hand Trace

1. Receive seat capacity, existing bookings, and requested seats.
2. Check seat capacity.
   - 100 is a positive integer.
   - Continue.
3. Check existing bookings.
   - existingBookings is a list.
   - Continue.
4. Set totalBookedSeats to 0.
5. Process Booking 1.
   - seatsBooked is 40, which is a positive integer.
   - totalBookedSeats becomes 40.
6. Check whether totalBookedSeats exceeds capacity.
   - 40 is not greater than 100.
   - Continue.
7. Check requestedSeats.
   - 0 is not a positive integer.
8. Return a failure stating that the requested seat count is invalid.
9. Stop the function.

### Expected Result

Booking rejected because the requested number of seats must be a positive integer.

### Match?

Yes - matches

---

## Trace 5 — Existing Bookings Exceed Capacity

### Input

- seatCapacity: 100
- existingBookings:
  - Booking 1: seatsBooked = 60
  - Booking 2: seatsBooked = 50
- requestedSeats: 1

### Hand Trace

1. Receive seat capacity, existing bookings, and requested seats.
2. Check seat capacity.
   - 100 is a positive integer.
   - Continue.
3. Check existing bookings.
   - existingBookings is a list.
   - Continue.
4. Set totalBookedSeats to 0.
5. Process Booking 1.
   - seatsBooked is 60, which is a positive integer.
   - totalBookedSeats becomes 60.
6. Process Booking 2.
   - seatsBooked is 50, which is a positive integer.
   - totalBookedSeats becomes 110.
7. Check whether totalBookedSeats exceeds capacity.
   - 110 is greater than 100.
8. Return a failure stating that the existing bookings exceed the flight capacity.
9. Stop the function.

### Expected Result

Booking rejected because existing bookings already exceed the flight capacity.

### Match?

Yes - matches
