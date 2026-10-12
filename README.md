# Pseudocoding Project: From Specification to Implementation

Welcome to the **Pseudocoding Project** repository. This project explores the rigorous engineering practices of translating technical problem domains into written specifications, decomposing logic into plain-English pseudocode, performing pre-implementation hand traces, implementing algorithms, evaluating planted bugs and peer reviews, and systematically comparing human implementations against AI-generated code.

---

## 1. Project Overview & Objectives

In software engineering, bugs and regressions often occur not because of syntax errors, but because of **specification gaps, unexamined boundary conditions, and misunderstandings of algorithmic logic**. 

This project bridges that gap by demonstrating:
1. **Algorithmic Planning:** Writing unambiguous, step-by-step pseudocode before writing code.
2. **Mental Execution (Hand Tracing):** Walking inputs through logic on paper/markdown to verify expected outputs before touching a compiler.
3. **Open-Source Analysis:** Deconstructing professional production libraries (Express.js) to understand how industry-standard functions operate.
4. **Defect Analysis & Peer Review:** Planting and diagnosing real-world boundary condition bugs (`>` vs `>=`), incorporating peer review feedback.
5. **Human vs. AI Implementation Rigour:** Comparing an independent human implementation against an AI implementation derived from the exact same pseudocode specification, cataloguing ambiguities, edge cases, and defensive programming differences.
6. **Technical Communication:** Explaining algorithmic logic clearly to non-technical stakeholders without confusing checks with actual commitments.

---

## 2. The Pseudocode Standard Used

All pseudocode throughout this repository adheres to a strict, structured plain-English standard designed for clarity, testability, and deterministic translation into executable code:

- **Function Name:** A clear, descriptive identifier in `camelCase` or PascalCase.
- **Inputs:** Explicit parameter names, data types, format constraints (e.g. UUID, ISO 8601 datetime), and semantic meanings.
- **Output & Return Type:** Exact return format, discriminated union types, HTTP status codes, or error shapes.
- **Side Effects:** Explicitly documented (e.g., database writes, HTTP response transmission, or marked `NONE`).
- **Fails When (Preconditions & Boundary Failures):** An exhaustive list of every failure condition that aborts normal execution.
- **Numbered Steps:** Sequential plain-English instructions numbered sequentially (`1.`, `2.`, `3.`).
- **Explicit Branches & Early Exits:** Every `IF` / `OTHERWISE` statement clearly defines its condition and explicitly declares when execution stops (`Stop the function`).
- **Loops:** Explicit iteration blocks (`FOR EACH item IN list ... END FOR`).
- **State Changes:** Explicit assignment and variable mutations (`Set totalBookedSeats to 0`, `Add X to total`).
- **External Calls:** Clear demarcation of external boundaries (e.g., database queries, router delegations).

---

## 3. Project Structure

The project is organised into three core modules:

```
Pseudocoding/
├── README.md                                # Root overview, standards, and verification guide
├── .gitignore                               # Git exclusions (node_modules, logs, env)
│
├── part-a/                                  # Functions, open-source analysis, and bug reviews
│   ├── a1/                                  # Part A1: Own Functions (3 documented functions)
│   │   ├── createBooking.md                 # 1. Complex function (multi-step DB orchestration)
│   │   ├── updateFlight.md                  # 2. Money / Authorisation function (price & airline check)
│   │   ├── updateFlight-trace.md            # Hand traces & comparisons for updateFlight
│   │   └── parseListQuery.md                # 3. Error-handling function (query validation & parsing)
│   ├── a2/                                  # Part A2: Open-Source Functions (Express.js)
│   │   ├── short-function.md                # Short: app.use() initial understanding & pseudocode
│   │   ├── ai-comparison.md                 # Comparison of app.use() against Express source
│   │   ├── app-use-trace.md                 # Hand traces for app.use()
│   │   ├── medium-function.md               # Medium: app.route() pseudocode, AI explanation & verification
│   │   ├── app-route-trace.md               # Hand traces for app.route()
│   │   └── hard-function.md                 # Hard: router.handle() dispatch loop & stack iteration
│   └── a3/                                  # Part A3: Bug Analysis & Peer Reviews
│       ├── checkSeatAvailability-buggy.ts   # Implementation with planted boundary bug (>=)
│       ├── checkSeatAvailability-peer-review.md # Verbatim peer feedback & planted bug analysis
│       └── friend-discount-bug-review.md    # Separate review of friend's discount calculation bug
│
├── part-b/                                  # Part B: Feature Specification & Own Implementation
│   ├── b1/                                  # Specification & Hand Traces
│   │   ├── feature-pseudocode.md            # The authoritative checkSeatAvailability specification
│   │   ├── hand-traces.md                   # 5 pre-implementation hand traces (normal, edge, invalid)
│   │   └── implementation.md                # Implementation notes and feature purpose
│   └── b2/                                  # Implementation & Automated Verification
│       ├── checkSeatAvailability.ts         # Own implementation strictly following B1 spec
│       ├── checkSeatAvailability.js         # Compiled CommonJS JavaScript file
│       ├── testSeatAvailability.ts          # Automated test harness for the 5 hand trace cases
│       └── trace-vs-test-comparison.md      # Side-by-side comparison of hand traces vs test runs
│
└── part-c/                                  # Part C: AI Implementation, Reverse Engineering & Comparison
    ├── c1/                                  # AI-Generated Implementation
    │   ├── checkSeatAvailability.ts         # AI implementation with explicit assumption documentation
    │   ├── checkSeatAvailability.js         # Compiled CommonJS JavaScript file
    │   ├── testSeatAvailability.ts          # Minimal independent test suite for C1
    │   ├── testSeatAvailability.js          # Compiled test suite for C1
    │   └── package.json                     # TypeScript compiler configuration & dependencies
    ├── c2/                                  # Reverse-Engineering & Difference Table
    │   ├── reverse-engineered-pseudocode.md # Pseudocode reverse-engineered from AI TypeScript code
    │   └── difference-table.md              # Systematic classification of additions, omissions & ambiguities
    ├── c3/                                  # Two-Implementation Comparative Evaluation
    │   ├── testHarness.js                   # 10-case comparative test harness executing B2 and C1
    │   └── two-implementation-comparison.md # Side-by-side evaluation across 10 test scenarios
    └── c4/                                  # Stakeholder Communication & Evidence
        ├── feedback.md                      # Reflection notes from non-technical listener discussion
        └── c4-feature-explanation.mp4       # Audio/video recording explaining feature to non-technical listener
```

---

## 4. Relationship Between Specification, Human, and AI Code

A central theme of this project is the relationship between the written word and executing code:

```
                     +---------------------------------------+
                     |  Part B1: feature-pseudocode.md       |
                     |  (Authoritative Specification)        |
                     +-------------------+-------------------+
                                         |
                    +--------------------+--------------------+
                    |                                         |
                    v                                         v
       +-------------------------+               +-------------------------+
       | Part B2: My Own Code    |               | Part C1: AI Code        |
       | (Human Implementation)  |               | (AI Implementation)     |
       +------------+------------+               +------------+------------+
                    |                                         |
                    | (Planted Boundary Bug &                 | (Reverse Engineered into
                    |  Peer Review in Part A3)                |  Part C2 Pseudocode)
                    |                                         |
                    +--------------------+--------------------+
                                         |
                                         v
                     +---------------------------------------+
                     | Part C3: Two-Implementation Comparison|
                     | (10-Case Test Harness Evaluation)     |
                     +---------------------------------------+
```

1. **Part B1 (`feature-pseudocode.md`)** is the **single source of truth**. Neither implementation is allowed to silently change this specification.
2. **Part B2 (`part-b/b2/`)** represents the human implementation derived directly from B1 without AI assistance.
3. **Part C1 (`part-c/c1/`)** represents the AI-generated implementation, which made explicit assumptions documented in its code header.
4. **Part C2 (`part-c/c2/`)** demonstrates **reverse engineering**: reading the AI's TypeScript implementation independently to reconstruct what it actually did, then classifying differences against B1 into:
   - *Added behaviour* (e.g. `!booking` guard on array elements).
   - *Omitted behaviour* (none found).
   - *Ambiguous or underspecified behaviour* (e.g. error message string phrasings, optional return field scope).
5. **Part C3 (`part-c/c3/`)** executes both implementations simultaneously against 10 comprehensive test scenarios, proving that identical high-level pass rates can still conceal subtle implementation nuances.

---

## 5. How to Run Tests and Verification

All verification checks can be executed locally from the repository root using Node.js and the local TypeScript compiler.

### Prerequisites
Node.js (v18+) installed.

### 1. Run Part B2 Tests (My Implementation)
Executes the 5 original test cases corresponding to the Part B1 hand traces:
```powershell
node part-b/b2/testSeatAvailability.js
```
*Expected Result:* `5/5 tests passed.`

### 2. Run Part C1 Independent Tests (AI Implementation)
Executes the 5 Part B1 trace scenarios independently against the C1 AI implementation:
```powershell
node part-c/c1/testSeatAvailability.js
```
*Expected Result:* `5/5 tests passed.`

### 3. Run Part C3 Comparison Test Harness (Both Implementations)
Executes 10 comprehensive test cases (5 original traces + 5 boundary/invalid edge cases) side-by-side against both B2 and C1:
```powershell
node part-c/c3/testHarness.js
```
*Expected Result:* 10/10 tests execute cleanly, comparing B2 and C1 return objects.

### 4. Run TypeScript Type Checks
Verifies that all TypeScript source files across Parts A, B, and C typecheck without errors:
```powershell
node part-c/c1/node_modules/typescript/bin/tsc --noEmit part-b/b2/checkSeatAvailability.ts part-b/b2/testSeatAvailability.ts part-c/c1/checkSeatAvailability.ts part-c/c1/testSeatAvailability.ts part-a/a3/checkSeatAvailability-buggy.ts
```
*Expected Result:* Exits with code 0 and zero type errors.

### 5. Recompiling TypeScript Files (Optional)
If you modify any `.ts` files, recompile using the local TypeScript compiler in `part-c/c1`:
```powershell
node part-c/c1/node_modules/typescript/bin/tsc --target ES2020 --module CommonJS part-b/b2/checkSeatAvailability.ts part-b/b2/testSeatAvailability.ts part-c/c1/checkSeatAvailability.ts part-c/c1/testSeatAvailability.ts
```

---

## 6. Where to Locate Key Evidence

- **Pre-Implementation Hand Traces:** [`part-b/b1/hand-traces.md`](file:///C:/Users/HomePC/Desktop/Pseudocoding/part-b/b1/hand-traces.md)
- **Hand Trace vs. Test Comparison:** [`part-b/b2/trace-vs-test-comparison.md`](file:///C:/Users/HomePC/Desktop/Pseudocoding/part-b/b2/trace-vs-test-comparison.md)
- **Planted Bug Analysis & Peer Review:** [`part-a/a3/checkSeatAvailability-peer-review.md`](file:///C:/Users/HomePC/Desktop/Pseudocoding/part-a/a3/checkSeatAvailability-peer-review.md)
- **Separate Discount Review Evidence:** [`part-a/a3/friend-discount-bug-review.md`](file:///C:/Users/HomePC/Desktop/Pseudocoding/part-a/a3/friend-discount-bug-review.md)
- **Reverse-Engineered Pseudocode:** [`part-c/c2/reverse-engineered-pseudocode.md`](file:///C:/Users/HomePC/Desktop/Pseudocoding/part-c/c2/reverse-engineered-pseudocode.md)
- **Side-by-Side Difference Table:** [`part-c/c2/difference-table.md`](file:///C:/Users/HomePC/Desktop/Pseudocoding/part-c/c2/difference-table.md)
- **10-Case Implementation Comparison:** [`part-c/c3/two-implementation-comparison.md`](file:///C:/Users/HomePC/Desktop/Pseudocoding/part-c/c3/two-implementation-comparison.md)
- **Non-Technical Explanation Recording:** [`part-c/c4/c4-feature-explanation.mp4`](file:///C:/Users/HomePC/Desktop/Pseudocoding/part-c/c4/c4-feature-explanation.mp4) (891 KB)
- **Listener Feedback Notes:** [`part-c/c4/feedback.md`](file:///C:/Users/HomePC/Desktop/Pseudocoding/part-c/c4/feedback.md)

---

## 7. Lessons Learned: Written Specifications vs. Actual Implementations

1. **Boundary Conditions Are Fragile:** The difference between `>` and `>=` represents the difference between a fully functioning airline booking system and one that rejects paying customers who want to purchase the last available seat. Writing explicit boundary hand traces (e.g., `Trace 2`) catches these errors before code is deployed.
2. **Pseudocode Must Be Explicit About Strings and Types:** When specifications use conversational guidance like *"state that the requested seat count is invalid"*, different engineers (and AI models) will invent divergent error strings (`"The requested seat count is invalid."` vs `"Requested seats must be a positive integer."`). If downstream APIs rely on error codes, the specification must prescribe exact string constants or enum values.
3. **Defensive Assumptions Emerge During Coding:** In Part C1, the AI added a `!booking` guard inside the loop because JavaScript runtimes crash (`TypeError: Cannot read properties of undefined`) if an array contains `null`. The specification author omitted this possibility. Good documentation bridges this by updating the specification rather than silently drifting away from it.
4. **Checking Availability Is Not Reserving:** Clear communication with stakeholders is essential. As demonstrated in Part C4, users and non-technical stakeholders must understand that a validation function (`checkSeatAvailability`) is purely an informational inquiry—it does not hold seats, process payments, or commit a reservation.
