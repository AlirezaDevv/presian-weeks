export interface WeekDaysDateListType  {
    day: number;
    month: number;
    isToday: boolean;
    dayName: string;
  };
  
  export interface WeekType  {
    weekDetails: WeekDaysDateListType[];
    monthName: string;
    year: number;
  };
  