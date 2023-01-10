import { DetailedMultipleFiles } from "@types";
import styles from "./file-list.module.scss";
import { FC, useEffect, useState } from "react";
import { UserAvatar } from "components/common/user-avatar";
import { stringifyDate } from "helpers/date";
import clsx from "clsx";
import { staticSource } from "helpers/static-path";
import { FormInputs, renderFormInputs } from "helpers/form-inputs";
import { useForm } from "react-hook-form";
import { searchMatch } from "../../helpers/string";

type FileListProps = {
  files: DetailedMultipleFiles;
};

type FieldValues = {
  filename: string;
  uploader: string;
};

export const FileList: FC<FileListProps> = ({ files }) => {
  const [filteredFiles, setFilteredFiles] =
    useState<DetailedMultipleFiles>(files);
  const {
    control,
    register,
    reset,
    formState: { errors },
    watch,
  } = useForm<FieldValues>();
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const nickname = watch("uploader");
  const filename = watch("filename");

  useEffect(() => {
    let filtered = files;
    if (nickname && nickname.length > 0) {
      filtered = filtered.filter((file) =>
        searchMatch(nickname, file.uploader.nickname)
      );
    }
    if (filename && filename.length > 0) {
      filtered = filtered.filter((file) =>
        searchMatch(filename, file.originalName)
      );
    }
    setFilteredFiles(
      filtered.sort((f1, f2) => {
        const ascResult =
          new Date(f1.createdAt).getTime() - new Date(f2.createdAt).getTime();
        return isAscending ? ascResult : -ascResult;
      })
    );
  }, [filename, nickname, isAscending]);

  const inputs: FormInputs<FieldValues> = [
    {
      name: "filename",
      type: "text",
      htmlType: "text",
      label: "",
      placeholder: "filename",
      noMargin: true,
    },
    {
      name: "uploader",
      type: "text",
      htmlType: "text",
      label: "",
      placeholder: "nickname",
      noMargin: true,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.count}>
          Found {files.length.toString()} files
        </span>
        <div className={styles.filter}>
          <div className={styles.filterColumn}>
            <h3 className={styles.filterHeading}>Filter by:</h3>
            <div className={styles.formContainer}>
              <form className={styles.form}>
                {renderFormInputs(inputs, register, errors, control)}
              </form>
              <div className={styles.resetButtons}>
                <button
                  className={styles.resetButton}
                  onClick={() => {
                    if (filename) reset({ filename: "" });
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <button
                  className={styles.resetButton}
                  onClick={() => {
                    if (nickname) reset({ uploader: "" });
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.filterColumn}>
            <h3 className={styles.filterHeading}>Sort</h3>
            <div className={styles.sortButtonsContainer}>
              <button
                className={clsx(
                  styles.iconButton,
                  isAscending && styles.iconButtonActive
                )}
                onClick={() => {
                  setIsAscending(true);
                }}
              >
                Newest
              </button>
              <button
                className={clsx(
                  styles.iconButton,
                  !isAscending && styles.iconButtonActive
                )}
                onClick={() => {
                  setIsAscending(false);
                }}
              >
                Oldest
              </button>
            </div>
          </div>
        </div>
        <ul className={styles.fileList}>
          {filteredFiles.map(
            ({ _id, originalName, type, createdAt, path, uploader }) => (
              <li className={styles.fileListItem} key={_id.toString()}>
                <div className={styles.iconWrapper}>
                  {type === "image" ? (
                    <i className={"fa-regular fa-image"} />
                  ) : (
                    <i className={"fa-solid fa-file"} />
                  )}
                </div>
                <div className={styles.fileInfo}>
                  <div className={styles.fileInfoName}>
                    <a
                      href={staticSource(path)}
                      download
                      target={"_blank"}
                      rel={"noreferrer"}
                    >
                      <i
                        className={clsx(
                          "fa-regular fa-circle-down",
                          styles.downloadIcon
                        )}
                      />
                      {originalName}
                    </a>
                  </div>
                  <div>{type}</div>
                </div>
                <div className={clsx(styles.fileInfo, styles.userInfo)}>
                  <div className={styles.user}>
                    <span className={styles.userNickname}>
                      {uploader.nickname}
                    </span>
                    <UserAvatar
                      avatar={uploader.avatar}
                      size={25}
                      className={styles.avatar}
                    />
                  </div>
                  <div>{stringifyDate(createdAt)}</div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};
