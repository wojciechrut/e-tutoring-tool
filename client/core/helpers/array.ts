export const haveCommonElement = <T>(array1: Array<T>, array2: Array<T>) => {
  return array1.some((element) => array2.includes(element));
};
