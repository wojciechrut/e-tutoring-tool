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
  FRIENDS = "user/friends",
  RECOMMEND = "user/recommend",
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
  location.reload();
};

const me = async (withFriends = false) => {
  setAuthFromStorage();
  const { data: user }: AxiosResponse<UserData> = await api.get(Paths.ME, {
    params: {
      withFriends,
    },
  });
  return user;
};

const disfriend = async (userId: string) => {
  setAuthFromStorage();
  const { data }: AxiosResponse<string> = await api.patch(Paths.FRIENDS, {
    id: userId,
  });
  return data;
};

const recommend = async (userId: string, recommend: boolean) => {
  setAuthFromStorage();
  const { data }: AxiosResponse<string> = await api.patch(Paths.RECOMMEND, {
    id: userId,
    recommend,
  });
  return data;
};

const UserService = {
  me,
  login,
  setAuthFromStorage,
  logout,
  register,
  disfriend,
  recommend,
};
export default UserService;
