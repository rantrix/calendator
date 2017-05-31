# `.giveMeCalendarForDate(date) => Array`

Get an array representing a calendar for the given date.

#### Arguments

1. `date` (`Date`): An instance of `Date` for a date within the calendar.

#### Returns

`Array`: Returns an array containing up to 6 arrays with 7 elements. The inner
array is the week, which is why it has 7 elements because there are only 7 days
within a week. The outer array is the calendar.

#### Example

```
var may2017 = new Date(2017, Calendator.MAY, 1);

var calendator = new Calendator();
calendator.giveMeCalendarForDate(may2017);
// => [
//      [null, 1, 2, 3, 4, 5, 6],
//      [7, 8, 9, 10, 11, 12, 13],
//      [14, 15, 16, 17, 18, 19, 20],
//      [21, 22, 23, 24, 25, 26, 27],
//      [28, 29, 30, 31, null, null, null]
//    ]
```
