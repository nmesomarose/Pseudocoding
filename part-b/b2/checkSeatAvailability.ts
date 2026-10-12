type Booking = {
  seatsBooked: number;
};

type SeatAvailabilityResult = {
  allowed: boolean;
  availableSeats?: number;
  remainingSeatsAfterBooking?: number;
  reason?: string;
};

export function checkSeatAvailability(
  seatCapacity: number,
  existingBookings: Booking[],
  requestedSeats: number
): SeatAvailabilityResult {
  // 1. Validate flight capacity.
  if (!Number.isInteger(seatCapacity) || seatCapacity <= 0) {
    return {
      allowed: false,
      reason: "Seat capacity must be a positive integer.",
    };
  }

  // 2. Validate the existing bookings list.
  if (!Array.isArray(existingBookings)) {
    return {
      allowed: false,
      reason: "Existing bookings must be a list.",
    };
  }

  // 3. Count seats already booked.
  let totalBookedSeats = 0;

  for (const booking of existingBookings) {
    if (
      !booking ||
      !Number.isInteger(booking.seatsBooked) ||
      booking.seatsBooked <= 0
    ) {
      return {
        allowed: false,
        reason: "An existing booking has an invalid seat count.",
      };
    }

    totalBookedSeats += booking.seatsBooked;
  }

  // 4. Check whether existing bookings exceed flight capacity.
  if (totalBookedSeats > seatCapacity) {
    return {
      allowed: false,
      reason: "Existing bookings exceed the flight capacity.",
    };
  }

  // 5. Validate the requested number of seats.
  if (!Number.isInteger(requestedSeats) || requestedSeats <= 0) {
    return {
      allowed: false,
      reason: "Requested seats must be a positive integer.",
    };
  }

  // 6. Calculate currently available seats.
  const availableSeats = seatCapacity - totalBookedSeats;

  // 7. Check whether enough seats are available.
  if (requestedSeats > availableSeats) {
    return {
      allowed: false,
      availableSeats,
      reason: "There are not enough available seats.",
    };
  }

  // 8. Calculate the seats remaining after the requested booking.
  const remainingSeatsAfterBooking = availableSeats - requestedSeats;

  // 9. Return the successful result.
  return {
    allowed: true,
    availableSeats,
    remainingSeatsAfterBooking,
  };
}