import api from "./api";
import { AxiosResponse } from "axios";
import { InviteStatusResponseBody } from "@types";
import UserService from "services/user";

enum Paths {
  STATUS = "invite/status",
  SEND = "invite",
  SET_ACCEPTED = "invite/",
}

export type InviteStatus = InviteStatusResponseBody["status"];

const getStatus = async (userId: string) => {
  UserService.setAuthFromStorage();
  const { data }: AxiosResponse<InviteStatusResponseBody> = await api.get(
    Paths.STATUS,
    { params: { user: userId } }
  );

  return data;
};

const send = async (userId: string) => {
  UserService.setAuthFromStorage();
  const { data }: AxiosResponse<string> = await api.post(
    Paths.SEND,
    {},
    { params: { userId } }
  );

  return data;
};
const setAccepted = async (inviteId: string, accept: boolean) => {
  UserService.setAuthFromStorage();
  return api.post(Paths.SET_ACCEPTED + inviteId, {}, { params: { accept } });
};

const InviteService = { getStatus, send, setAccepted };
export default InviteService;
