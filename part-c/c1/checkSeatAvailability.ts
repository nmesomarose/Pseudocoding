/**
 * part-c/c1/checkSeatAvailability.ts
 *
 * AI-generated implementation of the checkSeatAvailability feature.
 * Derived strictly from: part-b/b1/feature-pseudocode.md
 *
 * Each numbered step in this file corresponds directly to the matching
 * step number in the pseudocode (steps 1-11).
 *
 * --- AMBIGUITIES & ASSUMPTIONS -------------------------------------------
 *
 * A1. "positive integer" - The pseudocode uses this phrase for seatCapacity,
 *     seatsBooked, and requestedSeats. Interpreted as: a finite integer > 0
 *     (i.e. Number.isInteger(x) && x > 0). This excludes 0, negatives,
 *     floats, NaN, Infinity, and non-numeric types. The phrase is consistent
 *     with everyday English and matches the FAILS WHEN section.
 *
 * A2. "existingBookings is not a list" - Interpreted as: !Array.isArray(value).
 *     The pseudocode gives no finer detail (e.g. null vs undefined vs object),
 *     so Array.isArray is the most direct JavaScript/TypeScript equivalent.
 *
 * A3. "a booking in existingBookings has an invalid seatsBooked value" - The
 *     pseudocode checks only the seatsBooked property; it says nothing about
 *     other properties on the booking object, nor about the booking itself
 *     being null/undefined. The implementation therefore checks only that
 *     booking.seatsBooked satisfies the positive-integer rule. If accessing
 *     .seatsBooked on a falsy booking would throw, that is an unspecified edge
 *     case; see A5.
 *
 * A4. Failure return shape - The pseudocode specifies only that each failure
 *     must "state a reason". The success return specifies availableSeats and
 *     remainingSeatsAfterBooking. No shared result type is prescribed.
 *     A discriminated union type is used here to make the shape explicit and
 *     type-safe, while staying minimal and consistent with the pseudocode
 *     output section.
 *
 * A5. Null/undefined bookings inside the list - The pseudocode says to check
 *     seatsBooked inside each booking but does not mention guarding against a
 *     booking that is null or undefined. This implementation treats a missing
 *     or null booking as having an invalid seatsBooked (accessing .seatsBooked
 *     on null would throw, so a guard is added and the same "invalid seat
 *     count" failure is returned). This is a conservative interpretation that
 *     stays within the spirit of the FAILS WHEN clause.
 *
 * A6. The pseudocode step order is preserved exactly. Notably, the
 *     requestedSeats validation (step 7) occurs AFTER the overbooking check
 *     (step 6), matching the pseudocode sequence.
 * -------------------------------------------------------------------------
 */

// -- Types ------------------------------------------------------------------

/** A single existing booking as described in the pseudocode inputs. */
type Booking = {
  seatsBooked: number;
};

/** Failure result - returned whenever any FAILS WHEN condition is met. */
type FailureResult = {
  allowed: false;
  reason: string;
  availableSeats?: number; // included only when step 9 (not enough seats) fires
};

/** Success result - returned at step 11. */
type SuccessResult = {
  allowed: true;
  availableSeats: number;
  remainingSeatsAfterBooking: number;
};

type SeatAvailabilityResult = FailureResult | SuccessResult;

// -- Helper -----------------------------------------------------------------

/**
 * Returns true when the value is a positive integer as required by the
 * pseudocode (see assumption A1).
 */
function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) > 0;
}

// -- Main function -----------------------------------------------------------

/**
 * FUNCTION checkSeatAvailability
 *
 * Determines whether a requested number of seats can be booked on a flight.
 *
 * @param seatCapacity     - Total seats on the flight.
 * @param existingBookings - List of bookings already made on the flight.
 * @param requestedSeats   - Number of seats the customer wants to book.
 * @returns A result describing whether the booking is allowed, how many seats
 *          are available, and on success how many would remain after booking.
 */
export function checkSeatAvailability(
  seatCapacity: number,
  existingBookings: Booking[],
  requestedSeats: number,
): SeatAvailabilityResult {
  // Step 1 - Receive inputs (implicit in the function signature).

  // Step 2 - Check the flight seat capacity.
  if (!isPositiveInteger(seatCapacity)) {
    return {
      allowed: false,
      reason: "The flight seat capacity is invalid.",
    };
  }

  // Step 3 - Check the existing bookings.
  if (!Array.isArray(existingBookings)) {
    return {
      allowed: false,
      reason: "The existing bookings are invalid.",
    };
  }

  // Step 4 - Set totalBookedSeats to 0.
  let totalBookedSeats = 0;

  // Step 5 - FOR EACH booking in existingBookings.
  for (const booking of existingBookings) {
    // Guard against null/undefined entries in the array (see assumption A5).
    if (!booking || !isPositiveInteger(booking.seatsBooked)) {
      return {
        allowed: false,
        reason: "An existing booking contains an invalid seat count.",
      };
    }

    totalBookedSeats += booking.seatsBooked;
  }

  // Step 6 - IF totalBookedSeats is greater than seatCapacity.
  if (totalBookedSeats > seatCapacity) {
    return {
      allowed: false,
      reason: "The existing bookings exceed the flight capacity.",
    };
  }

  // Step 7 - Check requestedSeats.
  if (!isPositiveInteger(requestedSeats)) {
    return {
      allowed: false,
      reason: "The requested seat count is invalid.",
    };
  }

  // Step 8 - Calculate availableSeats as seatCapacity minus totalBookedSeats.
  const availableSeats = seatCapacity - totalBookedSeats;

  // Step 9 - IF requestedSeats is greater than availableSeats.
  if (requestedSeats > availableSeats) {
    return {
      allowed: false,
      availableSeats,
      reason: "There are not enough available seats.",
    };
  }

  // Step 10 - Calculate remainingSeatsAfterBooking as availableSeats minus requestedSeats.
  const remainingSeatsAfterBooking = availableSeats - requestedSeats;

  // Step 11 - Return a result stating that the booking is allowed.
  return {
    allowed: true,
    availableSeats,
    remainingSeatsAfterBooking,
  };
}
