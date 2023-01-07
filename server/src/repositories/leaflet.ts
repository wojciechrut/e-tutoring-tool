import { ModelId } from "../models/types/_id";
import Model, { Leaflet } from "../models/leaflet";
import { UserSelector } from "./user";
import { parseForSearch } from "../utils/helpers/search";
import { leafletCategories } from "../utils/constants/leaflet-categories";

type Query = Partial<Omit<Leaflet, "user" | "parsedTitle">> & {
  user?: ModelId;
};

export enum LeafletSelector {
  STANDARD = "-updatedAt",
}

const populator = { path: "user", select: UserSelector.STANDARD };

const findOne = async (_id: ModelId): Promise<Leaflet | null> => {
  return Model.findOne({
    _id,
  })
    .populate(populator)
    .select(LeafletSelector.STANDARD);
};

const findAll = async (query: Query, page = 1) => {
  const { levels, subjects, title, lookingFor, user } = query;
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  return Model.paginate(
    Object.assign(
      {
        subjects: { $in: subjects || /.*/ },
        levels: { $in: levels || /.*/ },
        lookingFor: lookingFor || /.*/,
        parsedTitle: { $regex: new RegExp(parseForSearch(title)) },
        createdAt: { $gte: monthAgo },
      },
      user ? { user } : {}
    ),
    {
      select: LeafletSelector.STANDARD,
      populate: populator,
      lean: true,
      limit: 10,
      sort: { createdAt: -1 },
      page,
    }
  ).then(({ docs, hasNextPage, hasPrevPage, totalDocs, totalPages }) => ({
    leaflets: docs.map(({ id, ...rest }) => rest),
    hasNextPage,
    hasPrevPage,
    totalDocs,
    totalPages,
    page,
  }));
};

const getCategories = () => {
  return leafletCategories;
};

const create = async (query: Query) => {
  const result = await Model.create({
    ...query,
    parsedTitle: parseForSearch(query.title),
  });
  return findOne(result._id);
};

const deleteOne = async (id: string) => {
  return Model.deleteOne({ _id: id });
};

const updateOne = async (id: string, update: Query) => {
  return Model.findOneAndUpdate({ _id: id }, update, { new: true });
};

const LeafletRepository = {
  findAll,
  findOne,
  create,
  getCategories,
  deleteOne,
  updateOne,
};
export default LeafletRepository;
