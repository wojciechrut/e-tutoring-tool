import { FC, useState } from "react";
import styles from "./panel.module.scss";
import { useForm } from "react-hook-form";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { Button } from "components/common/button";
import ChatService from "services/chat";
import { parseError } from "helpers/parse-error";
import { MessageSendResponseBody } from "@types";

type PanelProps = {
  chatId: string;
  addMessage: (message: MessageSendResponseBody) => void;
};

type FieldValues = {
  message: string;
  files?: FileList | null;
};

const initialState: FieldValues = {
  message: "",
  files: null,
};

export const Panel: FC<PanelProps> = ({ chatId, addMessage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FieldValues>();
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const onSubmit = async (values: FieldValues) => {
    const { message, files } = values;
    ChatService.sendMessage({
      text: message,
      files,
      chat: chatId,
    })
      .then((message) => {
        reset(initialState);
        addMessage(message);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorMessage(parseError(error)?.messages[0]);
      });
  };

  const messageInputs: FormInputs<FieldValues> = [
    {
      name: "message",
      type: "text",
      htmlType: "text",
      noMargin: true,
      label: "",
      className: styles.textInput,
      registerOptions: {
        maxLength: {
          value: 125,
          message: "Message too long",
        },
      },
    },
    {
      name: "files",
      type: "file",
      label: "Maximum 3 files",
      multiple: true,
      accept: "all",
      className: styles.fileInput,
      registerOptions: {
        required: false,
      },
      watchedValue: watch("files"),
    },
  ];

  return (
    <div className={styles.panel}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className={styles.formTop}>
          {renderFormInputs([messageInputs[0]], register, errors)}
          <div className={styles.sendButtonContainer}>
            <Button className={styles.sendButton} type={"submit"}>
              <i className="fa-solid fa-arrow-up-right-from-square" />
            </Button>
          </div>
        </div>
        {renderFormInputs([messageInputs[1]], register, errors)}
        <div className={styles.error}>{errorMessage}</div>
      </form>
    </div>
  );
};
