import { WeekDaysDateListType, WeekType } from "./interfaces";

enum TransferDateEnum {
  front = "front",
  back = "back",
}

/**
 * Calculates the current week in the Jalali calendar, optionally adjusting by a number of weeks
 * and a direction. The Jalali calendar week starts on Saturday and ends on Friday.
 *
 * @param weeks (optional) The number of weeks to adjust the current week by (positive for future weeks, negative for past weeks). Defaults to 0 (current week).
 * @param direction (optional) The direction to adjust the week by. Defaults to `TransferDateEnum.front` (forward).
 * @returns An object containing details about the current or adjusted week, including the year, month name, and a list of objects representing each day of the week.
 */

const getCurrentWeek = (
  weeks?: number,
  direction?: TransferDateEnum
): WeekType => {
  const startDate = new Date("3/21/2015");
  const currentDate = transferDate({
    days: (weeks ?? 0) * 7,
    direction,
  });
  const numbertOfDays = getDaysBetweenTwoDates(startDate, currentDate);
  const numberOfWeeks = numbertOfDays / 7;
  if (Number.isInteger(numberOfWeeks)) {
    return getDatesStartOfWeek(currentDate);
  }

  return getDatesMiddleOfWeek(numbertOfDays, numberOfWeeks, currentDate);
};

const getDatesStartOfWeek = (currentDate: Date): WeekType => {
  let startOfWeekDate: Date = new Date();
  let endOfWeekDate: Date = new Date();

  startOfWeekDate = transferDate({
    days: 6,
    direction: TransferDateEnum.back,
    startDate: currentDate,
  });
  endOfWeekDate = currentDate;

  const dateList = getWeekDaysDateList(startOfWeekDate, endOfWeekDate);
  const weekYear = getDateYear(startOfWeekDate);
  const weekMonth = getPersianMonthOfWeek(startOfWeekDate);

  return {
    dateDetails: dateList,
    monthName: weekMonth,
    year: weekYear,
  };
};

const getDatesMiddleOfWeek = (
  numbertOfDays: number,
  numberOfWeeks: number,
  currentDate: Date
): WeekType => {
  let startOfWeekDate: Date = new Date();
  let endOfWeekDate: Date = new Date();

  const numberOfWeeksComplete = Math.ceil(numberOfWeeks);
  const numberOfDaysForCompleteWeeks = numberOfWeeksComplete * 7;
  const daysBetweenNowAndEndOfWeek =
    numberOfDaysForCompleteWeeks - numbertOfDays;
  endOfWeekDate = transferDate({
    days: daysBetweenNowAndEndOfWeek,
    direction: TransferDateEnum.front,
    startDate: currentDate,
  });
  startOfWeekDate = transferDate({
    startDate: endOfWeekDate,
    days: 6,
    direction: TransferDateEnum.back,
  });
  const dateList = getWeekDaysDateList(startOfWeekDate, endOfWeekDate);
  const weekYear = getDateYear(startOfWeekDate);
  const weekMonth = getPersianMonthOfWeek(startOfWeekDate);

  return {
    dateDetails: dateList,
    monthName: weekMonth,
    year: weekYear,
  };
};

const getDaysBetweenTwoDates = (dateOne: Date, dateTwo: Date) => {
  const MiliSeconds_PER_DAY = 1000 * 60 * 60 * 24;

  const d1 = Date.UTC(
    dateOne.getFullYear(),
    dateOne.getMonth(),
    dateOne.getDate()
  );
  const d2 = Date.UTC(
    dateTwo.getFullYear(),
    dateTwo.getMonth(),
    dateTwo.getDate()
  );

  const numbertOfDays = Math.floor((d2 - d1) / MiliSeconds_PER_DAY) + 1;

  return numbertOfDays;
};

type TransferDateType = {
  startDate?: Date;
  days: number;
  direction?: TransferDateEnum;
};

const transferDate = ({
  startDate,
  days,
  direction = TransferDateEnum.front,
}: TransferDateType) => {
  const originDate = startDate ? startDate : new Date();
  const TransferedDate = structuredClone(originDate);
  if (direction === TransferDateEnum.front) {
    TransferedDate.setDate(TransferedDate.getDate() + days);
  } else {
    TransferedDate.setDate(TransferedDate.getDate() - days);
  }

  return TransferedDate;
};

const getWeekDaysDateList = (
  startDate: Date,
  endDate: Date
): WeekDaysDateListType[] => {
  const dateList = [];
  const currentDate = new Date(startDate);
  let dateNumber = 0;
  while (currentDate <= endDate) {
    dateNumber++;
    const dateDetails = getDateDetails(currentDate);
    const dateObj = {
      day: dateDetails.day,
      month: dateDetails.month,
      isToday: isToday(currentDate),
      dayName: getPersianDayOfWeek(dateNumber),
    };

    dateList.push(dateObj);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList;
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const getPersianDayOfWeek = (dayNumber: number) => {
  const persianDays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];

  return persianDays[dayNumber - 1] || "Invalid day number";
};
type GetDateDetailsType = {
  month: number;
  day: number;
};

const getPersianMonthOfWeek = (date: Date) => {
  const persianMonth = +getPersianDate(date)[1];

  const persianMonths = [
    "فروردین", // 1
    "اردیبهشت", // 2
    "خرداد", // 3
    "تیر", // 4
    "مرداد", // 5
    "شهریور", // 6
    "مهر", // 7
    "آبان", // 8
    "آذر", // 9
    "دی", // 10
    "بهمن", // 11
    "اسفند", // 12
  ];

  return persianMonths[persianMonth - 1];
};

const getDateDetails = (date: Date): GetDateDetailsType => {
  const persinaDateArray = getPersianDate(date);

  return {
    month: parseInt(persinaDateArray[1]),
    day: parseInt(persinaDateArray[2]),
  };
};

const getDateYear = (date: Date): number => {
  const persinaDateArray = getPersianDate(date);

  return parseInt(persinaDateArray[0]);
};

const getPersianDate = (date: Date) => {
  const persinaDate = date.toLocaleDateString("fa-IR-u-nu-latn");
  const persinaDateArray = persinaDate.split("/");

  return persinaDateArray;
};

export { getCurrentWeek, TransferDateEnum };
