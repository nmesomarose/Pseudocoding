const { checkSeatAvailability: checkSeatAvailabilityB2 } = require('../../part-b/b2/checkSeatAvailability.js');
const { checkSeatAvailability: checkSeatAvailabilityC1 } = require('../c1/checkSeatAvailability.js');

const tests = [
  {
    name: "Trace 1 - Normal booking",
    args: [100, [{ seatsBooked: 40 }], 2]
  },
  {
    name: "Trace 2 - Exactly fills remaining seats",
    args: [100, [{ seatsBooked: 98 }], 2]
  },
  {
    name: "Trace 3 - Not enough seats",
    args: [100, [{ seatsBooked: 99 }], 2]
  },
  {
    name: "Trace 4 - Invalid requested seats",
    args: [100, [{ seatsBooked: 40 }], 0]
  },
  {
    name: "Trace 5 - Existing bookings exceed capacity",
    args: [100, [{ seatsBooked: 60 }, { seatsBooked: 50 }], 1]
  },
  {
    name: "Trace 6 - Invalid seat capacity (negative)",
    args: [-10, [], 2]
  },
  {
    name: "Trace 7 - Existing bookings missing/null",
    args: [100, null, 2]
  },
  {
    name: "Trace 8 - Invalid seatsBooked value (negative)",
    args: [100, [{ seatsBooked: -5 }], 2]
  },
  {
    name: "Trace 9 - Booking object is null",
    args: [100, [null], 2]
  },
  {
    name: "Trace 10 - Requested seats not an integer",
    args: [100, [{ seatsBooked: 40 }], 2.5]
  }
];

tests.forEach((test, index) => {
  console.log(`\n=== Test ${index + 1}: ${test.name} ===`);
  console.log("Input:", JSON.stringify(test.args));
  
  let b2Result, c1Result;
  try {
    b2Result = checkSeatAvailabilityB2(...test.args);
  } catch(e) {
    b2Result = { error: e.message };
  }
  
  try {
    c1Result = checkSeatAvailabilityC1(...test.args);
  } catch(e) {
    c1Result = { error: e.message };
  }
  
  console.log("B2 Result:", JSON.stringify(b2Result));
  console.log("C1 Result:", JSON.stringify(c1Result));
});
