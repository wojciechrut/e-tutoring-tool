import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { TextInput } from "components/common/text-input";
import { FileInput } from "components/common/file-input";

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

export const renderFormInputs = <T extends FieldValues>(
  inputs: FormInputs<T>,
  register: UseFormRegister<T>,
  errors: FieldErrorsImpl<T>
) => {
  return inputs.map((input) => {
    if (isTextInput(input)) {
      return renderTextInput(input, register, errors);
    }
    if (isFileInput(input)) {
      return renderFileInput(input, register, errors);
    }
    console.log("render not implemented for this input type");
  });
};

const renderTextInput = <T extends FieldValues>(
  input: FormInputText<T>,
  register: UseFormRegister<T>,
  errors: FieldErrorsImpl<T>
) => {
  const { type, registerOptions, name, ...restInputProps } = input;
  const registerReturn = register(name, registerOptions);
  return (
    <TextInput
      key={`formInput-${name}`}
      register={registerReturn}
      {...restInputProps}
      errorMessage={errors[name]?.message?.toString()}
    />
  );
};

const renderFileInput = <T extends FieldValues>(
  input: FormInputFile<T>,
  register: UseFormRegister<T>,
  errors: FieldErrorsImpl<T>
) => {
  const { type, registerOptions, name, ...restInputProps } = input;
  const registerReturn = register(name, registerOptions);
  return (
    <FileInput
      key={`formInput-${name}`}
      register={registerReturn}
      {...restInputProps}
      errorMessage={errors[name]?.message?.toString()}
    />
  );
};
