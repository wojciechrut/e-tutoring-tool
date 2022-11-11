import { PickRequiredOptional } from "./util";
import { User } from "../../models/user";

export type UserRegisterRequestBody = PickRequiredOptional<
  User,
  "email" | "password" | "nickname",
  "avatar"
>;

export type UserResponseBody = Omit<User, "password">;

export type MeResponseLocals = UserResponseBody & {
  token: string;
};

export type MeResponseBody = MeResponseLocals;

export type MultipleUsersResponseBody = Array<UserResponseBody>;

export type UserCredentials = Pick<User, "email" | "password">;
