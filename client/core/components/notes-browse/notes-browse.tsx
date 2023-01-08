import { FC, useEffect, useState } from "react";
import { useAuth } from "contexts/auth";
import styles from "./notes-browse.module.scss";
import { NoteSearchResponseBody } from "@types";
import { useForm } from "react-hook-form";
import NoteService from "services/note";
import { renderFormInputs } from "helpers/form-inputs";
import { Button } from "components/common/button";
import Image from "next/image";
import { staticSource } from "helpers/static-path";
import { formatUserInputString } from "helpers/string";
import { stringifyDate } from "helpers/date";

type FieldValues = {
  subject: string;
};

export const NotesBrowse: FC = () => {
  const { user } = useAuth();
  const [result, setResult] = useState<NoteSearchResponseBody>();
  const [subjects, setSubjects] = useState<string[]>([]);
  const {
    register,
    formState: { errors },
    watch,
    control,
  } = useForm<FieldValues>();
  const subject = watch("subject");

  useEffect(() => {
    NoteService.getMine({ page: "1" }).then((response) => {
      setResult(response);
      const noteSubjects = response.notes.reduce(
        (prev, curr) => [...prev, ...curr.subjects],
        [] as Array<string>
      );
      setSubjects(Array.from(new Set(noteSubjects)));
    });
  }, []);

  useEffect(() => {
    NoteService.getMine({ page: "1", subject }).then((response) => {
      setResult(response);
    });
  }, [subject]);

  const inputs = [
    {
      type: "select",
      isMulti: false,
      name: "subject",
      label: "Sort by subject:",
      options: subjects,
    },
  ];

  if (!user) {
    return <></>;
  }

  const canFetchNext = result?.hasNextPage;
  const canFetchPrev = result?.hasPrevPage;

  const fetchNextPage = canFetchNext
    ? () => {
        NoteService.getMine({ page: `${result.page + 1}`, subject }).then(
          (response) => {
            setResult(response);
          }
        );
      }
    : undefined;

  const fetchPrevPage = canFetchPrev
    ? () => {
        NoteService.getMine({ page: `${result.page - 1}`, subject }).then(
          (response) => {
            setResult(response);
          }
        );
      }
    : undefined;

  const removeNote = (id: string) => {
    NoteService.remove(id).then(() => {
      NoteService.getMine({ page: `${result?.page}` || "1", subject }).then(
        (response) => {
          setResult(response);
        }
      );
    });
  };

  const notes = result?.notes || [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Your notes</h1>
        <form className={styles.form}>
          {renderFormInputs(inputs, register, errors, control)}
        </form>
      </div>
      <div className={styles.container}>
        {notes && result ? (
          <>
            <div className={styles.pageInfo}>
              <div className={styles.pageInfoPrev}>
                <Button
                  disabled={!canFetchPrev}
                  styleType={"link-like"}
                  type={"button"}
                  onClick={fetchPrevPage}
                >
                  Previous
                </Button>
              </div>
              <span className={styles.pageInfoPage}>Page {result.page}</span>
              <div className={styles.pageInfoNext}>
                <Button
                  disabled={!canFetchNext}
                  styleType={"link-like"}
                  type={"button"}
                  onClick={fetchNextPage}
                >
                  Next
                </Button>
              </div>
            </div>
            <ul className={styles.notesList}>
              {notes.map(({ image, _id, text, createdAt }) => (
                <li key={_id.toString()} className={styles.notesListItem}>
                  <div className={styles.notesListItemTop}>
                    {image ? (
                      <a
                        href={staticSource(image.path)}
                        download
                        target={"_blank"}
                      >
                        <div className={styles.image}>
                          <Image
                            src={staticSource(image.path)}
                            width={160}
                            height={90}
                            alt={"Note whiteboard image"}
                          />
                        </div>
                      </a>
                    ) : (
                      <div className={styles.noWhiteboard}>no image note</div>
                    )}
                    <div className={styles.text}>
                      {formatUserInputString(text)}
                    </div>
                  </div>
                  <div className={styles.notesListItemBottom}>
                    <span className={styles.date}>
                      {createdAt && stringifyDate(createdAt)}
                    </span>
                    <Button
                      confirm={true}
                      onClick={() => removeNote(_id.toString())}
                      className={styles.deleteButton}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <span>No notes found.</span>
        )}
      </div>
    </div>
  );
};
