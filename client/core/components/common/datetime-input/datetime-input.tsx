import styles from "./datetime-input.module.scss";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { useEffect, useState } from "react";
import { getLocale, stringifyDate } from "helpers/date";
import { isToday } from "date-fns";

type DatetimePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  registerOptions?: RegisterOptions<T>;
  label?: string;
  className?: string;
  errorMessage?: string;
};

export const DatetimeInput = <T extends FieldValues>({
  name,
  control,
  registerOptions,
  label,
  errorMessage,
}: DatetimePickerProps<T>) => {
  const [now, setNow] = useState(new Date());
  const [value, setValue] = useState<Date>(now);
  const [inputText, setInputText] = useState("Click to open calendar");

  const handleChange = (date: Date | null) => {
    setValue(date || new Date());
  };

  useEffect(() => {
    setInputText(stringifyDate(value, true));
  }, [value]);

  useEffect(() => {
    registerLocale("locale", getLocale());

    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 1000 * 30);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={now as PathValue<T, Path<T>>}
        rules={registerOptions}
        render={({ field: { onChange: controllerOnChange, ref } }) => (
          <DatePicker
            id={name}
            selected={new Date(value || "")}
            ref={ref}
            autoComplete="off"
            value={inputText}
            filterDate={(date) => {
              return isToday(date) || date.getTime() > now.getTime();
            }}
            filterTime={(date) => {
              return date.getTime() >= now.getTime() + 30;
            }}
            locale={"locale"}
            showTimeSelect
            timeIntervals={15}
            onChange={(changedValue) => {
              controllerOnChange(changedValue);
              handleChange(changedValue);
            }}
          />
        )}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
