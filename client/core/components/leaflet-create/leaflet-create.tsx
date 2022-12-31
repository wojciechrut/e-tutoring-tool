import { FC, useEffect, useState } from "react";
import styles from "./leaflet-create.module.scss";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import LeafletService from "services/leaflet";
import { LeafletCategoriesResponseBody } from "@types";
import { Button } from "components/common/button";

type FieldValues = {
  levels: Array<string>;
  subjects: Array<string>;
  lookingFor: string;
  title: string;
  description: string;
};

export const LeafletCreate: FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [categories, setCategories] =
    useState<LeafletCategoriesResponseBody | null>();

  useEffect(() => {
    LeafletService.getCategories().then((categories) =>
      setCategories(categories)
    );
  }, []);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  const inputs: FormInputs<FieldValues> = [
    {
      name: "title",
      type: "text",
      htmlType: "text",
      label: "Title (3-30 characters)",
      placeholder: "e.g. Looking for math tutor for weekends",
      registerOptions: {
        pattern: {
          value: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\-\[\]\/()+!?. ]{3,30}$/,
          message:
            "Title can have 3-30 alphanumerical or some special characters.",
        },
      },
      noMargin: true,
    },
    {
      name: "description",
      type: "textarea",
      rows: 8,
      placeholder:
        "More detailed information about what you want to learn, what level you are at, your availability, etc.",
      label: "Description (20-500) characters",
      registerOptions: {
        pattern: {
          value: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\-\[\]\/()+!?. \n]{20,500}$/,
          message:
            "Description can have 20-500 alphanumerical or some special characters",
        },
      },
    },
    {
      type: "select",
      name: "lookingFor",
      options: categories?.lookingFor || [],
      label: "I'm looking for",
    },
    {
      type: "select",
      name: "subjects",
      options: categories?.subjects || [],
      label: "to study",
      isMulti: true,
    },
    {
      type: "select",
      name: "levels",
      options: categories?.levels || [],
      label: "at level",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Create new leaflet</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {renderFormInputs(inputs, register, errors, control)}
          <Button type={"submit"} styleType={"primary"}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
