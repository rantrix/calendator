# `.getWeekdays() => Object(frozen)`

Get a frozen object containing all of the weekdays.

#### Returns

`Object(frozen)`: A frozen object:

```
{
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6
}
```

#### Example

```
var calendator = new Calendator();
var weekdays = calendator.getWeekdays();
weekdays.SUN // => 0;
weekdays.MON // => 1;
```

This method is helpful inside the `dayCreationHandler`:

```
function dayCreationHandler(year, month, day, weekday, currentWeekOfTheMonth) {
  var weekdays = this.getWeekdays();

  switch (weekday) {
    case weekdays.SUN:
      ... // your logic for Sunday
      break;
    case weekdays.MON:
      ... // your logic for Monday
      break;
    case ...:
      ... // your logic for whatever weekday you want
      break;
  }

  ... // more of your custom logic

  return ...; // your custom data here
}

var calendator = new Calendator(null, dayCreationHandler);
```
