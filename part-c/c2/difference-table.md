# C2 — Difference Table

**Comparing:** `part-c/c1/checkSeatAvailability.ts` (AI implementation)
**Against:**   `part-b/b1/feature-pseudocode.md` (original specification)

---

## Classification key

| Label | Meaning |
|---|---|
| **AI added behaviour** | Code does something the pseudocode never asked for |
| **AI omitted behaviour** | Pseudocode required something the code does not do |
| **Ambiguous interpretation** | Pseudocode is unclear; the AI chose one plausible reading |

---

## Differences

### D1 — Falsy-booking-entry guard inside the loop

| Attribute | Detail |
|---|---|
| **Classification** | AI added behaviour |
| **Pseudocode (B1 step 5)** | "Check the booking's seatsBooked value. IF seatsBooked is not a positive integer: return a failure." |
| **Code (C1 line 126)** | `if (!booking || !isPositiveInteger(booking.seatsBooked))` — the `!booking` sub-check fires first and returns the same "invalid seat count" failure when the array entry is `null`, `undefined`, `0`, `false`, or any other falsy value. |
| **Evidence** | B1 step 5 only mentions inspecting `seatsBooked`; it says nothing about the booking object itself being absent or falsy. The `!booking` guard is wholly absent from the pseudocode. |
| **Impact** | A caller who passes `[null]` as the booking list will hit this code path and receive `{ allowed: false, reason: "An existing booking contains an invalid seat count." }`. B1 does not describe this scenario at all. |
| **Note** | The AI documented this addition as assumption A5 in its own file header. |

---

### D2 — "existingBookings is missing" not separately handled

| Attribute | Detail |
|---|---|
| **Classification** | Ambiguous interpretation |
| **Pseudocode (FAILS WHEN clause, line 98)** | "existingBookings is **missing** or is not a list" — two distinct conditions joined by "or". |
| **Pseudocode (step 3, line 111)** | "IF existingBookings is not a list" — only the second condition is tested in the step body; "missing" is absent from the step itself. |
| **Code (C1 line 113)** | `if (!Array.isArray(existingBookings))` — this single check catches `undefined`, `null`, and any non-array value, collapsing "missing" and "wrong type" into one branch with one message. |
| **Evidence** | The FAILS WHEN clause distinguishes "missing" from "not a list", but step 3 does not. `Array.isArray(undefined)` and `Array.isArray(null)` both return `false`, so the code correctly fails both cases — but via a single code path with a single reason string. A strict reading of the FAILS WHEN clause could imply two separate checks and/or two distinct error messages. |
| **Clarification needed** | The original pseudocode should either (a) consolidate "missing or not a list" in step 3 explicitly, or (b) split step 3 into two sub-checks with distinct failure messages for `undefined`/`null` vs wrong type. |

---

### D3 — Named return field `allowed` not specified

| Attribute | Detail |
|---|---|
| **Classification** | Ambiguous interpretation |
| **Pseudocode (OUTPUT section, line 89)** | "A result stating whether the booking is allowed." |
| **Code** | Every return object carries `allowed: false` (failures) or `allowed: true` (success) as an explicit named field used as a discriminant. |
| **Evidence** | B1 describes the intent of the output ("stating whether the booking is allowed") but never names a specific field. The AI chose `allowed` and used it as a TypeScript discriminated-union discriminant. Any name, shape, or encoding (e.g. a boolean flag, an enum, a string field) would be equally consistent with the specification. |
| **Impact** | None at the logic level, but any caller of the function depends on this field name, which is not part of the contract defined by the pseudocode. |
| **Clarification needed** | The OUTPUT section should specify the field name and type for the booking-allowed indicator. |

---

### D4 — `availableSeats` absent from all failures except step 9

| Attribute | Detail |
|---|---|
| **Classification** | Ambiguous interpretation |
| **Pseudocode (OUTPUT section, line 90–91)** | "The number of seats currently available. If rejected, the reason the booking cannot proceed." — "available seats" is listed as a general output item (not conditional), while "reason" is listed only for rejections. |
| **Pseudocode (steps 2, 3, 5, 6, 7)** | None of these failure-return steps say to include `availableSeats`. |
| **Pseudocode (step 9)** | "Include the number of available seats." — explicitly requested. |
| **Pseudocode (step 11)** | "Include availableSeats." — explicitly requested. |
| **Code** | `availableSeats` is included in the step-9 failure and in the success result. All other failure returns (`allowed: false`) omit it. |
| **Evidence** | The OUTPUT header implies `availableSeats` is always part of the output. The individual failure steps (2, 3, 5, 6, 7) never mention it, whereas step 9 and step 11 explicitly ask for it. The code follows the step-level instructions rather than the header, which is the more specific guidance. |
| **Impact** | A caller who receives a "seat capacity is invalid" failure will not be able to read `availableSeats` from the response (it is `undefined`/absent). |
| **Clarification needed** | The OUTPUT section should make clear whether `availableSeats` is returned only on success/step-9, or on every response. |

---

### D5 — `reason` field present on all failures, absent on success

| Attribute | Detail |
|---|---|
| **Classification** | Ambiguous interpretation |
| **Pseudocode (OUTPUT section, line 91)** | "If rejected, the reason the booking cannot proceed." — implies `reason` appears only on failure. |
| **Pseudocode (step 11)** | Does not mention a `reason` field on success. |
| **Code** | `FailureResult` always has `reason: string`; `SuccessResult` has no `reason` field. |
| **Evidence** | The code correctly matches the pseudocode intent: `reason` only appears in failure responses. This is consistent with "if rejected". |
| **Verdict** | No difference — the AI implemented this correctly. Recorded here because the OUTPUT section's phrasing ("available seats or the reason") could be misread as a single optional field, but the code handles it as two separate fields on two separate types. |

---

### D6 — Exact failure reason strings not specified

| Attribute | Detail |
|---|---|
| **Classification** | Ambiguous interpretation |
| **Pseudocode** | Each failure step says to "return a failure stating that [intent]". No literal strings are given. |
| **Code** | Uses specific strings: `"The flight seat capacity is invalid."`, `"The existing bookings are invalid."`, `"An existing booking contains an invalid seat count."`, `"The existing bookings exceed the flight capacity."`, `"The requested seat count is invalid."`, `"There are not enough available seats."` |
| **Evidence** | B1 never prescribes exact error message wording. |
| **Impact** | Any downstream consumer that pattern-matches on the `reason` string will be coupled to the AI's specific phrasing, which has no specification backing. |
| **Clarification needed** | The pseudocode should either define an error-code enum or specify exact reason strings if callers are expected to inspect them programmatically. |

---

## Summary of findings

| # | Classification | Brief description |
|---|---|---|
| D1 | AI added behaviour | Extra `!booking` guard on each array entry |
| D2 | Ambiguous interpretation | "missing" vs "not a list" collapsed into one check/message |
| D3 | Ambiguous interpretation | `allowed` field name invented; not in spec |
| D4 | Ambiguous interpretation | `availableSeats` absent from most failures; spec's OUTPUT header implies it should always be present |
| D5 | Ambiguous interpretation | `reason` correctly on failures only — no real difference, but OUTPUT wording is potentially misleading |
| D6 | Ambiguous interpretation | Exact reason strings are AI-invented; pseudocode gives intent only |

**AI omitted behaviour: none identified.**
The code implements every step described in B1, in the correct order,
with the correct conditional logic. No specified behaviour was dropped.

---

## Suggested clarifications to B1

1. **Step 3** — Rewrite as: "IF existingBookings is undefined, null, or is not
   an array, return a failure stating the bookings are invalid." This removes
   the tension between the FAILS WHEN clause and step 3.

2. **Step 5** — Add: "If a booking entry in the list is itself null or absent,
   treat it as an invalid booking." This would turn D1 from added behaviour
   into specified behaviour.

3. **OUTPUT section** — Clarify `availableSeats` scope: either "always included
   in the response" or "included only when the booking is rejected due to
   insufficient seats, and on success".

4. **OUTPUT section** — Name the fields explicitly: `allowed` (boolean),
   `availableSeats` (number, conditional), `remainingSeatsAfterBooking`
   (number, success only), `reason` (string, failure only).

5. **FAILS WHEN / failure steps** — Add a table or list of exact reason strings
   if they are part of the public contract. If not, state they are
   implementation-defined.
