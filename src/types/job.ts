import { Client } from "./client";
import { TimeSheetEntry } from "./timesheetEntry";

export type Job = {
  id: string;
  jobNumber: number;
  instructions?: string;
  title: string;
  startAt: string;
  endAt: string;
  client: Partial<Client>;
  timeSheetEntries?: [TimeSheetEntry];
};
