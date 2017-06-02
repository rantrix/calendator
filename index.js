'use strict';

//  Copyright (c) 2017 Dexter Vu.
//  Licensed under the MIT License (MIT), see
//  https://github.com/rantrix/calendator

/* global define */

(function () {
  var EMPTY_CALENDAR = Object.freeze([]);

  var NUMBER_OF_DAYS_IN_A_WEEK = 7;

  var SUN = 0;
  var MON = 1;
  var TUE = 2;
  var WED = 3;
  var THU = 4;
  var FRI = 5;
  var SAT = 6;

  var WEEKDAYS = {
    SUN: SUN,
    MON: MON,
    TUE: TUE,
    WED: WED,
    THU: THU,
    FRI: FRI,
    SAT: SAT
  };
  Object.freeze(WEEKDAYS);

  var JAN = 0;
  var FEB = 1;
  var MAR = 2;
  var APR = 3;
  var MAY = 4;
  var JUN = 5;
  var JUL = 6;
  var AUG = 7;
  var SEP = 8;
  var OCT = 9;
  var NOV = 10;
  var DEC = 11;

  var MONTHS = {
    JAN: JAN,
    FEB: FEB,
    MAR: MAR,
    APR: APR,
    MAY: MAY,
    JUN: JUN,
    JUL: JUL,
    AUG: AUG,
    SEP: SEP,
    OCT: OCT,
    NOV: NOV,
    DEC: DEC
  };
  Object.freeze(MONTHS);

  /* istanbul ignore next */
  function isTypeOf(type, test) {
    if (typeof type !== 'string') return false;
    return typeof test === type;
  }

  function isNotTypeOf(type, test) {
    if (!isTypeOf('string', test)) return false;
    return !isTypeOf(type, test);
  }

  function isDate(test) {
    return test instanceof Date;
  }

  function isNotDate(test) {
    return !isDate(test);
  }

  function isInNumericWeekdayRange(numericWeekday) {
    return numericWeekday >= SUN && numericWeekday <= SAT;
  }

  function isInMonthRange(month) {
    return month >= JAN && month <= DEC;
  }

  function isNotInMonthRange(month) {
    return !isInMonthRange(month);
  }

  function createEmptyWeek() {
    return [null, null, null, null, null, null, null];
  }

  function Calendator(startWeekWithThisWeekday, dayCreationHandler) {
    this._startWeekday = isInNumericWeekdayRange(startWeekWithThisWeekday) ? startWeekWithThisWeekday : SUN;
    this._dayCreationHandler = isTypeOf('function', dayCreationHandler) ? dayCreationHandler : null;
    this._cachedCalendars = {};
  }

  Calendator.prototype.getMonths = function () {
    return MONTHS;
  }

  Calendator.prototype.getWeekdays = function () {
    return WEEKDAYS;
  }

  Calendator.prototype.giveMeCalendarForMonthYear = function (month, year) {
    var guardCases = isNotTypeOf('number', month) || isNotTypeOf('number', year) || isNotInMonthRange(month);
    if (guardCases) return EMPTY_CALENDAR;

    var cachedCalendar = this._getCachedCalendarForMonthYear(month, year);
    if (cachedCalendar) return cachedCalendar;

    var calendar = this._buildCalendarForMonthYear(month, year);
    this._cacheCalendar(month, year, calendar);

    return calendar;
  }

  Calendator.prototype.giveMeCalendarForDate = function (date) {
    if (isNotDate(date)) return EMPTY_CALENDAR;
    var month = date.getMonth();
    var year = date.getFullYear();
    var calendar = this.giveMeCalendarForMonthYear(month, year);
    return calendar;
  }

  Calendator.prototype._buildCalendarForMonthYear = function (month, year) {
    var dateForLastDayOfMonth = new Date(year, month + 1, 0);
    var dateForFirstDayOfMonth = new Date(year, month, 1);

    var weekdayOfFirstDayInMonth = dateForFirstDayOfMonth.getDay();
    var numberOfDaysInMonth = dateForLastDayOfMonth.getDate();

    var calendar = [];
    var currentDay = 1;
    var currentWeek = 1;
    var week = createEmptyWeek();
    var weekday = this._offsetByStartWeekday(weekdayOfFirstDayInMonth);

    while (currentDay <= numberOfDaysInMonth) {
      if (!this._dayCreationHandler) {
        week[weekday] = currentDay;
      } else {
        week[weekday] = this._dayCreationHandler(year, month, currentDay, weekday, currentWeek);
      }

      weekday++;
      currentDay++;

      var weekIsFull = Boolean(week[week.length - 1]);
      if (weekIsFull) {
        calendar.push(week);
        week = createEmptyWeek();
        weekday = SUN;
        currentWeek++;
      } else if (currentDay > numberOfDaysInMonth) {
        calendar.push(week);
      }
    }

    return calendar;
  }

  Calendator.prototype._cacheCalendar = function (month, year, calendarToBeCached) {
    var cachedYear = this._cachedCalendars[year];
    if (!cachedYear) {
      cachedYear = {};
      this._cachedCalendars[year] = cachedYear;
    }
    cachedYear[month] = calendarToBeCached;
  }

  Calendator.prototype._getCachedCalendarForMonthYear = function (month, year) {
    var cachedCalendars = this._cachedCalendars;
    var cachedYear = cachedCalendars[year];
    if (!cachedYear) return null;
    var cachedMonth = cachedYear[month];
    return cachedMonth ? cachedMonth : null;
  }

  Calendator.prototype._offsetByStartWeekday = function (weekday) {
    weekday -= this._startWeekday;
    if (weekday < 0) return (weekday + NUMBER_OF_DAYS_IN_A_WEEK);
    return weekday;
  }

  Calendator.SUN = SUN;
  Calendator.MON = MON;
  Calendator.TUE = TUE;
  Calendator.WED = WED;
  Calendator.THU = THU;
  Calendator.FRI = FRI;
  Calendator.SAT = SAT;
  Calendator.WEEKDAYS = WEEKDAYS;

  Calendator.JAN = JAN;
  Calendator.FEB = FEB;
  Calendator.MAR = MAR;
  Calendator.APR = APR;
  Calendator.MAY = MAY;
  Calendator.JUN = JUN;
  Calendator.JUL = JUL;
  Calendator.AUG = AUG;
  Calendator.SEP = SEP;
  Calendator.OCT = OCT;
  Calendator.NOV = NOV;
  Calendator.DEC = DEC;
  Calendator.MONTHS = MONTHS;

  Object.freeze(Calendator);

  /* istanbul ignore next */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calendator;
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define('Calendator', [], function () {
      return Calendator;
    });
  } else {
    if (!window.dv) window.dv = {};
    window.dv.Calendator = Calendator;
  }
})();
