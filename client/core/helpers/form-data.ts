import FormData from "form-data";

export const createFormData = (values: { [key: string]: any }) => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, val]) => formData.append(key, val));
  return formData;
};
