import {
  Control,
  FieldErrors,
  FieldErrorsImpl,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { TextInput } from "components/common/text-input";
import { FileInput } from "components/common/file-input";
import { Option, SelectInput } from "components/common/select-input";

type FormInputCommon<T extends FieldValues> = {
  name: Path<T>;
  registerOptions?: RegisterOptions<T>;
  label: string;
  className?: string;
};

type FormInputText<T extends FieldValues> = {
  type: "text";
  htmlType: "text" | "email" | "password";
  placeholder?: string;
} & FormInputCommon<T>;

type FormInputSelect<T extends FieldValues> = {
  type: "select";
  isMulti?: boolean;
  placeholder?: string;
  options: Array<Option> | Array<string>;
} & FormInputCommon<T>;

type FormInputFile<T extends FieldValues> = {
  type: "file";
  multiple: boolean;
  accept: "all" | "image" | "document";
} & FormInputCommon<T>;

type FormInput<T extends FieldValues> =
  | FormInputText<T>
  | FormInputSelect<T>
  | FormInputFile<T>;

export type FormInputs<T extends FieldValues> = Array<FormInput<T>>;

const isTextInput = <T extends FieldValues>(
  input: FormInput<T>
): input is FormInputText<T> => {
  return input.type === "text";
};

const isFileInput = <T extends FieldValues>(
  input: FormInput<T>
): input is FormInputFile<T> => {
  return input.type === "file";
};

const isSelectInput = <T extends FieldValues>(
  input: FormInput<T>
): input is FormInputFile<T> => {
  return input.type === "select";
};

export const renderFormInputs = <T extends FieldValues>(
  inputs: FormInputs<T>,
  register: UseFormRegister<T>,
  errors: FieldErrorsImpl<T> | FieldErrors<T>,
  control?: Control<T>
) => {
  return inputs.map((input) => {
    if (isTextInput(input)) {
      return renderTextInput(input, register, errors);
    }
    if (isFileInput(input)) {
      return renderFileInput(input, register, errors);
    }
    if (isSelectInput(input) && control) {
      return renderSelectInput(input, control, errors);
    }
    console.log("render not implemented for this input type");
  });
};

const renderTextInput = <T extends FieldValues>(
  input: FormInputText<T>,
  register: UseFormRegister<T>,
  errors: FieldErrorsImpl<T> | FieldErrors<T>
) => {
  const { type, registerOptions, name, ...restInputProps } = input;
  const registerReturn = register(name, registerOptions);
  return (
    <TextInput
      key={`formInput-${name}`}
      register={registerReturn}
      errorMessage={errors[name]?.message?.toString()}
      {...restInputProps}
    />
  );
};

const renderFileInput = <T extends FieldValues>(
  input: FormInputFile<T>,
  register: UseFormRegister<T>,
  errors: FieldErrorsImpl<T> | FieldErrors<T>
) => {
  const { type, registerOptions, name, ...restInputProps } = input;
  const registerReturn = register(name, registerOptions);
  return (
    <FileInput
      key={`formInput-${name}`}
      register={registerReturn}
      errorMessage={errors[name]?.message?.toString()}
      {...restInputProps}
    />
  );
};

const isStringOptions = (
  options: FormInputSelect<any>["options"]
): options is Array<string> => {
  return typeof options[0] === "string";
};

const renderSelectInput = <T extends FieldValues>(
  input: FormInputSelect<T>,
  control: Control<T>,
  errors: FieldErrorsImpl<T> | FieldErrors<T>
) => {
  const { type, name, options, ...restInputProps } = input;
  let finalOptions;
  if (isStringOptions(options)) {
    finalOptions = options.map((option) => ({
      value: option,
      label: option,
    })) as Option[];
  } else {
    finalOptions = options as Option[];
  }
  return (
    <SelectInput
      key={`formInput-${name}`}
      name={name}
      options={finalOptions || options}
      control={control}
      errorMessage={errors[name]?.message?.toString()}
      {...restInputProps}
    />
  );
};
