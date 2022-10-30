import FormData from "form-data";

export const createFormData = (values: { [key: string]: any }) => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, val]) => {
    if (val instanceof FileList) {
      Array.from(val).forEach((file) => formData.append(key, file));
    } else {
      formData.append(key, val);
    }
  });
  return formData;
};
