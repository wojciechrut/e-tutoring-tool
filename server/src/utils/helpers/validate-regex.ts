import { validatedFields } from '../constants/validation';

const validateRegex = ([key, value]: [string, string]) => {
  const validationInfo = validatedFields[key];

  if (!validationInfo || validationInfo.pattern.test(value)) {
    return null;
  }

  return [validationInfo.message];
};

export const validateRegexFields = (fields: { [key: string]: string }) => {
  const errors = Object.entries(fields).reduce(
    (prev, curr) => prev.concat(validateRegex(curr) || []),
    [] as string[]
  );

  return errors.length > 0 ? errors : null;
};
