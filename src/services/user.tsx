import axios from "axios";
import { AxiosResponse } from "axios";
import { LogOutData, UserData, UserDataPassed } from "../types/types";
const baseUrl = "/api/user";


const checkAuthentication = (): Promise<AxiosResponse<UserData>> => {
  return axios.get<UserData>(`${baseUrl}`);
}

const logIn = (userObject: UserDataPassed): Promise<AxiosResponse<UserData>> => {
  return axios.post<UserData>("/log-in", userObject);
}

const signUp = (userObject: UserDataPassed): Promise<AxiosResponse<UserData>> => {
  return axios.post<UserData>("sign-up", userObject);
}

const logOut = (): Promise<AxiosResponse<LogOutData>> => {
  return axios.get<LogOutData>("/log-out");
}
const UserService = {
  checkAuthentication,
  logIn,
  signUp,
  logOut,
}

export default UserService;
