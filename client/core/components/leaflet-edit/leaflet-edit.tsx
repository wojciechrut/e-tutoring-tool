import { SingleLeafletResponseBody } from "@types";
import { FC, useState } from "react";
import styles from "./leaflet-edit.module.scss";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { useForm } from "react-hook-form";
import { Button } from "components/common/button";
import { useRouter } from "next/router";
import LeafletService from "services/leaflet";
import { parseError } from "helpers/parse-error";

type LeafletEditProps = {
  leaflet: SingleLeafletResponseBody;
};

type FieldValues = {
  title: string;
  description: string;
};

export const LeafletEdit: FC<LeafletEditProps> = ({ leaflet }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const inputs: FormInputs<FieldValues> = [
    {
      name: "title",
      type: "text",
      htmlType: "text",
      label: "Title (3-30 characters)",
      placeholder: "e.g. Looking for math tutor for weekends",
      defaultValue: leaflet.title,
      registerOptions: {
        pattern: {
          value: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\-\[\]\/()+!?. '"{}]{3,40}$/,
          message:
            "Title can have 3-40 alphanumerical or some special characters.",
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
      defaultValue: leaflet.description,
      registerOptions: {
        pattern: {
          value: /^[A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ\-\[\]\/()+!?. \n]{20,500}$/,
          message:
            "Description can have 20-500 alphanumerical or some special characters",
        },
      },
    },
  ];

  const onSubmit = (data: FieldValues) => {
    LeafletService.update({ id: leaflet._id.toString(), ...data })
      .catch((error) => {
        setMessage(parseError(error)?.messages?.[0] || "");
      })
      .then(() => router.push("/leaflets"));
  };

  const deleteLeaflet = () => {
    LeafletService.remove(leaflet._id.toString())
      .catch((error) => {
        setMessage(parseError(error)?.messages?.[0] || "");
      })
      .then(() => router.reload());
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Edit leaflet:</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {renderFormInputs(inputs, register, errors)}
        <div className={styles.buttons}>
          <Button type={"submit"} className={styles.button}>
            Edit
          </Button>
          <Button
            type={"button"}
            className={styles.button}
            styleType={"primary"}
            confirm={true}
            onClick={deleteLeaflet}
          >
            Delete
          </Button>
        </div>
      </form>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};
