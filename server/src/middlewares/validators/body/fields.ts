import { leafletCategories } from "../../../utils/constants/leaflet-categories";

export type ValidatedBodyField =
  | "nickname"
  | "email"
  | "password"
  | "lookingFor"
  | "title"
  | "description"
  | "subjects"
  | "levels";

export type BodyConstraints = {
  required: Array<ValidatedBodyField>;
  regexValidated: Array<keyof typeof bodyFieldRegex>;
  enumValidated: Array<keyof typeof bodyFieldEnum>;
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
    message: "Nickname should have 5-14 alphanumeric characters.",
  },
  password: {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ!@#$%^&*()\d]{8,25}$/,
    message: "Password too weak.",
  },
  email: {
    pattern: /^\S+@\S+\.\S+$/,
    message: "Invalid email address.",
  },
  title: {
    pattern: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\-\[\]\/()+!?. ]{3,30}$/,
    message: "Title can have 3-30 alphanumerical or some special characters",
  },
  description: {
    pattern: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\-\[\]\/()+!?. ]{20,500}$/,
    message:
      "Description can have 20-500 alphanumerical or some special characters",
  },
};

export const bodyFieldEnum: Partial<Record<ValidatedBodyField, Array<string>>> =
  {
    lookingFor: leafletCategories.lookingFor,
    subjects: leafletCategories.subjects,
    levels: leafletCategories.levels,
  };
