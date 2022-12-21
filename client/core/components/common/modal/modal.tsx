import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from "react";
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
  useEffect(() => {
    const clickOutsideListener = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.id === "blanket") {
        setOpen(false);
      }
    };

    window.addEventListener("click", clickOutsideListener);

    return () => window.removeEventListener("click", clickOutsideListener);
  }, [setOpen]);

  return (
    <div className={clsx(styles.container, open && styles.containerOpen)}>
      <div id={"blanket"} className={styles.blanket} />
      <div className={clsx(styles.content, className)}>{children}</div>
    </div>
  );
};
