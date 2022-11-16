import { ObjectId } from "mongoose";

export const parseId = <T extends { _id: ObjectId }>(entity: T) => {
  return { ...entity, _id: entity._id.toString() } as Omit<T, "_id"> & {
    _id: string;
  };
};
