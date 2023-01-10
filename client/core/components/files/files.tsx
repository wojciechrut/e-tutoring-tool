import Spinner from "assets/spinner.svg";
import { FC, useEffect, useState } from "react";
import styles from "./files.module.scss";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import LeafletService from "services/leaflet";
import clsx from "clsx";
import FileService from "services/file";
import { DetailedMultipleFiles } from "@types";
import { FileList } from "components/file-list";

type FieldValues = {
  isFromMeeting: "true" | "false";
  subject?: string;
};

export const Files: FC = () => {
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useForm<FieldValues>();
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const isFromMeeting = watch("isFromMeeting");
  const subject = watch("subject");
  const [fetchedFiles, setFetchedFiles] = useState<DetailedMultipleFiles>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LeafletService.getCategories().then((categories) =>
      setSubjectOptions(categories.subjects)
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    FileService.getFiles({ subject, isFromMeeting }).then((files) => {
      setFetchedFiles(files);
      setLoading(false);
    });
  }, [subject, isFromMeeting]);

  const inputs: FormInputs<FieldValues> = [
    {
      type: "radio",
      name: "isFromMeeting",
      label: "",
      options: [
        {
          value: "true",
          label: "Meeting chats",
        },
        {
          value: "false",
          label: "Private chats",
        },
      ],
    },
    {
      type: "select",
      isMulti: false,
      name: "subject",
      label: "Meeting subject",
      options: subjectOptions,
    },
  ];

  const [finalInputs, setFinalInputs] = useState(
    renderFormInputs(inputs, register, errors, control)
  );

  useEffect(() => {
    const toRender = isFromMeeting === "true" ? inputs : [inputs[0]];
    setFinalInputs(renderFormInputs(toRender, register, errors, control));
  }, [isFromMeeting, subjectOptions]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Browse files from</h1>
        <form className={clsx(styles.form, loading && styles.formBlocked)}>
          {finalInputs}
        </form>
      </div>
      <div className={styles.filesContainer}>
        {loading || !fetchedFiles ? (
          <Spinner />
        ) : (
          <FileList files={fetchedFiles} />
        )}
      </div>
    </div>
  );
};
