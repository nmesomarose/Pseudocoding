\# B2 — Own Implementation



\## Implementation Rule



This feature is implemented from the B1 pseudocode without AI assistance.



Each numbered pseudocode step should correspond to a small, identifiable part of the implementation.



\## Feature Implemented



checkSeatAvailability



\## Source of Truth



The implementation must follow:



part-b/b1/feature-pseudocode.md



No additional behaviour should be added unless the pseudocode is updated first.



\## Verification



The implementation will be tested using the same five inputs used in the B1 hand traces.



The actual results will be compared against the predicted results from the hand traces.

## Why This Feature Matters

\## Check Seat Availability — Feature Description



The Check Seat Availability feature will help passengers know how many seats a flight can accommodate, how many seats have already been booked, and how many seats are still available.



It will allow passengers to enter the number of people travelling with them so the system can check whether enough seats are available for the entire group before allowing them to proceed with a booking.



The feature will also help the system determine the remaining bookable seats by comparing the flight's total capacity with the number of seats already booked.



In the future, the feature can be extended to distinguish between booked seats, available seats, assigned seats, and seats that are blocked or unavailable for assignment.



The current implementation will focus on calculating seat availability and checking whether the requested number of seats can be accommodated. Individual seat selection, seat assignments, and blocked-seat management will be handled separately.

## Implementation Behaviour



The feature will:



1\. Receive the required inputs.

2\. Validate the flight capacity.

3\. Validate the existing bookings list.

4\. Calculate the total number of seats already booked.

5\. Reject invalid seat counts in existing bookings.

6\. Reject a situation where existing bookings already exceed the flight capacity.

7\. Validate the number of seats requested by the passenger.

8\. Calculate the number of available seats.

9\. Reject the request if the passenger asks for more seats than are available.

10\. Calculate the number of seats that would remain after the requested booking.

11\. Return a clear result showing whether the requested booking can proceed and the relevant seat counts.

