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

const extractFromHeader = (header?: string) => {
  if (header && header.startsWith('Bearer')) {
    return header.split(' ')[1];
  }

  return null;
};

const decodeFromHeader = (header: string) => {
  const extractedId = extractFromHeader(header);
  if (!extractedId) return null;
  return decode(extractedId);
};

export default { generate, decode, extractFromHeader, decodeFromHeader };
