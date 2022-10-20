export const parseForSearch = (phrase?: string) =>
  phrase ? phrase.replace(/ /g, "").toLowerCase() : "";

export const searchMatch = (phrase: string, toMatch: string) => {
  parseForSearch(toMatch).includes(parseForSearch(phrase));
};
