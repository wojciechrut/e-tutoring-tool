export const staticSource = (responseObjectPath: string) => {
  const path = responseObjectPath.startsWith("/")
    ? responseObjectPath.substring(1)
    : responseObjectPath;
  return `http://localhost:5000/${path}`;
};
