import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

const generate = (id: string | Types.ObjectId): string => {
  return jwt.sign({ id }, process.env['JWT_SECRET'] as string, {
    expiresIn: '14d',
  });
};

const decode = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env['JWT_SECRET'] as string);
    return !decoded ? null : typeof decoded === 'string' ? decoded : decoded.id;
  } catch {
    return null;
  }
};

export default { generate, decode };
