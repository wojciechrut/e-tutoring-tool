import { commonSchemaOptions } from './config/common-config';
import { Schema, model, Types } from 'mongoose';
import { User } from './user';

export interface Invite {
  _id: Types.ObjectId;
  sender: User;
  receiver: User;
  active?: boolean;
}

const inviteSchema = new Schema<Invite>(
  {
    sender: { type: Types.ObjectId, required: true },
    receiver: { type: Types.ObjectId, required: true },
    active: { type: Boolean, default: true },
  },
  commonSchemaOptions
);

const Model = model('Invite', inviteSchema);

export default Model;
