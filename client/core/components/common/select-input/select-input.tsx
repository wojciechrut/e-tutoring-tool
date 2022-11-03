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

export type Option = {
  value: string;
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

  const multiValueContainer:
    | ComponentType<MultiValueGenericProps<Option, boolean, GroupBase<Option>>>
    | undefined = ({ selectProps, data }) => {
    const label = data.label;
    const selectedOptions = selectProps.value as MultiValue<Option>;
    const index = selectedOptions?.findIndex(
      (selected) => selected.label === label
    );
    const isLastSelected = index === selectedOptions.length - 1;
    console.log(index, selectedOptions.length - 1);
    const labelSuffix = isLastSelected ? ` (${selectedOptions.length})` : ", ";
    return <>{`${label}${labelSuffix}`}</>;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={registerOptions}
      render={({ field: { onChange: controllerOnChange, ref } }) => (
        <>
          <Select
            id={name}
            className={clsx("react-select", className)}
            ref={ref}
            options={options}
            onChange={(option) => {
              controllerOnChange(getOptionValues(option));
            }}
            isMulti={isMulti}
            classNamePrefix={"react-select"}
            placeholder={placeholder || "Select..."}
            autoFocus={false}
            closeMenuOnSelect={!isMulti}
            isSearchable={false}
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
  );
};
