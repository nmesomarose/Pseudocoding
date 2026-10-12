FUNCTION parseListQuery

CATEGORY:
Error-handling function (performs strict query parameter sanitisation, boundary checks, whitelist validation, and structured error dispatching).

INPUTS:
- query: object (Record<string, string | undefined>) representing raw query parameters parsed from URL query string
- filterFields: object or array specifying allowable filter parameters and validation types (e.g., 'uuid', 'date')
- sortableFields: array of strings containing allowed sorting property names

OUTPUT:
- Success object: { limit: number, offset: number, filters: object, sort?: string, order?: "asc" | "desc" }
- OR Error object: { error: string }
- Return type: Result<ParsedQuery, string>



SIDE EFFECTS:

\- NONE



FAILS WHEN:

\- A query parameter is not supported

\- limit is not a non-negative integer or is outside the allowed range

\- offset is not a non-negative integer

\- A filter value is missing, empty, or invalid for its filter type

\- A UUID filter is not a valid UUID

\- A date filter is not in valid YYYY-MM-DD format

\- order is provided without sort

\- sort is not a supported field

\- order is not "asc" or "desc"



1\. Create a list of allowed filter fields from filterFields.



2\. Create a list of allowed sort fields from sortableFields.



3\. Check every parameter in the query.



4\. IF a parameter is not "limit", "offset", "sort", "order", or an allowed filter field:

&#x20;  - Return an error stating that the query parameter is unsupported.

&#x20;  - Stop the function.



5\. Check the limit value.

&#x20;  - IF limit was not provided:

&#x20;    - Use 20 as the default limit.

&#x20;  - OTHERWISE:

&#x20;    - Check that limit is a non-negative integer.

&#x20;    - Convert limit to a number.

&#x20;    - Check that limit is between 1 and 100.

&#x20;    - IF the limit is invalid:

&#x20;      - Return an error stating that limit must be an integer between 1 and 100.

&#x20;      - Stop the function.



6\. Check the offset value.

&#x20;  - IF offset was not provided:

&#x20;    - Use 0 as the default offset.

&#x20;  - OTHERWISE:

&#x20;    - Check that offset is a non-negative integer.

&#x20;    - Convert offset to a number.

&#x20;    - IF the offset is invalid:

&#x20;      - Return an error stating that offset must be a non-negative integer.

&#x20;      - Stop the function.



7\. Create an empty list of filters.



8\. FOR EACH allowed filter field:

&#x20;  - Get the value provided for that filter.

&#x20;  - IF the filter was not provided:

&#x20;    - Continue to the next filter.

&#x20;  - IF the filter value is not a string or is empty:

&#x20;    - Return an error stating that the filter value is invalid.

&#x20;    - Stop the function.

&#x20;  - IF the filter uses UUID validation:

&#x20;    - Check that the value is a valid UUID.

&#x20;    - IF it is not a valid UUID:

&#x20;      - Return an error stating that the filter must be a valid UUID.

&#x20;      - Stop the function.

&#x20;  - IF the filter uses date validation:

&#x20;    - Check that the value is a valid YYYY-MM-DD date.

&#x20;    - IF it is not valid:

&#x20;      - Return an error stating that the filter must be in YYYY-MM-DD format.

&#x20;      - Stop the function.

&#x20;  - Add the filter field and value to the filter list.



9\. Check the sort value.



10\. IF sort was not provided:

&#x20;   - IF order was provided:

&#x20;     - Return an error stating that order requires a sort field.

&#x20;     - Stop the function.

&#x20;   - Return a successful result containing the limit, offset, filters, and no sort.

&#x20;   - Stop the function.



11\. IF sort is not a string or is not an allowed sort field:

&#x20;   - Return an error stating that the sort field is unsupported.

&#x20;   - Stop the function.



12\. Set the sort direction to "asc" by default.



13\. IF order was provided:

&#x20;   - Check whether order is "asc" or "desc".

&#x20;   - IF order is neither "asc" nor "desc":

&#x20;     - Return an error stating that order must be "asc" or "desc".

&#x20;     - Stop the function.

&#x20;   - Use the provided order as the sort direction.



14\. Return a successful result containing:

&#x20;   - limit

&#x20;   - offset

&#x20;   - filters

&#x20;   - sort field

&#x20;   - sort direction

## Trace 1 — Normal Input

### Input

- limit: "20"
- offset: "0"
- sort: "departureTime"
- order: "asc"
- airlineId: a valid UUID
- filterFields: airlineId using UUID validation
- sortableFields: departureTime

### Hand Trace

1. Create a list of allowed filter fields from filterFields.
   - Result: airlineId is allowed as a filter.

2. Create a list of allowed sort fields from sortableFields.
   - Result: departureTime is allowed for sorting.

3. Check every parameter in the query.
   - Result: all query parameters are supported.

4. IF a parameter is not supported:
   - Condition is false.
   - Continue.

5. Check the limit value.
   - Result: limit is provided as "20".
   - "20" is a valid non-negative integer.
   - 20 is between 1 and 100.
   - Result: limit = 20.

6. Check the offset value.
   - Result: offset is provided as "0".
   - "0" is a valid non-negative integer.
   - Result: offset = 0.

7. Create an empty list of filters.
   - Result: empty filter list is created.

8. FOR EACH allowed filter field:
   - airlineId is provided.
   - The value is a string and is not empty.
   - airlineId uses UUID validation.
   - The UUID is valid.
   - Result: airlineId filter is added to the filter list.

9. Check the sort value.
   - Result: sort is "departureTime".

10. IF sort was not provided:
    - Condition is false.
    - Continue.

11. IF sort is not a string or is not an allowed sort field:
    - Condition is false.
    - Continue.

12. Set the sort direction to "asc" by default.
    - Result: direction = "asc".

13. IF order was provided:
    - Result: order is "asc".
    - "asc" is allowed.
    - Use "asc" as the sort direction.

14. Return a successful result containing:
    - limit = 20
    - offset = 0
    - airlineId filter
    - sort field = departureTime
    - sort direction = asc

### Expected Result

A successful result is returned with the supplied pagination, filter, and sorting information.

### Actual Result


The real function returned a successful result.

The result contained:
- limit: 20
- offset: 0
- airlineId filter with the provided UUID
- sort field: departureTime
- sort direction: asc
### Comparison
MATCH — the real function behaved exactly as predicted by the hand trace.
## Trace 2 — Edge Input

### Input

- limit: not provided
- offset: not provided
- sort: not provided
- order: not provided
- airlineId: not provided
- filterFields: airlineId using UUID validation
- sortableFields: departureTime

### Hand Trace

1. Create a list of allowed filter fields from filterFields.
   - Result: airlineId is allowed as a filter.

2. Create a list of allowed sort fields from sortableFields.
   - Result: departureTime is allowed for sorting.

3. Check every parameter in the query.
   - Result: no unsupported query parameters are present.

4. IF a parameter is not supported:
   - Condition is false.
   - Continue.

5. Check the limit value.
   - Result: limit was not provided.
   - Use 20 as the default limit.

6. Check the offset value.
   - Result: offset was not provided.
   - Use 0 as the default offset.

7. Create an empty list of filters.
   - Result: empty filter list is created.

8. FOR EACH allowed filter field:
   - airlineId was not provided.
   - Continue to the next filter.

9. Check the sort value.
   - Result: sort was not provided.

10. IF sort was not provided:
    - order was also not provided.
    - Return a successful result with:
      - limit = 20
      - offset = 0
      - empty filters
      - no sort

11. Stop the function.

### Expected Result

A successful result is returned using the default limit of 20 and default offset of 0, with no filters and no sorting.

### Actual Result

The real function returned a successful result.

The result contained:
- limit: 20
- offset: 0
- filters: none
- sort: none

The function correctly used 20 as the default limit and 0 as the default offset.
### Comparison

MATCH — the real function behaved exactly as predicted by the hand trace.
## Trace 3 — Invalid Input

### Input

- limit: "150"
- offset: "0"
- sort: "departureTime"
- order: "asc"
- filterFields: airlineId using UUID validation
- sortableFields: departureTime

### Hand Trace

1. Create a list of allowed filter fields from filterFields.
   - Result: airlineId is allowed as a filter.

2. Create a list of allowed sort fields from sortableFields.
   - Result: departureTime is allowed for sorting.

3. Check every parameter in the query.
   - Result: all query parameters are supported.

4. IF a parameter is not supported:
   - Condition is false.
   - Continue.

5. Check the limit value.
   - Result: limit is provided as "150".
   - "150" is a valid integer.
   - However, it is greater than the maximum allowed limit of 100.
   - Result: limit is invalid.

6. IF the limit is invalid:
   - Return an error stating that limit must be an integer between 1 and 100.
   - Stop the function.

7–14. These steps are not reached because the function stopped after the invalid limit was detected.

### Expected Result

An error result is returned stating that `"limit" must be an integer between 1 and 100`.

No filters or sorting should be processed.

### Actual Result

The real function rejected the query and returned an error result.

The error message was:

"limit" must be an integer between 1 and 100

The function stopped after detecting that the limit of 150 was above the maximum allowed limit of 100.

### Comparison

MATCH — the real function behaved exactly as predicted by the hand trace