import { Client } from "./client";

export type Job = {
  id: string;
  jobNumber: number;
  title: string;
  startAt: string;
  endAt: string;
  client: Partial<Client>;
};
