export type ValidatedBodyField = 'nickname' | 'email' | 'password';

export type BodyConstraints = {
  required: Array<ValidatedBodyField>;
  regexValidated: Array<keyof typeof bodyFieldRegex>;
};

type RegexPatterMessage = {
  pattern: RegExp;
  message: string;
};

export const bodyFieldRegex: Partial<
  Record<ValidatedBodyField, RegexPatterMessage>
> = {
  nickname: {
    pattern: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{5,14}$/,
    message: 'Nickname should have 5-14 alphanumeric characters.',
  },
  password: {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ!@#$%^&*()\d]{8,25}$/,
    message: 'Password too weak.',
  },
  email: {
    pattern: /^\S+@\S+\.\S+$/,
    message: 'Invalid email address.',
  },
};

export const validateFieldRegex = ([key, value]: [
  ValidatedBodyField,
  string
]) => {
  const validationInfo = bodyFieldRegex[key];

  if (!validationInfo || validationInfo.pattern.test(value)) {
    return null;
  }

  return validationInfo.message;
};
