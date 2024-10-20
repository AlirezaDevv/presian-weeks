### Persian Weeks Library

![logo](./l3.webp)

This package, written in TypeScript, provides convenient functions for retrieving week data in the Persian Jalali calendar.

##### Key Features:

- Current Week Details: Get information about the current week, including day names, dates, and whether a day is today.
  <br>
- Optional Week Adjustments: Adjust the returned week data by specifying a number of weeks to go forward or backward.
  Customization with TransferDateEnum: Use the provided TransferDateEnum to indicate the direction of week adjustment (front or back).
  <br>

#### How To Use ?

<br>

##### Install

```bash
npm install persian-weeks
```

##### Usage

```ts
import { getPersianWeek , TransferDateEnum } from "persian-weeks";

const currentWeekData = getPersianWeek();

console.log(currentWeekData.weekDetails); // Array of day objects
console.log(currentWeekData.monthName); // String representing the month name in Persian
console.log(currentWeekData.year); // Integer representing the year


--------------

// Move between weeks

const twoWeeksLaterData = getPersianWeek(2 , TransferDateEnum.Front ); // Gives data of the two weeks later

const threetWeesAgoData = getPersianWeek(3 , TransferDateEnum.Back ); // Gives data of the three weeks ago



```

<br>

##### Example Data Return

```json
{
  "weekDetails": [
    {
      "day": 28,
      "month": 7,
      "isToday": true,
      "dayName": "شنبه"
    },
    {
      "day": 29,
      "month": 7,
      "isToday": false,
      "dayName": "یکشنبه"
    },
    {
      "day": 30,
      "month": 7,
      "isToday": false,
      "dayName": "دوشنبه"
    },
    {
      "day": 1,
      "month": 8,
      "isToday": false,
      "dayName": "سه‌شنبه"
    },
    {
      "day": 2,
      "month": 8,
      "isToday": false,
      "dayName": "چهارشنبه"
    },
    {
      "day": 3,
      "month": 8,
      "isToday": false,
      "dayName": "پنج‌شنبه"
    },
    {
      "day": 4,
      "month": 8,
      "isToday": false,
      "dayName": "جمعه"
    }
  ],
  "monthName": "مهر",
  "year": 1403
}
```
