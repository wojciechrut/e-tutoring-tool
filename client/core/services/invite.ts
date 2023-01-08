import api from "./api";
import { AxiosResponse } from "axios";
import { InviteStatusResponseBody, MultipleInvitesResponseBody } from "@types";
import UserService from "services/user";

enum Paths {
  STATUS = "invite/status",
  SEND = "invite",
  SET_ACCEPTED = "invite/",
  RECEIVED = "invite/received",
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

const getReceived = async () => {
  UserService.setAuthFromStorage();
  const { data }: AxiosResponse<MultipleInvitesResponseBody> = await api.get(
    Paths.RECEIVED
  );
  return data;
};

const InviteService = { getStatus, send, setAccepted, getReceived };
export default InviteService;
