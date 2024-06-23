import axios from "axios";
import { Job } from "types";
import { User } from "types/user";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export function authenticateUser(code: string) {
  return api.post<User>("/request_access_token", {}, { params: { code } });
}

export function getClients() {
  return api.get("/clients");
}

export function getJobs() {
  return api.get("/jobs");
}

export function getJob(id: string) {
  return api.get(`/jobs/${id}`);
}

export function patchJob(job: Job) {
  return api.patch(`/jobs/${job.id}`, job);
}

export function logout() {
  return api.get("/logout");
}

export default api;
