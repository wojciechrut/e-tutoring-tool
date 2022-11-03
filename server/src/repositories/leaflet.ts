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

const findOne = async (_id: ModelId) => {
  return Model.findOne({
    _id,
  })
    .populate(populator)
    .select(LeafletSelector.STANDARD);
};

const findAll = async (query: Query, page = 1) => {
  const { levels, subjects, title, lookingFor, user } = query;
  return Model.paginate(
    Object.assign(
      {
        subjects: { $in: subjects || /.*/ },
        levels: { $in: levels || /.*/ },
        lookingFor: lookingFor || /.*/,
        parsedTitle: { $regex: new RegExp(parseForSearch(title)) },
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
  ).then(({ docs, hasNextPage, hasPrevPage }) => ({
    leaflets: docs.map(({ id, ...rest }) => rest),
    hasNextPage,
    hasPrevPage,
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

export default { findAll, findOne, create, getCategories };
