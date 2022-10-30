import {
  MeResponseBody,
  UserCredentials,
  UserRegisterRequestBody,
} from "@types";
import api, { getStoredToken, removeStoredToken, storeToken } from "./api";
import { AxiosResponse } from "axios";
import { createFormData } from "helpers/form-data";

export type UserData = MeResponseBody | null;

enum Paths {
  LOGIN = "user/login",
  REGISTER = "user/",
  ME = "user/me",
}

const setAuthFromStorage = () => {
  const token = getStoredToken();
  if (token) {
    api.setAuthToken(token);
    return;
  }
  api.removeAuthToken();
};

const login = async (credentials: UserCredentials) => {
  const { data: user }: AxiosResponse<UserData> = await api.post(
    Paths.LOGIN,
    credentials
  );
  if (user) {
    storeToken(user.token);
    return user;
  }
  removeStoredToken();
  return null;
};

const register = async (requestBody: UserRegisterRequestBody) => {
  const { data: user }: AxiosResponse<UserData> = await api.post(
    Paths.REGISTER,
    createFormData(requestBody)
  );
  if (user) {
    storeToken(user.token);
    return user;
  }
  removeStoredToken();
  return null;
};

const logout = () => {
  removeStoredToken();
  setAuthFromStorage();
};

const me = async () => {
  setAuthFromStorage();
  const { data: user }: AxiosResponse<UserData> = await api.get(Paths.ME);
  return user;
};

export default { me, login, setAuthFromStorage, logout, register };
