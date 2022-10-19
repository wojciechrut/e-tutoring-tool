import { BodyConstraints } from "./fields";

export enum Action {
  REGISTER_USER = "register-user",
  LOGIN_USER = "login-user",
  POST_LEAFLET = "post-leaflet",
}

export const actionConstraints: Record<Action, BodyConstraints> = {
  "register-user": {
    required: ["email", "password", "nickname"],
    regexValidated: ["email", "password", "nickname"],
    enumValidated: [],
  },
  "login-user": {
    required: ["email", "password"],
    regexValidated: [],
    enumValidated: [],
  },
  "post-leaflet": {
    required: ["title", "description", "levels", "subjects", "lookingFor"],
    regexValidated: ["title", "description"],
    enumValidated: ["lookingFor", "levels", "subjects"],
  },
};
