# Pair Problem

This repository want to solve the pair problem and implement a function to generate solutions.

## Problem Description

[Pair programming](https://en.wikipedia.org/wiki/Pair_programming) requires two developers to work together. Suppose there are <img src="/tex/55a049b8f161ae7cfeb0197d75aff967.svg?invert_in_darkmode&sanitize=true" align=middle width=9.86687624999999pt height=14.15524440000002pt/> members in a team. They want to pair with each other **once and only once**. If there is only one left with no pair, he/she will solo at that time.

1. Given a sequence of members, implement a function that will come out with one solution for the their pairing arrangement, that is, every member will be paired **once and only once**.

2. For the amount of members <img src="/tex/55a049b8f161ae7cfeb0197d75aff967.svg?invert_in_darkmode&sanitize=true" align=middle width=9.86687624999999pt height=14.15524440000002pt/>, how many rounds does the solution has? And try to prove it.

3. Improve the function that will come out with all the correct solutions.

4. Find out the relationship between <img src="/tex/55a049b8f161ae7cfeb0197d75aff967.svg?invert_in_darkmode&sanitize=true" align=middle width=9.86687624999999pt height=14.15524440000002pt/> and the number of solutions. And try to prove it.

## Solution

> 2. For the amount of members <img src="/tex/55a049b8f161ae7cfeb0197d75aff967.svg?invert_in_darkmode&sanitize=true" align=middle width=9.86687624999999pt height=14.15524440000002pt/>, how many rounds does the solution has? And try to prove it.

If <img src="/tex/55a049b8f161ae7cfeb0197d75aff967.svg?invert_in_darkmode&sanitize=true" align=middle width=9.86687624999999pt height=14.15524440000002pt/> is odd, then we can assume that there is another "transparent" member in the team, everyone who pairs with the "transparent" member will solo. So the number of rounds will as same as the next even number (i.e. <img src="/tex/3f18d8f60c110e865571bba5ba67dcc6.svg?invert_in_darkmode&sanitize=true" align=middle width=38.17727759999999pt height=21.18721440000001pt/>).

So we only consider that <img src="/tex/55a049b8f161ae7cfeb0197d75aff967.svg?invert_in_darkmode&sanitize=true" align=middle width=9.86687624999999pt height=14.15524440000002pt/> is even. In total we have

<p align="center"><img src="/tex/768c8f88de2ef0545d1de1f75b8c4d6c.svg?invert_in_darkmode&sanitize=true" align=middle width=23.744358pt height=26.301595649999996pt/></p>

dfdfdfdf
