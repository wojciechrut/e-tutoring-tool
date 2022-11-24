import {
  MeetingCreateRequestBody,
  MeetingSearchRequestQuery,
  MeetingSearchResponseBody,
  SingleMeetingResponseBody,
} from "@types";
import { AxiosResponse } from "axios";
import api from "services/api";

enum Paths {
  CREATE = "meeting",
  GET_MINE = "meeting/mine",
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

const MeetingService = { create, getMine };
export default MeetingService;
