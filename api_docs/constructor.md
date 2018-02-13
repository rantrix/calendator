# `new Calendator([startWeekWithThisWeekday][, dayCreationHandler][, fillDaysForPrevAndNextMonths]) => Calendator`

Creates an instance of the `Calendator`.

#### Arguments

1. `startWeekWithThisWeekday` (`number`[optional]): A number representing a
weekday within the range of 0 (Sunday) to 6 (Saturday). Otherwise, defaults to 0.

2. `dayCreationHandler` (`Function`[optional]): A handler to build and **return**
the custom data structure for a day during a calendar creation. It's called with
the following arguments
`dayCreationHandler(year, month, day, weekday, currentWeekOfTheMonth)`:
  - `year` (`number`): The year. Example: 2017.
  - `month` (`number`): Month in year within the range of {0..11} where
  January = 0 and December = 11.
  - `day` (`number`): Date of the month within the range of {1..28}, {1..29},
  {1..30}, or {1..31} depending on the month.
  - `weekday` (`number`): Weekday of the week in the range of {0..6} where
  Sunday = 0 and Saturday = 6.
  - `currentWeekOfTheMonth` (`number`): The current week of the month starting
  at 1

3. `fillDaysForPrevAndNextMonths` (`boolean`[optional]): If true, the first week
and last week returned in the requested calendar will contain days from previous
month and next month, respectively. This default to `false` and the first week
and last week returned in the requested calendar will contain `null` for days
that are not in the requested month.

#### Returns

`Calendator`: Returns an instance of the `Calendator`.

#### Example

```
function dayCreationHandler() {
  ... // your logic to create a day
}

var calendator = new Calendator(Calendator.MON, dayCreationHandler);
```
