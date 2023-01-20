import {
  MeetingCreateRequestBody,
  MeetingSearchRequestQuery,
  MeetingSearchResponseBody,
  SingleMeetingResponseBody,
} from "@types";
import { AxiosResponse } from "axios";
import api from "services/api";
import UserService from "services/user";

enum Paths {
  CREATE = "meeting",
  GET_MINE = "meeting/mine",
  ACCESS_ONE = "meeting/access",
  FINISH = "meeting",
}

const create = async (requestBody: MeetingCreateRequestBody) => {
  const { data: meeting }: AxiosResponse<SingleMeetingResponseBody> =
    await api.post(Paths.CREATE, requestBody);
  return meeting;
};

const getMine = async ({ date }: MeetingSearchRequestQuery) => {
  const { data: meetings }: AxiosResponse<MeetingSearchResponseBody> =
    await api.get(Paths.GET_MINE, { params: { date } });
  return meetings;
};

const access = async (id: string) => {
  UserService.setAuthFromStorage();
  const { data: meeting }: AxiosResponse<SingleMeetingResponseBody> =
    await api.get(`${Paths.ACCESS_ONE}/${id}`);
  return meeting;
};

const finish = async (id: string) => {
  await api.patch(`${Paths.FINISH}/${id}`);
};

const MeetingService = { create, getMine, access, finish };
export default MeetingService;
