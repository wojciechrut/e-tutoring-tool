import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import styles from "./modal.module.scss";
import clsx from "clsx";

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode | ReactNode[];
  className?: string;
};

export const Modal: FC<ModalProps> = ({
  children,
  open,
  setOpen,
  className,
}) => {
  return (
    <div className={clsx(styles.container, open && styles.containerOpen)}>
      <div
        className={styles.blanket}
        onClick={() => setOpen((prev) => !prev)}
      />
      <div className={clsx(styles.content, className)}>{children}</div>
    </div>
  );
};
