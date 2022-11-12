import { formatInTimeZone } from "date-fns-tz";
import { isToday, isYesterday } from "date-fns";

export const getLocalTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Warsaw";
};

export const printDatabaseDate = (dbDate: string) => {
  const localTimezone = getLocalTimezone();

  const prefix = isToday(new Date(dbDate))
    ? "Today "
    : isYesterday(new Date(dbDate))
    ? "Yesterday "
    : null;

  if (prefix) {
    return `${prefix} ${formatInTimeZone(dbDate, localTimezone, "HH:mm")}`;
  }
  return formatInTimeZone(dbDate, localTimezone, "yyyy-dd-MM");
};
