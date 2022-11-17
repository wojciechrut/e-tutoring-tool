import { FieldValues, UseFormRegisterReturn } from "react-hook-form";
import styles from "./radio-box-input.module.scss";

export type Option = {
  value: string;
  label: string;
};

type RadioBoxInputProps<T extends FieldValues> = {
  register: UseFormRegisterReturn<string>;
  options: Array<Option>;
  defaultOptionIndex?: number;
  label?: string;
};

export const RadioBoxInput = <T extends FieldValues>({
  register,
  options,
  defaultOptionIndex = 0,
}: RadioBoxInputProps<T>) => {
  return (
    <div className={styles.container}>
      {options.map(({ value, label }, index) => {
        const checked = defaultOptionIndex === index;
        const id = `radio-field-${value}`;
        return (
          <div className={styles.inputGroup} key={id}>
            <input
              className={styles.input}
              type="radio"
              value={value}
              id={id}
              {...register}
              defaultChecked={checked}
            />
            <label className={styles.label} htmlFor={id}>
              {label}
            </label>
          </div>
        );
      })}
    </div>
  );
};
