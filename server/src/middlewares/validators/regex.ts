import { createError } from './../../utils/helpers/create-error';
import { RequestHandler } from 'express';
import { validateRegexFields } from '../../utils/helpers/validate-regex';

const validate: RequestHandler = (request, _response, next) => {
  const regexErrors = validateRegexFields(request.body);
  console.log(regexErrors);

  if (regexErrors) throw createError(400, regexErrors);

  next();
};

export default { validate };
