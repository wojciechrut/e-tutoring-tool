import { FC, useEffect, useState } from "react";
import styles from "./meeting-creator.module.scss";
import { useAuth } from "contexts/auth";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { Button } from "components/common/button";
import LeafletService from "services/leaflet";
import MeetingService from "services/meeting";
import { parseError } from "helpers/parse-error";

type FieldValues = {
  description: string;
  invited: Array<string>;
  subjects: Array<string>;
  startsAt: Date;
};

export const MeetingCreator: FC = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Array<string>>([]);
  const [userMessage, setUserMessage] = useState<string | null>();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FieldValues>();

  useEffect(() => {
    LeafletService.getCategories().then(({ subjects }) =>
      setSubjects(subjects)
    );
  }, []);

  const onSubmit = (values: FieldValues) => {
    MeetingService.create({ ...values, startsAt: values.startsAt.toString() })
      .then(() => {
        reset({
          description: "",
          subjects: [],
          invited: [],
          startsAt: new Date(),
        });
        setUserMessage("Meeting created!");
      })
      .catch((error) => {
        setUserMessage(parseError(error)?.messages[0]);
      });
  };

  const inputs: FormInputs<FieldValues> = [
    {
      type: "select",
      name: "invited",
      options:
        user?.friends.map(({ _id, nickname }) => ({
          value: _id.toString(),
          label: nickname,
        })) || [],
      registerOptions: {
        required: { value: true, message: "Invite at least one person" },
      },
      label: "invite (maximum 3 people)",
      isMulti: true,
      maxSelected: 3,
    },
    {
      type: "select",
      name: "subjects",
      options: subjects,
      label: "pick subjects",
      registerOptions: {
        required: { value: true, message: "Select at least one subject" },
      },
      isMulti: true,
    },
    {
      type: "textarea",
      name: "description",
      label: "short description",
      registerOptions: {
        required: false,
        maxLength: {
          value: 125,
          message: "Too long description",
        },
      },
      rows: 3,
    },
    {
      type: "datetime",
      name: "startsAt",
      label: "pick a date",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>create new meeting</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {renderFormInputs(inputs, register, errors, control)}
        <Button type={"submit"}>Submit</Button>
      </form>
      {userMessage && <div className={styles.userMessage}>{userMessage}</div>}
    </div>
  );
};
