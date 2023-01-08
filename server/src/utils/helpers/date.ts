export const isMeetingDateCorrect = (date: Date | string) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const errorMargin = 1000 * 60 * 10; // 10 min;
  return parsedDate.getTime() + errorMargin > now.getTime();
};

export const getMeetingDateTag = (date: Date | string) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const errorMargin = 1000 * 60; //1 min
  if (parsedDate.getTime() > now.getTime()) {
    return "upcoming";
  }
  if (parsedDate.getTime() + errorMargin > yesterday.getTime()) {
    return "ongoing";
  }
  return "finished";
};

export const isMoreThanDayAgo = (date: Date | string) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const dayAgo = Date.now() - 1000 * 60 * 60 * 24;
  return parsedDate.getTime() - dayAgo > 1000 * 60 * 60 * 24;
};
