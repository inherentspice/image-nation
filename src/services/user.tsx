import axios from "axios";
import { AxiosResponse } from "axios";
import { UserData } from "../types/types";
const baseUrl = "/api/user";


const checkAuthentication = (): Promise<AxiosResponse<UserData>> => {
  return axios.get<UserData>(`${baseUrl}`);
}

const UserService = {
  checkAuthentication,
}

export default UserService;
