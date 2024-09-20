export interface WeekDaysDateListType  {
    day: number;
    month: number;
    isToday: boolean;
    dayName: string;
  };
  
  export interface WeekType  {
    dateDetails: WeekDaysDateListType[];
    monthName: string;
    year: number;
  };
  