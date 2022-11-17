import { MeetingSearchResponseBody } from "@types";
import styles from "./meeting-search.module.scss";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";

type MeetingSearchProps = {
  setMeetings: (meetings: MeetingSearchResponseBody) => void;
};

type FieldValues = {
  date: "ongoing" | "upcoming" | "past";
};

export const MeetingSearch: FC<MeetingSearchProps> = ({ setMeetings }) => {
  //todo - fetch all organiser/subjects combo to populate selects, if not eny dont render form
  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>();

  const inputs: FormInputs<FieldValues> = [
    {
      type: "radio",
      name: "date",
      label: "",
      options: [
        {
          value: "ongoing",
          label: "Ongoing",
        },
        {
          value: "upcoming",
          label: "Upcoming",
        },
        {
          value: "finished",
          label: "Finished",
        },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <form>{renderFormInputs(inputs, register, errors)}</form>
    </div>
  );
};
