import Axios, { AxiosInstance } from "axios";

const urls = {
  development: "http://localhost:5000/api",
  production: "http://localhost:5000/api",
  test: "http://localhost:5000/api",
};

type CustomAxiosInstance = AxiosInstance & {
  setAuthToken: (token: string) => void;
  removeAuthToken: () => void;
};

const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
}) as CustomAxiosInstance;

api.setAuthToken = function (token) {
  this.defaults.headers.common.Authorization = `Bearer ${token}`;
};

api.removeAuthToken = function () {
  delete this.defaults.headers.common.Authorization;
};

export const storeToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getStoredToken = () => {
  return localStorage.getItem("token");
};

export const removeStoredToken = () => {
  return localStorage.removeItem("token");
};

export default api;
