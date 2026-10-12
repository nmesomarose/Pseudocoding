# C2 — Reverse-Engineered Pseudocode

> **Source:** `part-c/c1/checkSeatAvailability.ts`
> **Written by:** Independent audit reading the code only,
> before consulting the original B1 pseudocode.

---

## What the code does — plain English summary

The function accepts three arguments, runs a series of guard checks on
each one, accumulates a running total of already-booked seats, and
finally decides whether the requested number of seats can be accommodated.
At each failure point it returns an object that carries `allowed: false`
and a human-readable `reason` string. On success it returns `allowed: true`
together with two seat counts.

---

## Types defined by the code

```
TYPE Booking:
  seatsBooked: number          -- must be a whole number > 0 to be valid

TYPE FailureResult:
  allowed: false               -- literal false
  reason: string               -- always present on any failure
  availableSeats?: number      -- present only on the "not enough seats" failure

TYPE SuccessResult:
  allowed: true                -- literal true
  availableSeats: number       -- always present on success
  remainingSeatsAfterBooking: number  -- always present on success

TYPE SeatAvailabilityResult = FailureResult | SuccessResult
```

---

## Helper

```
FUNCTION isPositiveInteger(value):
  RETURN true  IF  value is a whole number (no fractional part)
               AND value is greater than 0
  -- This rejects: 0, negative integers, fractions, NaN, Infinity,
  --               strings, null, undefined, objects
```

---

## Main function

```
FUNCTION checkSeatAvailability(seatCapacity, existingBookings, requestedSeats)
  RETURNS SeatAvailabilityResult

INPUTS (as declared TypeScript parameters):
  seatCapacity:      number
  existingBookings:  Booking[]     -- TypeScript type; runtime type not enforced by TS
  requestedSeats:    number

-- Step 1: inputs arrive via the function signature; no explicit action taken.

-- Step 2: validate seatCapacity
IF seatCapacity is NOT a positive integer (i.e. isPositiveInteger returns false):
  RETURN { allowed: false, reason: "The flight seat capacity is invalid." }
  -- Note: the reason string is different from the B1 wording

-- Step 3: validate existingBookings
IF existingBookings is NOT an array (Array.isArray returns false):
  RETURN { allowed: false, reason: "The existing bookings are invalid." }
  -- Catches: null, undefined, objects, primitives passed at runtime
  -- Does NOT separately handle "missing" (undefined) vs "wrong type" (object)
  --   both produce the same failure

-- Step 4: initialise running total
SET totalBookedSeats = 0

-- Step 5: iterate over every booking
FOR EACH booking IN existingBookings:

  -- Guard A: check whether the booking entry itself is falsy
  IF booking is falsy (null, undefined, 0, "", false, NaN):
    RETURN { allowed: false,
             reason: "An existing booking contains an invalid seat count." }
    -- This guard is NOT described in the B1 pseudocode step 5

  -- Guard B: check seatsBooked on the entry
  IF booking.seatsBooked is NOT a positive integer:
    RETURN { allowed: false,
             reason: "An existing booking contains an invalid seat count." }
    -- Both Guard A and Guard B produce identical failure objects

  ADD booking.seatsBooked TO totalBookedSeats
END FOR

-- Step 6: check for pre-existing overbooking
IF totalBookedSeats > seatCapacity:
  RETURN { allowed: false,
           reason: "The existing bookings exceed the flight capacity." }

-- Step 7: validate requestedSeats
--   NOTE: this validation happens AFTER the overbooking check (step 6),
--         matching the pseudocode order exactly.
IF requestedSeats is NOT a positive integer:
  RETURN { allowed: false, reason: "The requested seat count is invalid." }

-- Step 8: calculate how many seats are currently free
SET availableSeats = seatCapacity - totalBookedSeats

-- Step 9: check whether the request can be met
IF requestedSeats > availableSeats:
  RETURN { allowed: false,
           availableSeats: availableSeats,
           reason: "There are not enough available seats." }
  -- This is the ONLY failure path that includes availableSeats in the return

-- Step 10: calculate post-booking remainder
SET remainingSeatsAfterBooking = availableSeats - requestedSeats

-- Step 11: return success
RETURN { allowed: true,
         availableSeats: availableSeats,
         remainingSeatsAfterBooking: remainingSeatsAfterBooking }
```

---

## Return shape summary

| Scenario | `allowed` | `availableSeats` | `remainingSeatsAfterBooking` | `reason` |
|---|---|---|---|---|
| Invalid `seatCapacity` | `false` | absent | absent | present |
| Invalid `existingBookings` | `false` | absent | absent | present |
| Invalid booking entry (falsy or bad seatsBooked) | `false` | absent | absent | present |
| Pre-existing overbooking | `false` | absent | absent | present |
| Invalid `requestedSeats` | `false` | absent | absent | present |
| Not enough seats | `false` | **present** | absent | present |
| Booking allowed | `true` | **present** | **present** | absent |

---

## Observable behaviours NOT stated in B1

1. **Falsy booking guard** — the code explicitly checks `!booking` before
   accessing `.seatsBooked`. The B1 pseudocode does not describe this guard.

2. **Discriminant field `allowed`** — every return object contains a boolean
   field named `allowed`. The pseudocode describes the intent ("a result
   stating whether the booking is allowed") but does not name a specific field.

3. **`availableSeats` absent on most failures** — the OUTPUT section of B1
   says "The number of seats currently available" is part of the output, but
   the code only includes it on the step-9 failure and on success. All other
   failures omit it.

4. **Exact reason strings** — the code uses specific English phrases
   ("The flight seat capacity is invalid.", etc.). B1 describes the intent of
   each message but does not specify exact wording.
