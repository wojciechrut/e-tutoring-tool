import { MeetingCreateRequestBody } from "@types";
import { AxiosResponse } from "axios";
import api from "services/api";

enum Paths {
  CREATE = "meeting",
}

const create = async (requestBody: MeetingCreateRequestBody) => {
  const { data: meeting }: AxiosResponse = await api.post(
    Paths.CREATE,
    requestBody
  );
  return meeting;
};

const MeetingService = { create };
export default MeetingService;
