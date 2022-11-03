import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import Select, { MultiValue, SingleValue } from "react-select";

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

  return (
    <Controller
      name={name}
      control={control}
      rules={registerOptions}
      render={({ field: { onChange: controllerOnChange, ref } }) => (
        <>
          <Select
            className={className}
            ref={ref}
            options={options}
            onChange={(option) => {
              controllerOnChange(getOptionValues(option));
            }}
            isMulti={isMulti}
            classNamePrefix={"react-select"}
            placeholder={placeholder || "Select..."}
          />
        </>
      )}
    />
  );
};
