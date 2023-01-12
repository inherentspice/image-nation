import axios from "axios";
import { AxiosResponse } from "axios";
import { UserData, UserDataPassed } from "../types/types";
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

const UserService = {
  checkAuthentication,
  logIn,
  signUp,
}

export default UserService;
