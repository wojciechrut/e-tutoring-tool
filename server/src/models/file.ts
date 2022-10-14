import { commonSchemaOptions } from './config/common-config';
import { Types, Schema, model } from 'mongoose';

export interface File {
  _id: Types.ObjectId;
  type: 'image' | 'document';
  path: string;
}

const fileSchema = new Schema<File>(
  {
    path: { type: String, required: true },
    type: { type: String, enum: ['image', 'document'], required: true },
  },
  commonSchemaOptions
);

const Model = model('File', fileSchema);

export default Model;
