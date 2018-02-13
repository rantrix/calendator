'use strict';
/* eslint-disable no-shadow */

var Calendator = require('.');
var expect = require('chai').expect;

describe('Calendator', function () {
  var MONTHS = {
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
  };

  var WEEKDAYS = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6
  };

  var EMPTY_CALENDAR = [];
  var EMPTY_CACHED_CALENDARS = {};

  var subject = new Calendator();

  describe('Calendator(startWeekWithThisWeekday, dayCreationHandler)', function () {
    describe('startWeekWithThisWeekday', function () {
      it('defaults to SUN if startWeekWithThisWeekday is not present or not within weekday range', function () {
        var subject = new Calendator();
        expect(subject._startWeekday).to.equal(WEEKDAYS.SUN);
        subject = new Calendator(20);
        expect(subject._startWeekday).to.equal(WEEKDAYS.SUN);
        subject = new Calendator('a');
        expect(subject._startWeekday).to.equal(WEEKDAYS.SUN);
      });

      it('stores startWeekWithThisWeekday to this._startWeekday', function () {
        var subject = new Calendator(WEEKDAYS.THU);
        expect(subject._startWeekday).to.equal(WEEKDAYS.THU);
      });
    });

    describe('dayCreationHandler', function () {
      it('stores dayCreationHandler to this._dayCreationHandler if it is a function', function () {
        var dayCreationHandler = function () {};
        var subject = new Calendator(null, dayCreationHandler);
        expect(subject._dayCreationHandler).to.equal(dayCreationHandler);
      });

      it('sets defaltDayCreationHandler to this._dayCreationHandler if it is not a function', function () {
        var subject = new Calendator(null, 0);
        var year = 2018;
        var month = MONTHS.FEB;
        var currentDay = 10;
        // default behavior is to return the current day
        expect(subject._dayCreationHandler(year, month, currentDay)).to.equal(currentDay);
      });
    });

    it('creates an empty object for caching calendars', function () {
      expect(subject._cachedCalendars).to.eql(EMPTY_CACHED_CALENDARS);
    });
  });

  describe('.getMonths()', function () {
    it('returns an objects with all the months', function () {
      expect(subject.getMonths()).to.eql(MONTHS);
    });
  });

  describe('.getWeekdays()', function () {
    it('returns an objects with all the weekdays', function () {
      expect(subject.getWeekdays()).to.eql(WEEKDAYS);
    });
  });

  var year2017 = 2017;
  var may = MONTHS.MAY;
  var date = new Date(year2017, may, 1);
  var may2017Calendar = [
    [null, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, null, null, null]
  ];
  var may2017CalendarWithAprilAndJune = [
    [30, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 1, 2, 3]
  ];
  var may2017CalendarStartingWeekdayAsWednesday = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, null, null, null, null, null, null]
  ];
  var cachedCalendars = {
    2017: {
      4: may2017Calendar
    }
  };

  function dayCreationHandler(year, month, currentDay, weekday, currentWeek) {
    return {year: year, month: month, currentDay: currentDay, weekday: weekday, currentWeek: currentWeek};
  }
  var may2017CalendarModifiedByDayCreationHandler = [
    [
      null,
      {
        year: year2017,
        month: may,
        currentDay: 1,
        weekday: WEEKDAYS.MON,
        currentWeek: 1
      },
      {
        year: year2017,
        month: may,
        currentDay: 2,
        weekday: WEEKDAYS.TUE,
        currentWeek: 1
      },
      {
        year: year2017,
        month: may,
        currentDay: 3,
        weekday: WEEKDAYS.WED,
        currentWeek: 1
      },
      {
        year: year2017,
        month: may,
        currentDay: 4,
        weekday: WEEKDAYS.THU,
        currentWeek: 1
      },
      {
        year: year2017,
        month: may,
        currentDay: 5,
        weekday: WEEKDAYS.FRI,
        currentWeek: 1
      },
      {
        year: year2017,
        month: may,
        currentDay: 6,
        weekday: WEEKDAYS.SAT,
        currentWeek: 1
      }
    ],
    [
      {
        year: year2017,
        month: may,
        currentDay: 7,
        weekday: WEEKDAYS.SUN,
        currentWeek: 2
      },
      {
        year: year2017,
        month: may,
        currentDay: 8,
        weekday: WEEKDAYS.MON,
        currentWeek: 2
      },
      {
        year: year2017,
        month: may,
        currentDay: 9,
        weekday: WEEKDAYS.TUE,
        currentWeek: 2
      },
      {
        year: year2017,
        month: may,
        currentDay: 10,
        weekday: WEEKDAYS.WED,
        currentWeek: 2
      },
      {
        year: year2017,
        month: may,
        currentDay: 11,
        weekday: WEEKDAYS.THU,
        currentWeek: 2
      },
      {
        year: year2017,
        month: may,
        currentDay: 12,
        weekday: WEEKDAYS.FRI,
        currentWeek: 2
      },
      {
        year: year2017,
        month: may,
        currentDay: 13,
        weekday: WEEKDAYS.SAT,
        currentWeek: 2
      }
    ],
    [
      {
        year: year2017,
        month: may,
        currentDay: 14,
        weekday: WEEKDAYS.SUN,
        currentWeek: 3
      },
      {
        year: year2017,
        month: may,
        currentDay: 15,
        weekday: WEEKDAYS.MON,
        currentWeek: 3
      },
      {
        year: year2017,
        month: may,
        currentDay: 16,
        weekday: WEEKDAYS.TUE,
        currentWeek: 3
      },
      {
        year: year2017,
        month: may,
        currentDay: 17,
        weekday: WEEKDAYS.WED,
        currentWeek: 3
      },
      {
        year: year2017,
        month: may,
        currentDay: 18,
        weekday: WEEKDAYS.THU,
        currentWeek: 3
      },
      {
        year: year2017,
        month: may,
        currentDay: 19,
        weekday: WEEKDAYS.FRI,
        currentWeek: 3
      },
      {
        year: year2017,
        month: may,
        currentDay: 20,
        weekday: WEEKDAYS.SAT,
        currentWeek: 3
      }
    ],
    [
      {
        year: year2017,
        month: may,
        currentDay: 21,
        weekday: WEEKDAYS.SUN,
        currentWeek: 4
      },
      {
        year: year2017,
        month: may,
        currentDay: 22,
        weekday: WEEKDAYS.MON,
        currentWeek: 4
      },
      {
        year: year2017,
        month: may,
        currentDay: 23,
        weekday: WEEKDAYS.TUE,
        currentWeek: 4
      },
      {
        year: year2017,
        month: may,
        currentDay: 24,
        weekday: WEEKDAYS.WED,
        currentWeek: 4
      },
      {
        year: year2017,
        month: may,
        currentDay: 25,
        weekday: WEEKDAYS.THU,
        currentWeek: 4
      },
      {
        year: year2017,
        month: may,
        currentDay: 26,
        weekday: WEEKDAYS.FRI,
        currentWeek: 4
      },
      {
        year: year2017,
        month: may,
        currentDay: 27,
        weekday: WEEKDAYS.SAT,
        currentWeek: 4
      }
    ],
    [
      {
        year: year2017,
        month: may,
        currentDay: 28,
        weekday: WEEKDAYS.SUN,
        currentWeek: 5
      },
      {
        year: year2017,
        month: may,
        currentDay: 29,
        weekday: WEEKDAYS.MON,
        currentWeek: 5
      },
      {
        year: year2017,
        month: may,
        currentDay: 30,
        weekday: WEEKDAYS.TUE,
        currentWeek: 5
      },
      {
        year: year2017,
        month: may,
        currentDay: 31,
        weekday: WEEKDAYS.WED,
        currentWeek: 5
      },
      null,
      null,
      null
    ]
  ];

  describe('.getCalendarForMonthYear(month, year)', function () {
    it('is the exact same function as .giveMeCalendarForMonthYear', function () {
      expect(subject.getCalendarForMonthYear).to.eql(subject.giveMeCalendarForMonthYear);
    });
  });

  describe('.getCalendarForDate(date)', function () {
    it('is the exact same function as .giveMeCalendarForDate', function () {
      expect(subject.getCalendarForDate).to.eql(subject.giveMeCalendarForDate);
    });
  });

  describe('.giveMeCalendarForDate(date)', function () {
    it('returns an empty calendar if date is NOT an instance of Date', function () {
      expect(subject.giveMeCalendarForDate('a')).to.eql(EMPTY_CALENDAR);
      expect(subject.giveMeCalendarForDate(1)).to.eql(EMPTY_CALENDAR);
    });

    it('returns calendar for may 2017', function () {
      expect(subject.giveMeCalendarForDate(date)).to.deep.eql(may2017Calendar);
    });

    it('returns calendar for may 2017 with the start weekday as Wednesday', function () {
      var subject = new Calendator(WEEKDAYS.WED);
      expect(subject.giveMeCalendarForDate(date)).to.deep.eql(may2017CalendarStartingWeekdayAsWednesday);
    });
  });

  describe('.giveMeCalendarForMonthYear(month, year)', function () {
    it('returns an empty calendar if month and year are not valid', function () {
      expect(subject.giveMeCalendarForMonthYear('a', 'b')).to.eql(EMPTY_CALENDAR);
      expect(subject.giveMeCalendarForMonthYear(20, year2017)).to.eql(EMPTY_CALENDAR);
    });

    it('returns calendar for may 2017', function () {
      expect(subject.giveMeCalendarForMonthYear(may, year2017)).to.deep.eql(may2017Calendar);
    });

    it('returns calendar for may 2017 with the start weekday as Wednesday', function () {
      var subject = new Calendator(WEEKDAYS.WED);
      expect(subject.giveMeCalendarForMonthYear(may, year2017)).to.deep.eql(may2017CalendarStartingWeekdayAsWednesday);
    });

    it('returns custom calendar for may 2017 modified by dayCreationHandler', function () {
      var subject = new Calendator(WEEKDAYS.SUN, dayCreationHandler);
      expect(subject.giveMeCalendarForMonthYear(may, year2017)).to.deep.eql(may2017CalendarModifiedByDayCreationHandler);
    });
  });

  describe('._buildCalendarForMonthYear(month, year)', function () {
    it('creates a calendar for month and year', function () {
      expect(subject._buildCalendarForMonthYear(may, year2017)).to.deep.eql(may2017Calendar)

      subject = new Calendator(WEEKDAYS.SUN, dayCreationHandler);
      expect(subject._buildCalendarForMonthYear(may, year2017)).to.deep.eql(may2017CalendarModifiedByDayCreationHandler)
    });

    it("fills out the first week and last week of the month with previous and next month's date", function () {
      var subject = new Calendator(WEEKDAYS.SUN, null, true);
      expect(subject._buildCalendarForMonthYear(may, year2017)).to.deep.eql(may2017CalendarWithAprilAndJune)
    });

    it("fills out the first week and last week of the month with previous and next month's date using dayCreationHandler", function () {
      var subject = new Calendator(WEEKDAYS.SUN, dayCreationHandler, true);
      var expected = may2017CalendarModifiedByDayCreationHandler.slice();
      var expectedFirstWeek = expected[0].slice();
      expectedFirstWeek[0] = {
        year: year2017,
        month: may - 1,
        currentDay: may2017CalendarWithAprilAndJune[0][0],
        weekday: WEEKDAYS.SUN,
        currentWeek: 1
      };
      var expectedLastWeek = expected[expected.length - 1].slice();
      expectedLastWeek[4] = {
        year: year2017,
        month: may + 1,
        currentDay: 1,
        weekday: WEEKDAYS.THU,
        currentWeek: 5
      };
      expectedLastWeek[5] = {
        year: year2017,
        month: may + 1,
        currentDay: 2,
        weekday: WEEKDAYS.FRI,
        currentWeek: 5
      };
      expectedLastWeek[6] = {
        year: year2017,
        month: may + 1,
        currentDay: 3,
        weekday: WEEKDAYS.SAT,
        currentWeek: 5
      };

      expected[0] = expectedFirstWeek;
      expected[expected.length - 1 ] = expectedLastWeek;

      expect(subject._buildCalendarForMonthYear(may, year2017)).to.deep.eql(expected)
    });
  });

  describe('._cacheCalendar(month, year, calendarToBeCached)', function () {
    it('caches the calendar for month and year', function () {
      var subject = new Calendator();
      expect(subject._cachedCalendars).to.eql(EMPTY_CACHED_CALENDARS);
      subject._cacheCalendar(may, year2017, may2017Calendar);
      expect(subject._cachedCalendars).to.deep.eql(cachedCalendars);
      subject._cacheCalendar(may, year2017, may2017Calendar);
      expect(subject._cachedCalendars).to.deep.eql(cachedCalendars);
    });
  });

  describe('._getCachedCalendarForMonthYear(month, year)', function () {
    it('returns the cached calendar for month and year', function () {
      var subject = new Calendator();
      expect(subject._getCachedCalendarForMonthYear(may, year2017)).to.be.null;
      subject._cachedCalendars = {2017: {}};
      expect(subject._getCachedCalendarForMonthYear(may, year2017)).to.be.null;
      subject._cachedCalendars = cachedCalendars;
      expect(subject._getCachedCalendarForMonthYear(may, year2017)).to.deep.eql(may2017Calendar);
    });
  });

  describe('._offsetByStartWeekday', function () {
    it('offsets the weekday by this._startWeekday', function () {
      var subject = new Calendator(WEEKDAYS.WED);
      expect(subject._offsetByStartWeekday(WEEKDAYS.SUN)).to.equal(WEEKDAYS.THU);
      expect(subject._offsetByStartWeekday(WEEKDAYS.MON)).to.equal(WEEKDAYS.FRI);
      expect(subject._offsetByStartWeekday(WEEKDAYS.TUE)).to.equal(WEEKDAYS.SAT);
      expect(subject._offsetByStartWeekday(WEEKDAYS.WED)).to.equal(WEEKDAYS.SUN);
      expect(subject._offsetByStartWeekday(WEEKDAYS.THU)).to.equal(WEEKDAYS.MON);
      // I think we get the point...
    });
  });
});
