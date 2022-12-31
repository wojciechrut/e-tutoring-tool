import { BaseSyntheticEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./note-creator.module.scss";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { Button } from "components/common/button";
import NoteService from "services/note";
import { dataURItoFile } from "hooks/useWhiteboard/fabric-helpers";

type NoteCreatorProps = {
  getCanvasAsImage: () => string | null;
  meetingId: string;
  subjects: Array<string>;
};

type FieldValues = { text: string };

export const NoteCreator: FC<NoteCreatorProps> = ({
  getCanvasAsImage,
  meetingId,
  subjects,
}) => {
  const [currentImageURI, setCurrentImageURI] = useState("");
  const [includeImage, setIncludeImage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  useEffect(() => {
    setCurrentImageURI(includeImage ? getCanvasAsImage() || "" : "");
  }, [includeImage]);

  const onSubmit = async (values: FieldValues, event?: BaseSyntheticEvent) => {
    event?.preventDefault();
    const { text } = values;
    const inputs = {
      text,
      meetingId,
      subjects,
      file: currentImageURI ? dataURItoFile(currentImageURI) : undefined,
    };
    const response = await NoteService.create(inputs);
    reset({ text: "" });
    console.log(response);
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
        <label className={styles.includeImageLabel} htmlFor="includeImage">
          Include whiteboard:
        </label>
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
    </div>
  );
};
