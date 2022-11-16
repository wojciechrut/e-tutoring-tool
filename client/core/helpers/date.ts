import { formatInTimeZone } from "date-fns-tz";
import { isToday, isYesterday } from "date-fns";
import pl from "date-fns/locale/pl";
import enUS from "date-fns/locale/en-US";

export const getLocalTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Warsaw";
};

export const stringifyDate = (date: string | Date, withTime = false) => {
  const localTimezone = getLocalTimezone();

  const prefix = isToday(new Date(date))
    ? "Today "
    : isYesterday(new Date(date))
    ? "Yesterday "
    : null;

  if (prefix) {
    return `${prefix}${formatInTimeZone(date, localTimezone, "HH:mm")}`;
  }

  if (withTime) {
    return formatInTimeZone(date, localTimezone, "yyyy-dd-MM HH:mm");
  }

  return formatInTimeZone(date, localTimezone, "yyyy-dd-MM");
};

export const getLocale = () => {
  return getLocalTimezone() === "Europe/Warsaw" ? pl : enUS;
};
