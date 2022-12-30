//get mine by meeting/subject
import { RequestHandler } from "express";
import {
  ErrorStatus,
  FileUploadResponseLocals,
  MeResponseLocals,
  NoteCreateRequestBody,
  NoteSearchRequestQuery,
  NoteSearchResponseBody,
  UploadedIdsResponseLocals,
} from "../@types";
import { createError } from "../utils/helpers/create-error";
import NoteRepository from "../repositories/note";
import MeetingRepository from "../repositories/meeting";

const getMine: RequestHandler<
  {},
  NoteSearchResponseBody,
  {},
  NoteSearchRequestQuery,
  MeResponseLocals
> = async (request, response, next) => {
  const { page, subject } = request.query;
  const { _id: owner } = response.locals;

  const notes = await NoteRepository.findAll(
    owner.toString(),
    parseInt(page, 10),
    subject
  );

  if (!notes) {
    next(createError(ErrorStatus.SERVER));
    return;
  }

  response.send(notes);
};

const create: RequestHandler<
  {},
  any,
  NoteCreateRequestBody,
  {},
  FileUploadResponseLocals & UploadedIdsResponseLocals
> = async (request, response, next) => {
  const { _id: owner, uploadedIds: files } = response.locals;
  const { text, meetingId } = request.body;

  const meeting = await MeetingRepository.findOne(meetingId);

  if (!text || !meeting) {
    next(
      createError(
        ErrorStatus.BAD_REQUEST,
        "Make sure to specify meeting id and note text."
      )
    );
    return;
  }

  const note = await NoteRepository.create({
    owner,
    image: files && files[0],
    text,
    meeting: meetingId,
    subjects: meeting.subjects,
  });

  if (!note) {
    next(
      createError(ErrorStatus.SERVER, "Error occurred while creating note.")
    );
    return;
  }

  response.send(note);
};

const NoteController = { getMine, create };
export default NoteController;
