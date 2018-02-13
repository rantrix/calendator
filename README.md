# The Calendator!

[![MIT License][npm-license-badge]][npm-license-link]
[![Version][npm-version-badge]][npm-version-link]
[![Travis Build Status][travis-badge]][travis-link]
[![Code Coverage][codecov-badge]][codecov-link]

The Calendator will generate a calendar and cache it for any month and year OR date!

```
var calendator = new Calendator();
var may = Calendator.MAY;
var year2017 = 2017;
calendator.giveMeCalendarForMonthYear(may, year2017);
// => [
//      [null, 1, 2, 3, 4, 5, 6],
//      [7, 8, 9, 10, 11, 12, 13],
//      [14, 15, 16, 17, 18, 19, 20],
//      [21, 22, 23, 24, 25, 26, 27],
//      [28, 29, 30, 31, null, null, null]
//    ]

var may2017 = new Date(year2017, may, 1);
calendator.giveMeCalendarForDate(may2017);
// => [
//      [null, 1, 2, 3, 4, 5, 6],
//      [7, 8, 9, 10, 11, 12, 13],
//      [14, 15, 16, 17, 18, 19, 20],
//      [21, 22, 23, 24, 25, 26, 27],
//      [28, 29, 30, 31, null, null, null]
//    ]
```

[![Watch on GitHub][github-watch-badge]][github-watch-link]
[![Star on GitHub][github-star-badge]][github-star-link]
[![Tweet][twitter-badge]][twitter-link]

# Installation

`npm install calendator` or `yarn add calendator`.

Use with [Node.js](https://nodejs.org/en/), [Browserify](http://browserify.org/), or [webpack](https://webpack.github.io/):

```
var Calendator = require('calendator');
var calendator = new Calendator();
```

The Calendator supports **CommonJS**, **UMD**, and browser (attaches itself to
`window.dv.Calendator`).

# License

[MIT](LICENSE).

# Usage

## Basic Usage

[See above.](#the-calendator)

## Caching

The Calendator will only build a calendar once when you ask for a calendar, then
it caches the calendar. When you ask for the same calendar next time, it will
return the same exact calendar from it's cache.

## Tips

The Calendator expects weekdays and months to start at 0. When using the
Calendator, avoid specifying the weekday or the month in integer unless you're
confident you can avoid the one-off bug. Instead, use the months and weekdays
variable names attached to the Calendator:

```
// Weekdays
Calendator.SUN // => 0
Calendator.MON // => 1
Calendator.TUE // => 2
Calendator.WED // => 3
Calendator.THU // => 4
Calendator.FRI // => 5
Calendator.SAT // => 6

// Months
Calendator.JAN // => 0
Calendator.FEB // => 1
Calendator.MAR // => 2
Calendator.APR // => 3
Calendator.MAY // => 4
Calendator.JUN // => 5
Calendator.JUL // => 6
Calendator.AUG // => 7
Calendator.SEP // => 8
Calendator.OCT // => 9
Calendator.NOV // => 10
Calendator.DEC // => 11
```

If you already have an instance of `Calendator`, you can use `.getMonths` and
`.getWeekdays` to get an object containing these variable names for weekdays and
months:

```
var calendator = new Calendator();
calendator.getMonths()   // => {SUN: 0, MON: 1, ..., SAT:  6}
calendator.getWeekdays() // => {JAN: 0, FEB: 1, ..., DEC: 11}
```

## Specifying the start weekday of every week

By default, the Calendator will always use Sunday as the starting weekday of
every week. When you're constructing the Calendator, you can specify the
starting weekday of every week:

```
var calendator = new Calendator(Calendator.MON);
```

The Calendator will now return all calendars with Monday as the first day of the
week, which means that `week[0]` will be a Monday, `week[1]` will be a Tuesday,
and etc.

## Handling day creation yourself

By default, the Calendator will always return a number representing the day when
it gives you a calendar. However, you can customize this day data by giving the
Calendator a day creation handler during construction. Every time the Calendator
creates a day, it will use your day creation handler to build the day data and
pass it the following arguments:
`dayCreationHandler(year, month, day, weekday, currentWeekOfTheMonth)`

NORMAL DEFAULT BEHAVIOR:

```
var may = Calendator.MAY;
var year2017 = 2017;

var calendator = new Calendator();
calendator.giveMeCalendarForMonthYear(may, year2017);
// => [
//      [null, 1, 2, 3, 4, 5, 6],
//      [7, 8, 9, 10, 11, 12, 13],
//      [14, 15, 16, 17, 18, 19, 20],
//      [21, 22, 23, 24, 25, 26, 27],
//      [28, 29, 30, 31, null, null, null]
//    ]
```

NOW, WITH THE `dayCreationHandler`:

```
function dayCreationHandler(year, month, day, weekday, currentWeekOfTheMonth) {
  var myCustomDayData = ...; // build your custom data according to your logic
  return myCustomDayData;    // return your custom data.

  // lets assume we returned this:
  // return {d: day, m: month};
}

// `null` defaults Calendator to Sunday as starting weekday
calendator = new Calendator(null, dayCreationHandler);
calendator.giveMeCalendarForMonthYear(may, year2017);
// => [
//      [
//        null,
//        {d: 1, m: 4},
//        {d: 2, m: 4},
//        {d: 3, m: 4},
//        {d: 4, m: 4},
//        {d: 5, m: 4},
//        {d: 6, m: 4}
//      ],
//      [
//        {d: 7, m: 4},
//        {d: 8, m: 4},
//        {d: 9, m: 4},
//        {d: 10, m: 4},
//        {d: 11, m: 4},
//        {d: 12, m: 4},
//        {d: 13, m: 4}
//      ],
//      [
//        {d: 14, m: 4},
//        {d: 15, m: 4},
//        {d: 16, m: 4},
//        {d: 17, m: 4},
//        {d: 18, m: 4},
//        {d: 19, m: 4},
//        {d: 20, m: 4}
//      ],
//      [
//        {d: 21, m: 4},
//        {d: 22, m: 4},
//        {d: 23, m: 4},
//        {d: 24, m: 4},
//        {d: 25, m: 4},
//        {d: 26, m: 4},
//        {d: 27, m: 4}
//      ],
//      [
//        {d: 28, m: 4},
//        {d: 29, m: 4},
//        {d: 30, m: 4},
//        {d: 31, m: 4},
//        null,
//        null,
//        null
//      ]
//    ]
```

Imagine all the possibilities that you can do with the Calendator! Ahhhh!

# Calendator's API

* Constructor
  * [`new Calendator([startWeekWithThisWeekday][, dayCreationHandler][, fillDaysForPrevAndNextMonths]) => Calendator`](api_docs/constructor.md)
* Class Properties
  * Weekdays
    * `Calendator.SUN => 0`
    * `Calendator.MON => 1`
    * `Calendator.SUN => 0`
    * `Calendator.MON => 1`
    * `Calendator.TUE => 2`
    * `Calendator.WED => 3`
    * `Calendator.THU => 4`
    * `Calendator.FRI => 5`
    * `Calendator.SAT => 6`
  * Months
    * `Calendator.JAN => 0`
    * `Calendator.FEB => 1`
    * `Calendator.MAR => 2`
    * `Calendator.APR => 3`
    * `Calendator.MAY => 4`
    * `Calendator.JUN => 5`
    * `Calendator.JUL => 6`
    * `Calendator.AUG => 7`
    * `Calendator.SEP => 8`
    * `Calendator.OCT => 9`
    * `Calendator.NOV => 10`
    * `Calendator.DEC => 11`
* Public Instance Methods
  * [`.getCalendarForDate(date) => Array`](api_docs/getCalendarForDate.md)
  * [`.getCalendarForMonthYear(month, year) => Array`](api_docs/getCalendarForMonthYear.md)
  * [`.getMonths() => Object(frozen)`](api_docs/getMonths.md)
  * [`.getWeekdays() => Object(frozen)`](api_docs/getWeekdays.md)
  * [`.giveMeCalendarForDate(date) => Array`](api_docs/giveMeCalendarForDate.md)
  * [`.giveMeCalendarForMonthYear(month, year) => Array`](api_docs/giveMeCalendarForMonthYear.md)

[codecov-badge]: https://img.shields.io/codecov/c/github/rantrix/calendator.svg?style=flat-square
[codecov-link]: https://codecov.io/github/rantrix/calendator
[github-watch-badge]: https://img.shields.io/github/watchers/rantrix/calendator.svg?style=social
[github-watch-link]: https://github.com/rantrix/calendator/watchers
[github-star-badge]: https://img.shields.io/github/stars/rantrix/calendator.svg?style=social
[github-star-link]: https://github.com/rantrix/calendator/stargazers
[npm-license-badge]: https://img.shields.io/npm/l/calendator.svg?style=flat-square
[npm-license-link]: https://github.com/rantrix/calendator/blob/master/LICENSE
[npm-version-badge]: https://img.shields.io/npm/v/calendator.svg?style=flat-square
[npm-version-link]: https://www.npmjs.com/package/calendator
[travis-badge]: https://img.shields.io/travis/rantrix/calendator.svg?style=flat-square
[travis-link]: https://travis-ci.org/rantrix/calendator
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/rantrix/calendator.svg?style=social
[twitter-link]: https://twitter.com/intent/tweet?text=Check%20out%20the%20Calendator!%20https://github.com/rantrix/calendator%20%F0%9F%91%8D
