# `.getMonths() => Object(frozen)`

Get a frozen object containing all of the months in a year.

#### Returns

`Object(frozen)`: A frozen object:

```
{
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11
}
```

#### Example

```
var calendator = new Calendator();
var months = calendator.getMonths();
calendator.giveMeCalendarForMonthYear(months.MAY, 2017);
```

This method is helpful inside the `dayCreationHandler`:

```
function dayCreationHandler(year, month, day, weekday, currentWeekOfTheMonth) {
  var months = this.getMonths();

  switch (month) {
    case months.JAN:
      ... // your logic for January
      break;
    case months.FEB:
      ... // your logic for Feburary
      break;
    case ...:
      ... // your logic for whatever month you want
      break;
  }

  ... // more of your custom logic

  return ...; // your custom data here
}

var calendator = new Calendator(null, dayCreationHandler);
```
