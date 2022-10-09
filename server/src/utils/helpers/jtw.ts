import jwt from 'jsonwebtoken';

const generate = (id: string): string => {
  return jwt.sign({ id }, process.env['JWT_SECRET'] as string, {
    expiresIn: '14d',
  });
};

const decode = (token: string) => {
  return jwt.verify(token, process.env['JWT_SECRET'] as string);
};

export default { generate, decode };
