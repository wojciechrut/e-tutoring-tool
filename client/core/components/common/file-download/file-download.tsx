import { FC } from "react";
import styles from "./file-download.module.scss";
import { staticSource } from "helpers/static-path";
import clsx from "clsx";

type FileDownloadProps = {
  name: string;
  path: string;
  type: "document" | "image";
  className?: string;
};

export const FileDownload: FC<FileDownloadProps> = ({
  name,
  path,
  type,
  className,
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.iconWrapper}>
        {type === "image" ? (
          <i className={"fa-regular fa-image"} />
        ) : (
          <i className={"fa-solid fa-file"} />
        )}
      </div>
      <a
        className={styles.downloadLink}
        href={staticSource(path)}
        download
        target={"_blank"}
      >
        <span className={styles.filename}>{name || "unknown filename"}</span>
        <i className="fa-regular fa-circle-down" />
      </a>
    </div>
  );
};
