import { Control, Controller, FieldValues, Path } from "react-hook-form";
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
  isMulti: boolean;
};

export const SelectInput = <T extends FieldValues>({
  control,
  name,
  options,
  isMulti = true,
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
      render={({ field: { onChange: controllerOnChange, ref } }) => (
        <>
          <Select
            ref={ref}
            options={options}
            onChange={(option) => {
              controllerOnChange(getOptionValues(option));
            }}
            isMulti={isMulti}
          />
        </>
      )}
    />
  );
};
