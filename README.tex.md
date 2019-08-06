# Pair Problem

This repository want to solve the pair problem and implement a function to generate solutions.

## Problem Description

[Pair programming](https://en.wikipedia.org/wiki/Pair_programming) requires two developers to work together. Suppose there are $n$ members in a team. They want to pair with each other **once and only once**. If there is only one left with no pair, he/she will solo at that time.

1. Given a sequence of members, implement a function that will come out with one solution for the their pairing arrangement, that is, every member will be paired **once and only once**.

2. For the amount of members $n$, how many rounds does the solution has? And try to prove it.

3. Improve the function that will come out with all the correct solutions.

4. Find out the relationship between $n$ and the number of solutions. And try to prove it.

## Solution

> 2. For the amount of members $n$, how many rounds does the solution has? And try to prove it.

If $n$ is odd, then we can assume that there is another "transparent" member in the team, everyone who pairs with the "transparent" member will solo. So the number of rounds will as same as the next even number (i.e. $n+1$). So we only consider that $n$ is even.

We can think the problem like every round is to meet the pairing demands. For example, suppose we have 4 members in team and in total we have 6 pairing demands: `[0,1]`, `[0,2]`, `[0,3]`, `[1,2]`, `[1,3]` and `[2,3]`.

So if there are $n$ member in team and $n$ is an even number (Remember we only need consider the even case), we will have
$\sum_{i=1}^{n-1}i = \frac{n(n-1)}{2}$ pairing demands. And each arrangement in a round will meet as much as $\frac{n}{2}$ demands. That is we can at least have $n-1$ rounds to meet all pairing demands **if and only if** each round contains no duplicated pair with any others.
