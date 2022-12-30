//get mine by meeting/subject
import { RequestHandler } from "express";
import {
  ErrorStatus,
  FileUploadResponseLocals,
  NoteCreateRequestBody,
  UploadedIdsResponseLocals,
} from "../@types";
import { createError } from "../utils/helpers/create-error";
import NoteRepository from "../repositories/note";

const getMine = () => {};

const create: RequestHandler<
  {},
  any,
  NoteCreateRequestBody,
  {},
  FileUploadResponseLocals & UploadedIdsResponseLocals
> = async (request, response, next) => {
  const { _id: owner, uploadedIds: files } = response.locals;
  const { text, meetingId } = request.body;

  if (!text || !meetingId) {
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
