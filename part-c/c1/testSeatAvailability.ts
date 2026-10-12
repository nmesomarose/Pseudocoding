import { checkSeatAvailability } from "./checkSeatAvailability";

const tests = [
  {
    name: "Trace 1 — Normal booking",
    seatCapacity: 100,
    existingBookings: [{ seatsBooked: 40 }],
    requestedSeats: 2,
    expected: {
      allowed: true,
      availableSeats: 60,
      remainingSeatsAfterBooking: 58,
    },
  },
  {
    name: "Trace 2 — Exactly fills remaining seats",
    seatCapacity: 100,
    existingBookings: [{ seatsBooked: 98 }],
    requestedSeats: 2,
    expected: {
      allowed: true,
      availableSeats: 2,
      remainingSeatsAfterBooking: 0,
    },
  },
  {
    name: "Trace 3 — Not enough seats",
    seatCapacity: 100,
    existingBookings: [{ seatsBooked: 99 }],
    requestedSeats: 2,
    expected: {
      allowed: false,
      availableSeats: 1,
    },
  },
  {
    name: "Trace 4 — Invalid requested seats",
    seatCapacity: 100,
    existingBookings: [{ seatsBooked: 40 }],
    requestedSeats: 0,
    expected: {
      allowed: false,
      reason: "The requested seat count is invalid.",
    },
  },
  {
    name: "Trace 5 — Existing bookings exceed capacity",
    seatCapacity: 100,
    existingBookings: [
      { seatsBooked: 60 },
      { seatsBooked: 50 },
    ],
    requestedSeats: 1,
    expected: {
      allowed: false,
      reason: "The existing bookings exceed the flight capacity.",
    },
  },
];

let passed = 0;

for (const test of tests) {
  const actual = checkSeatAvailability(
    test.seatCapacity,
    test.existingBookings,
    test.requestedSeats,
  );

  const matches = Object.entries(test.expected).every(
    ([key, value]) =>
      actual[key as keyof typeof actual] === value,
  );

  console.log(`${matches ? "PASS" : "FAIL"}: ${test.name}`);
  console.log("Expected:", test.expected);
  console.log("Actual:  ", actual);
  console.log("");

  if (matches) passed++;
}

console.log(`${passed}/${tests.length} tests passed.`);
