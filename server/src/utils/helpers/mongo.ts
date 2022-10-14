import { ModelId } from './../../models/types/_id';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const id = (_id: ModelId) => {
  if (typeof _id === 'string') return _id;
  return _id.toString();
};

export const _id = (id: ModelId | JwtPayload) => {
  if (id instanceof Types.ObjectId) return id;
  return new Types.ObjectId(id as string);
};
