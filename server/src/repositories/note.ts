import Model from "../models/note";
import { UserSelector } from "./user";
import { ModelId } from "../models/types/_id";

const populator: Parameters<typeof Model.populate>[0] = [
  {
    path: "owner",
    select: UserSelector.STANDARD,
  },
  {
    path: "image",
  },
];

type Query = {
  owner: ModelId;
  image?: ModelId;
  text: string;
  meeting: ModelId;
  subjects: Array<string>;
};

const create = (query: Query) => {
  return Model.create(query);
};

const getByMeeting = (userId: string, meetingId: string) => {
  return Model.find({ owner: userId, meeting: meetingId }).populate(populator);
};

const findAll = (userId: string, page = 1, subject?: string) => {
  const subjectArray = [subject];
  return Model.paginate(
    Object.assign({
      owner: userId,
      subjects: { $in: subject ? subjectArray : /.*/ },
    }),
    {
      populate: populator,
      lean: true,
      limit: 10,
      sort: { createdAt: -1 },
      page,
    }
  ).then(({ docs, hasNextPage, hasPrevPage, totalDocs, totalPages }) => ({
    notes: docs.map(({ id, ...rest }) => rest),
    hasNextPage,
    hasPrevPage,
    totalDocs,
    totalPages,
    page,
  }));
};

const NoteRepository = { create, getByMeeting, findAll };
export default NoteRepository;
