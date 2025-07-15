import { apiGenerator } from "../helpers/Api.helper";
//baseURL
const BASEURL = "http://localhost:8080";

export const api = apiGenerator({ baseURL: BASEURL });

export const APIS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  logout: "/api/auth/logOut",
  users: "/api/users",
  channels: "/api/channels",
  getByUserId: "/api/users",
  getByChannelId: "/api/channel",
};
