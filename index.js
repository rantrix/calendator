'use strict';

const DAY_OF_WEEK = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];

// m = 1 = jan
// 1 <= m <= 12
// d = 0 = sun
const dayOfTheWeek = (y, m, d) => {
  if (m < 3) y -= 1;
  return (y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + DAY_OF_WEEK[m - 1] + d) % 7;
}

const isLeapYear = (y) => {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

// m = 1 = jan
const daysInMonth = (y, m) => {
  switch (m) {
    case 4:
    case 6:
    case 9:
    case 11: return 30;
    case 2: return isLeapYear(y) ? 29 : 28;
    default: return 31;
  }
}

// m = 0 = jan
const defaultDateCreator = (y, m, d) => new Date(y, m, d);

// cpuMonth = 0 = jan
// 1 <= date <= 31
const getCalendarMonth = (y, cpuMonth, opts = {}) => {
  const year = parseInt(y);
  if (isNaN(year)) throw new Error("Missing 'year'.")
  if (cpuMonth < 0 || cpuMonth > 11) throw new Error("Invalid 'cpuMonth', it must be: 0 <= cpuMonth <= 11");

  const { 
    dateCreator = defaultDateCreator,
    fillPreviousMonth = false,
    fillNextMonth = false,
  } = opts;

  let { startDay = 0 } = opts;
  startDay = Math.abs(startDay % 7);

  const humanMonth = cpuMonth + 1;
  const totalDaysInMonth = daysInMonth(year, humanMonth);
  const startDayOfMonth = dayOfTheWeek(year, humanMonth, 1);

  let prevMonthTotalDays = fillPreviousMonth ? (
    humanMonth - 1 === 0
      ? daysInMonth(year - 1, 12)
      : daysInMonth(year, cpuMonth)
  ) : null;
  let nextMonthStartDate = fillNextMonth ? 1 : null;

  const calendarMonth = [];
  let prevMonthTotalDaysToFill = (startDay < startDayOfMonth)
    ? 7 - (7 - startDayOfMonth) - startDay
    : 7 - (startDay - startDayOfMonth);
  prevMonthTotalDaysToFill = startDay === startDayOfMonth ? 0 : prevMonthTotalDaysToFill;

  const [prevYear, prevMonth] = (cpuMonth - 1 < 0)
    ? [year - 1, 11]
    : [year, cpuMonth - 1];
  while (prevMonthTotalDaysToFill > 0) {
    prevMonthTotalDaysToFill -= 1;
    if (prevMonthTotalDays === null) {
      calendarMonth[prevMonthTotalDaysToFill] = null;
    } else {
      calendarMonth[prevMonthTotalDaysToFill] = dateCreator(prevYear, prevMonth, prevMonthTotalDays);
      prevMonthTotalDays -= 1;
    }
  }

  let d = 1;
  while (d <= totalDaysInMonth) {
    calendarMonth[calendarMonth.length] = dateCreator(year, cpuMonth, d);
    d += 1;
  }

  const [nextYear, nextMonth] = (cpuMonth + 1 > 11)
    ? [year + 1, 0]
    : [year, cpuMonth + 1];
  while (calendarMonth.length % 7 !== 0) {
    if (nextMonthStartDate === null) {
      calendarMonth[calendarMonth.length] = null;
    } else {
      calendarMonth[calendarMonth.length] = dateCreator(nextYear, nextMonth, nextMonthStartDate);
      nextMonthStartDate += 1;
    }
  }

  return calendarMonth;
}

const sliceToWeeks = (calendarMonth) => {
  const slicedCalendarMonth = [];
  const numberOfWeeks = calendarMonth.length / 7

  let movingReader = 0;
  for (let i = 0; i < numberOfWeeks; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      week[j] = calendarMonth[movingReader];
      movingReader++;
    }
    slicedCalendarMonth[i] = week;
  }
  return slicedCalendarMonth;
}

const calendator = Object.freeze({ getCalendarMonth, sliceToWeeks });

/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = calendator;
} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
  define('calendator', [], () => calendator);
} else {
  if (!window.dvCalendator) { 
    window.dvCalendator = calendator;
  }
}