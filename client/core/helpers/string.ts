export const printArray = (array: Array<string>) => {
  return array.join(", ");
};

export const formatUserInputString = (string: string) => {
  const multipleSpaces = / {2,}/g;
  const multipleNewlines = /\n{2,}/g;
  return string.replace(multipleNewlines, "\n").replace(multipleSpaces, " ");
};

export const parseForSearch = (phrase?: string) =>
  phrase ? phrase.replace(/[ \n]/g, "").toLowerCase() : "";

export const searchMatch = (phrase: string, toMatch: string) => {
  return parseForSearch(toMatch).includes(parseForSearch(phrase));
};
