const parseForSearch = (phrase: string) =>
  phrase.replace(/ /g, "").toLowerCase();

export const searchMatch = (phrase: string, toMatch: string) => {
  parseForSearch(toMatch).includes(parseForSearch(phrase));
};
