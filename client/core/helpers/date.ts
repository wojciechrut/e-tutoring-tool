import { formatInTimeZone } from "date-fns-tz";

export const getLocalTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Warsaw";
};

export const printDatabaseDate = (dbDate: string) => {
  const localTimezone = getLocalTimezone();
  console.log(dbDate);
  return formatInTimeZone(dbDate, localTimezone, "yyyy-dd-MM");
};
