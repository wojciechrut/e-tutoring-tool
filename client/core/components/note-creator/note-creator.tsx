import { BaseSyntheticEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./note-creator.module.scss";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { Button } from "components/common/button";
import NoteService from "services/note";
import { dataURItoFile } from "hooks/useWhiteboard/fabric-helpers";
import { parseError } from "helpers/parse-error";

type NoteCreatorProps = {
  getCanvasAsImage: () => string | null;
  meetingId: string;
  subjects: Array<string>;
};

type FieldValues = { text: string };

let notificationTimeout: NodeJS.Timeout;
export const NoteCreator: FC<NoteCreatorProps> = ({
  getCanvasAsImage,
  meetingId,
  subjects,
}) => {
  const [currentImageURI, setCurrentImageURI] = useState("");
  const [includeImage, setIncludeImage] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  useEffect(() => {
    setCurrentImageURI(includeImage ? getCanvasAsImage() || "" : "");
  }, [includeImage]);

  useEffect(() => {
    clearTimeout(notificationTimeout);
    if (error) {
      notificationTimeout = setTimeout(() => {
        setError("");
      }, 2000);
    }

    return () => clearTimeout(notificationTimeout);
  }, [error]);

  const onSubmit = async (values: FieldValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    const { text } = values;
    const inputs = {
      text,
      meetingId,
      subjects,
      file: currentImageURI ? dataURItoFile(currentImageURI) : undefined,
    };
    NoteService.create(inputs)
      .then(() => {
        setError("Note created!");
        reset({ text: "" });
      })
      .catch((error) => {
        setError(parseError(error)?.messages[0]);
      });
  };

  const inputs: FormInputs<FieldValues> = [
    {
      type: "textarea",
      name: "text",
      label: "",
      placeholder: "Type here...",
      registerOptions: {
        required: "Note cannot be empty",
      },
      rows: 4,
    },
  ];

  return (
    <div className={styles.container}>
      {includeImage && currentImageURI && (
        <Image
          src={currentImageURI}
          alt={"whiteboard image for note preview"}
          width={240}
          height={135}
        />
      )}
      <div className={styles.includeImage}>
        <label htmlFor="includeImage">Include whiteboard:</label>
        <input
          className={styles.includeImageCheckbox}
          id="includeImage"
          type="checkbox"
          onChange={(e) => setIncludeImage(e.target.checked)}
        />
        <button
          onClick={() => setCurrentImageURI(getCanvasAsImage() || "")}
          className={styles.button}
          disabled={!includeImage}
        >
          Refresh
        </button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {renderFormInputs(inputs, register, errors)}
        <Button type={"submit"} className={styles.submitButton}>
          create note
        </Button>
      </form>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
