import { bodyFieldRegex } from './fields';
import { createError } from '../../../utils/helpers/create-error';
import { RequestHandler } from 'express';
import { Action, actionConstraints } from './actions';
import { ErrorStatus } from '../../../@types';

const validateRequired = (action: Action, body: { [key: string]: any }) => {
  const messages: Array<string> = [];
  const { required } = actionConstraints[action];

  required.forEach((fieldName) => {
    if (!body[fieldName]) {
      messages.push(`Required body field missing: ${fieldName}`);
    }
  });

  return messages.length > 0 ? messages : null;
};

const validateRegex = (action: Action, body: { [key: string]: any }) => {
  const messages: Array<string> = [];
  const { regexValidated } = actionConstraints[action];

  regexValidated.forEach((fieldName) => {
    const validationInfo = bodyFieldRegex[fieldName];
    if (validationInfo && !validationInfo.pattern.test(body[fieldName])) {
      messages.push(validationInfo.message);
    }
  });

  return messages.length > 0 ? messages : null;
};

export const bodyValidator = (action: Action) => {
  const validator: RequestHandler = (request, _response, next) => {
    try {
      const { body } = request;

      const requiredErrors = validateRequired(action, body);
      if (requiredErrors) {
        next(createError(ErrorStatus.BAD_REQUEST, requiredErrors));
      }

      const regexErrors = validateRegex(action, body);
      if (regexErrors) {
        next(createError(ErrorStatus.BAD_REQUEST, regexErrors));
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  return validator;
};
