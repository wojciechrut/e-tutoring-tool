import { MeetingSearchResponseBody } from "@types";
import styles from "./meeting-search.module.scss";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import MeetingService from "services/meeting";
import { haveCommonElement } from "helpers/array";

type MeetingSearchProps = {
  setMeetings: (meetings: MeetingSearchResponseBody) => void;
};

type FieldValues = {
  date: "ongoing" | "upcoming" | "finished";
  subject: string;
};

export const MeetingSearch: FC<MeetingSearchProps> = ({ setMeetings }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    control,
  } = useForm<FieldValues>();
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [foundMeetings, setFoundMeetings] = useState<MeetingSearchResponseBody>(
    []
  );
  const [filteredMeetings, setFilteredMeetings] =
    useState<MeetingSearchResponseBody>([]);
  const date = watch("date");
  const subject = watch("subject");

  useEffect(() => {
    MeetingService.getMine({ date }).then((meetings) => {
      setFoundMeetings(meetings);
      const subjects = new Set(
        meetings.reduce(
          (prev, curr) => [...prev, ...curr.subjects],
          [] as Array<string>
        )
      );
      setSubjectOptions(Array.from(subjects));
    });
  }, [date]);

  useEffect(() => {
    setFilteredMeetings(
      subject
        ? foundMeetings.filter((meeting) =>
            haveCommonElement(meeting.subjects, [subject])
          )
        : foundMeetings
    );
  }, [subject, foundMeetings]);

  useEffect(() => {
    setMeetings(filteredMeetings);
  }, [filteredMeetings, setMeetings]);

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
    {
      type: "select",
      isMulti: false,
      name: "subject",
      label: "Subjects",
      options: subjectOptions,
    },
  ];

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        {renderFormInputs(inputs, register, errors, control)}
      </form>
    </div>
  );
};
