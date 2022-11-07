import { FC, useState } from "react";
import styles from "./panel.module.scss";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { Button } from "components/common/button";
import ChatService from "services/chat";
import { parseError } from "helpers/parse-error";

type PanelProps = {
  chatId: string;
};

type FieldValues = {
  message: string;
  files?: Array<string>;
};

const initialState: FieldValues = {
  message: "",
  files: undefined,
};

const messageInputs: FormInputs<FieldValues> = [
  {
    name: "files",
    type: "file",
    multiple: true,
    accept: "all",
    label: "",
    registerOptions: {
      required: false,
    },
  },
  {
    name: "message",
    type: "text",
    htmlType: "text",
    label: "",
    registerOptions: {
      maxLength: {
        value: 125,
        message: "Message too long",
      },
    },
  },
];

export const Panel: FC<PanelProps> = ({ chatId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const onSubmit = async (values: FieldValues) => {
    const { message, files } = values;
    ChatService.sendMessage({
      text: message,
      files,
      chat: chatId,
    })
      .then(() => {
        reset(initialState);
      })
      .catch((error) => {
        setErrorMessage(parseError(error)?.messages[0]);
      });
  };

  return (
    <div className={styles.panel}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        {renderFormInputs(messageInputs, register, errors)}
        <Button type={"submit"}>Submit</Button>
      </form>
      <div className={styles.error}>{errorMessage}</div>
    </div>
  );
};
