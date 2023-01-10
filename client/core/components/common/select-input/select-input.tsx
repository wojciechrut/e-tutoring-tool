import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import Select, {
  GroupBase,
  MultiValue,
  MultiValueGenericProps,
  SingleValue,
} from "react-select";
import clsx from "clsx";
import { ComponentType } from "react";
import styles from "./select-input.module.scss";

export type Option = {
  value: string | boolean;
  label: string;
};

const isMultiValue = (
  option: SingleValue<Option> | MultiValue<Option>
): option is MultiValue<Option> => {
  return Array.isArray(option);
};

type SelectInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: Array<Option>;
  isMulti?: boolean;
  placeholder?: string;
  registerOptions?: RegisterOptions<T>;
  label?: string;
  className?: string;
  errorMessage?: string;
  maxSelected?: number;
};

export const SelectInput = <T extends FieldValues>({
  control,
  name,
  options,
  isMulti = false,
  placeholder,
  registerOptions,
  label,
  className,
  maxSelected,
  errorMessage,
}: SelectInputProps<T>) => {
  const getOptionValues = (
    option: SingleValue<Option> | MultiValue<Option>
  ) => {
    if (isMultiValue(option)) {
      return option.map((o) => o.value);
    }
    return option ? option.value : null;
  };

  const getOptionCount = (option: SingleValue<Option> | MultiValue<Option>) => {
    if (isMultiValue(option)) {
      return option.length;
    }
    return option ? 1 : 0;
  };

  const multiValueContainer:
    | ComponentType<MultiValueGenericProps<Option, boolean, GroupBase<Option>>>
    | undefined = ({ selectProps, data }) => {
    const label = data.label;
    const selectedOptions = selectProps.value as MultiValue<Option>;
    const index = selectedOptions?.findIndex(
      (selected) => selected.label === label
    );
    const isLastSelected = index === selectedOptions.length - 1;
    const labelSuffix = isLastSelected ? ` (${selectedOptions.length})` : ", ";
    return <span>{`${label}${labelSuffix}`}</span>;
  };

  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={registerOptions}
        render={({ field: { onChange: controllerOnChange, ref } }) => (
          <>
            <Select
              id={name}
              instanceId={name}
              className={clsx(styles.input, className)}
              ref={ref}
              options={options}
              onChange={(option) => {
                controllerOnChange(getOptionValues(option));
              }}
              isMulti={isMulti}
              classNamePrefix={isMulti ? "react-select-multi" : "react-select"}
              placeholder={placeholder || "Select..."}
              autoFocus={false}
              closeMenuOnSelect={!isMulti}
              isSearchable={false}
              isClearable={true}
              isOptionDisabled={(_, selectValue) =>
                !!maxSelected && selectValue.length >= maxSelected
              }
              components={
                isMulti
                  ? {
                      MultiValueContainer: multiValueContainer,
                    }
                  : undefined
              }
            />
          </>
        )}
      />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
