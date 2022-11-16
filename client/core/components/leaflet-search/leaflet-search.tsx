import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "components/common/button";
import styles from "./leaflet-search.module.scss";
import {
  LeafletCategoriesResponseBody,
  LeafletSearchResponseBody,
} from "@types";
import LeafletService from "services/leaflet";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { parseError } from "helpers/parse-error";
import { LeafletList } from "components/leaflet-list";

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
  const [resultMessage, setResultMessage] = useState<string | null>();
  const [result, setResult] = useState<LeafletSearchResponseBody>();
  const [query, setQuery] = useState<FieldValues | null>();

  useEffect(() => {
    LeafletService.getCategories().then((categories) =>
      setCategories(categories)
    );
  }, []);

  const fetchLeaflets = async ({
    page,
    ...query
  }: FieldValues & { page: number }) => {
    setLoading(true);
    LeafletService.search({ page: page.toString(10), ...query })
      .then((response) => {
        setLoading(false);
        setResult(response);
        setQuery(query);
        setResultMessage(`${response.totalDocs} total`);
      })
      .catch((error) => {
        setResultMessage(parseError(error)?.messages[0]);
        setLoading(false);
      });
  };

  const onSubmit = async (data: FieldValues) => {
    fetchLeaflets({ page: 1, ...data });
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
      noMargin: true,
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

  const canFetchNext = result?.hasNextPage && query;
  const canFetchPrev = result?.hasPrevPage && query;

  const fetchNextPage = canFetchNext
    ? () => fetchLeaflets({ page: result.page + 1, ...query })
    : undefined;

  const fetchPrevPage = canFetchPrev
    ? () => fetchLeaflets({ page: result.page - 1, ...query })
    : undefined;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Find someone to study with</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {renderFormInputs(inputs, register, errors, control)}
          <Button type={"submit"} loading={loading}>
            Submit
          </Button>
        </form>
        {result && (
          <div className={styles.pageInfo}>
            <div className={styles.pageInfoPrev}>
              <Button
                disabled={!canFetchPrev || loading}
                styleType={"link-like"}
                type={"button"}
                onClick={fetchPrevPage}
              >
                Previous
              </Button>
            </div>
            <span className={styles.pageInfoPage}>Page {result.page}</span>
            <div className={styles.pageInfoNext}>
              <Button
                disabled={!canFetchNext || loading}
                styleType={"link-like"}
                type={"button"}
                onClick={fetchNextPage}
              >
                Next
              </Button>
            </div>
            <span className={styles.pageInfoMessage}>{resultMessage}</span>
          </div>
        )}
      </div>
      {result && <LeafletList leaflets={result.leaflets} />}
    </div>
  );
};
