import { Client } from "./client";

export type Job = {
  id: number;
  title: string;
  startAt: string;
  endAt: string;
  client: Client;
};
