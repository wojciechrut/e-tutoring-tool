export const isMeetingDateCorrect = (date: Date | string) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const errorMargin = 1000 * 60 * 10; // 10 min;
  return parsedDate.getTime() + errorMargin > now.getTime();
};
