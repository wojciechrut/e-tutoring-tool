import { BodyConstraints } from "./fields";

export enum Action {
  REGISTER_USER = "register-user",
  LOGIN_USER = "login-user",
  POST_LEAFLET = "post-leaflet",
  POST_MEETING = "post-meeting",
  POST_NOTE = "post-note",
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
  "post-meeting": {
    required: ["subjects", "invited", "startsAt"],
    enumValidated: ["subjects"],
    regexValidated: [],
  },
  "post-note": {
    required: ["text"],
    regexValidated: ["text"],
    enumValidated: [],
  },
};
