import { ModelId } from "../models/types/_id";
import Model, { Leaflet } from "../models/leaflet";
import { UserSelector } from "./user";
import { searchMatch } from "../utils/helpers/search";
import { leafletCategories } from "../utils/constants/leaflet-categories";

type Query = Partial<Omit<Leaflet, "user">> & {
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

const findAll = async (query: Query) => {
  const { levels, subjects, title, lookingFor, user } = query;
  const results = await Model.find(
    Object.assign(
      {
        subjects: { $in: subjects || /.*/ },
        levels: { $in: levels || /.*/ },
        lookingFor: lookingFor || /.*/,
      },
      user ? { user } : {}
    )
  )
    .populate(populator)
    .select(LeafletSelector.STANDARD);

  if (results && Array.isArray(results) && !!title) {
    return results.filter(({ title: resultTitle }) =>
      searchMatch(title, resultTitle)
    );
  }
  return results;
};

const getCategories = () => {
  return leafletCategories;
};

const create = async (query: Query) => {
  const result = await Model.create(query);
  return findOne(result._id);
};

export default { findAll, findOne, create, categories: getCategories };
