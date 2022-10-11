import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const id = (_id: Types.ObjectId) => {
  return _id.toString();
};

export const _id = (id: string | JwtPayload) => {
  return new Types.ObjectId(id as string);
};
