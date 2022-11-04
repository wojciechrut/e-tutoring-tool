import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "components/common/button";
import styles from "./leaflet-search.module.scss";
import { LeafletCategoriesResponseBody } from "@types";
import LeafletService from "services/leaflet";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { parseError } from "helpers/parse-error";

type FieldValues = {
  levels: Array<string>;
  subjects: Array<string>;
  lookingFor: string;
  title: string;
};

export const LeafletSearch: FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [categories, setCategories] =
    useState<LeafletCategoriesResponseBody | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    LeafletService.getCategories().then((categories) =>
      setCategories(categories)
    );
  }, []);

  const onSubmit = (data: FieldValues) => {
    setLoading(true);
    LeafletService.search(data)
      .then((leaflets) => {
        setLoading(false);
        console.log(leaflets);
      })
      .catch((error) => {
        setError(parseError(error)?.messages[0]);
        setLoading(false);
      });
  };

  const inputs: FormInputs<FieldValues> = [
    {
      name: "title",
      type: "text",
      htmlType: "text",
      label: "Title phrase",
      placeholder: 'e.g. "sundays"',
      registerOptions: {
        maxLength: {
          value: 20,
          message: "Phrase too long",
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
    <div className={styles.container}>
      <h1 className={styles.heading}>Find someone to study with</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {renderFormInputs(inputs, register, errors, control)}
        <Button type={"submit"} loading={loading}>
          Submit
        </Button>
      </form>
      <div className={styles.serverError}>{error}</div>
    </div>
  );
};
