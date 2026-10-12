\# A3 — Friend's Discount Function Review



\## 1. Actual Behaviour



\*\*FUNCTION:\*\* applyDiscount



\*\*INPUTS:\*\*

\- orderTotal: the original order amount.

\- discountPercent: the discount percentage.



\*\*OUTPUT:\*\* An object indicating success or failure, with the relevant amounts or error message.



\*\*SIDE EFFECTS:\*\* None.



\*\*FAILS WHEN:\*\* The order total is zero or negative, or the discount percentage is below 0% or above 100%.



\*\*STEPS:\*\*



1\. If the order total is less than or equal to zero, return a failure result with the error "Invalid order total".

2\. Otherwise, if the discount percentage is below 0% or above 100%, return a failure result with the error "Invalid discount".

3\. Calculate the discount amount by multiplying the order total by the discount percentage and dividing by 100.

4\. Calculate the final total by ADDING the discount amount to the original order total.

5\. Return a successful result containing the original total, discount amount, and final total.



\## 2. Intended Behaviour



\*\*FUNCTION:\*\* applyDiscount



\*\*INPUTS:\*\*

\- orderTotal: the original order amount.

\- discountPercent: the discount percentage.



\*\*OUTPUT:\*\* An object indicating success or failure, with the relevant amounts or error message.



\*\*SIDE EFFECTS:\*\* None.



\*\*FAILS WHEN:\*\* The order total is zero or negative, or the discount percentage is below 0% or above 100%.



\*\*STEPS:\*\*



1\. If the order total is less than or equal to zero, return a failure result with the error "Invalid order total".

2\. Otherwise, if the discount percentage is below 0% or above 100%, return a failure result with the error "Invalid discount".

3\. Calculate the discount amount by multiplying the order total by the discount percentage and dividing by 100.

4\. Calculate the final total by SUBTRACTING the discount amount from the original order total.

5\. Return a successful result containing the original total, discount amount, and final total.



\## 3. Bug Identified



The bug is in Step 4 of the actual behaviour. The function adds the discount amount to the original order total instead of subtracting it.



\*\*Example:\*\*



\- Original order total: ₦10,000

\- Discount percentage: 10%

\- Discount amount: ₦1,000

\- Expected final total: ₦9,000

\- Actual final total: ₦11,000



The function charges more instead of reducing the amount the customer must pay.



I identified the bug by tracing the calculation with a sample order and comparing the actual result with the intended behaviour.

