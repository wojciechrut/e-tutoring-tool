import React, { FC, useEffect, useState } from "react";
import styles from "./leaflet.module.scss";
import Spinner from "../../assets/spinner.svg";
import { SingleLeafletResponseBody } from "@types";
import LeafletService from "services/leaflet";
import { useRouter } from "next/router";
import { formatUserInputString, printArray } from "helpers/string";
import { UserAvatar } from "components/common/user-avatar";
import { StyledLink } from "components/common/styled-link";
import { useAuth } from "contexts/auth";
import { LeafletEdit } from "components/leaflet-edit/leaflet-edit";

type LeafletProps = {
  id: string;
};

export const Leaflet: FC<LeafletProps> = ({ id }) => {
  const [leaflet, setLeaflet] = useState<SingleLeafletResponseBody | null>();
  const router = useRouter();
  const { user } = useAuth();
  const isMine = user?._id.toString() === leaflet?.user._id.toString();

  useEffect(() => {
    LeafletService.get(id)
      .then((leaflet) => setLeaflet(leaflet))
      .catch(() => {
        router.push("/leaflets");
      });
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {leaflet ? (
          <>
            <h1 className={styles.heading}>{leaflet.title}</h1>
            <div className={styles.description}>
              {formatUserInputString(leaflet.description)}
            </div>

            <div className={styles.info}>
              <div className={styles.infoRow}>
                <strong className={styles.strong}>
                  {leaflet.user.nickname}
                </strong>
                <UserAvatar
                  className={styles.avatar}
                  avatar={leaflet.user.avatar}
                  size={25}
                />
              </div>
              <div className={styles.infoRow}>
                is looking for {leaflet.lookingFor}
              </div>
              <div className={styles.infoRow}>
                to study{" "}
                <strong className={styles.strong}>
                  {printArray(leaflet.subjects)}
                </strong>
              </div>
              <div className={styles.infoRow}>
                at{" "}
                <strong className={styles.strong}>
                  {printArray(leaflet.levels)}
                </strong>{" "}
                level
              </div>
            </div>
            {!isMine ? (
              <div className={styles.contact}>
                Contact {leaflet.user.nickname}{" "}
                <StyledLink
                  path={`/chats?user=${leaflet.user._id}`}
                  className={styles.contactLink}
                >
                  here
                </StyledLink>
                <div className={styles.contactInfo}>
                  If it&apos;s your first message in a while, they will be
                  contacted via email
                </div>
              </div>
            ) : (
              <LeafletEdit leaflet={leaflet} />
            )}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
