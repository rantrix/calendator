# `.giveMeCalendarForMonthYear(month, year) => Array`

Builds an array representing a calendar for the given month and year, and then
caches the result. If the method is called again with the same exact month
and year, the cached result will be returned instead of building it again.

The method will always check the cache first before building the calendar array.

#### Arguments

1. `month` (`number`): Month of the year within the range of {0..11} where
January = 0 and December = 11.

2. `year` (`number`): The year. Example: 2017.

#### Returns

`Array`: Returns an array containing up to 6 arrays with 7 elements. The inner
array is the week, which is why it has 7 elements because there are only 7 days
within a week. The outer array is the calendar.

#### Example

```
var calendator = new Calendator();
calendator.giveMeCalendarForMonthYear(Calendator.MAY, 2017);
// => [
//      [null, 1, 2, 3, 4, 5, 6],
//      [7, 8, 9, 10, 11, 12, 13],
//      [14, 15, 16, 17, 18, 19, 20],
//      [21, 22, 23, 24, 25, 26, 27],
//      [28, 29, 30, 31, null, null, null]
//    ]
```

Getting calendar with `fillDaysForPrevAndNextMonths = true` to fill days for
previous and next month in the requested calendar:

```
var calendator = new Calendator(..., ..., true);
calendator.giveMeCalendarForMonthYear(Calendator.MAY, 2017);
// => [
//      [30, 1, 2, 3, 4, 5, 6],
//      [7, 8, 9, 10, 11, 12, 13],
//      [14, 15, 16, 17, 18, 19, 20],
//      [21, 22, 23, 24, 25, 26, 27],
//      [28, 29, 30, 31, 1, 2, 3]
//    ]
```
