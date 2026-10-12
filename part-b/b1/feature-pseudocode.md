\# B1 — Seat Availability and Booking Eligibility



\## Feature



Determine whether a requested number of seats can be booked on a flight based on the flight's seat capacity and the number of seats already booked.



\## Why this feature exists



The current Flight API can create bookings and stores seatsBooked, but Project 1 deliberately excluded seat-capacity enforcement.



If this system becomes a real flight-booking application, allowing bookings without checking remaining capacity could allow more seats to be booked than the flight can hold.



\## Scope



The feature will:

\- validate the requested number of seats

\- determine how many seats have already been booked

\- calculate remaining seats

\- determine whether the requested seats fit within the remaining capacity

\- return whether the booking is allowed



The feature will NOT handle:

\- payment

\- booking status

\- temporary seat holds

\- authentication

\- seat selection/maps

\- notifications



\## Inputs



\- flight seat capacity

\- existing bookings and their seatsBooked values

\- requested number of seats



\## Output



\- whether the requested booking is allowed

\- available seats or the reason the booking is rejected

## Pseudocode

FUNCTION checkSeatAvailability

INPUTS:
- seatCapacity: the total number of seats available on the flight
- existingBookings: a list of existing bookings, where each booking contains seatsBooked
- requestedSeats: the number of seats the customer wants to book

OUTPUT:
- A result stating whether the booking is allowed
- The number of seats currently available
- If rejected, the reason the booking cannot proceed

SIDE EFFECTS:
- NONE

FAILS WHEN:
- seatCapacity is not a positive integer
- existingBookings is missing or is not a list
- a booking in existingBookings has an invalid seatsBooked value
- requestedSeats is not a positive integer
- the total number of already booked seats exceeds the flight capacity

1. Receive the flight seat capacity, existing bookings, and requested number of seats.

2. Check the flight seat capacity.
   IF seatCapacity is not a positive integer:
   - Return a failure stating that the flight seat capacity is invalid.
   - Stop the function.

3. Check the existing bookings.
   IF existingBookings is not a list:
   - Return a failure stating that the existing bookings are invalid.
   - Stop the function.

4. Set totalBookedSeats to 0.

5. FOR EACH booking in existingBookings:
   - Check the booking's seatsBooked value.
   - IF seatsBooked is not a positive integer:
     - Return a failure stating that an existing booking contains an invalid seat count.
     - Stop the function.
   - Add seatsBooked to totalBookedSeats.
   END FOR

6. IF totalBookedSeats is greater than seatCapacity:
   - Return a failure stating that the existing bookings exceed the flight capacity.
   - Stop the function.

7. Check requestedSeats.
   IF requestedSeats is not a positive integer:
   - Return a failure stating that the requested seat count is invalid.
   - Stop the function.

8. Calculate availableSeats as seatCapacity minus totalBookedSeats.

9. IF requestedSeats is greater than availableSeats:
   - Return a result stating that the booking is not allowed.
   - Include the number of available seats.
   - State that there are not enough available seats.
   - Stop the function.

10. Calculate remainingSeatsAfterBooking as availableSeats minus requestedSeats.

11. Return a result stating that the booking is allowed.
   - Include availableSeats.
   - Include remainingSeatsAfterBooking.