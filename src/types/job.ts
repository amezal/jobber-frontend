import { Client } from "./client";
import { TimeSheetEntry } from "./timesheetEntry";

export type Job = {
  id: string;
  jobNumber: number;
  title: string;
  startAt: string;
  endAt: string;
  client: Partial<Client>;
  timeSheetEntries?: [TimeSheetEntry];
};
