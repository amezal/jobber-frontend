export type TimeSheetEntry = {
  endAt: string;
  startAt: string;
  finalDuration: number;
  user: {
    name: {
      full: string;
    };
  };
};
