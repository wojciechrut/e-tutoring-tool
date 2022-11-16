import { FC } from "react";
import styles from "./meeting-creator.module.scss";
import { useAuth } from "contexts/auth";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { Button } from "components/common/button";

type FieldValues = {
  level: string;
  description: string;
  invited: Array<string>;
  datetime: string;
};

export const MeetingCreator: FC = () => {
  const { user } = useAuth();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>();

  const onSubmit = (values: FieldValues) => {
    console.log(values);
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
      label: "invite (maximum 3 people)",
      isMulti: true,
      maxSelected: 3,
    },
    {
      type: "datetime",
      name: "datetime",
      label: "Pick date and time",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>create new meeting</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {renderFormInputs(inputs, register, errors, control)}
        <Button type={"submit"}>Submit</Button>
      </form>
    </div>
  );
};
