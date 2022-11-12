import { useEffect, useState } from "react";
import InviteService, { InviteStatus } from "services/invite";
import { parseError } from "helpers/parse-error";

export const useFriendInvite = (userId: string) => {
  const [loading, setLoading] = useState(true);
  const [inviteId, setInviteId] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const [status, setStatus] = useState<InviteStatus | null>();

  useEffect(() => {
    InviteService.getStatus(userId)
      .then((response) => {
        const { status, inviteId } = response;
        setStatus(status);
        inviteId && setInviteId(inviteId);
        setLoading(false);
      })
      .catch((error) => setError(parseError(error)?.messages[0]));
  }, [userId]);

  const sendInvite = () => {
    if (status === "can invite") {
      setLoading(true);
      InviteService.send(userId)
        .then((invite) => {
          setStatus("invite sent");
          setLoading(false);
        })
        .catch((error) => setError(parseError(error)?.messages[0]));
    }
  };

  const setAccepted = (accept: boolean) => {
    if (status === "invited by" && inviteId) {
      setLoading(true);
      InviteService.setAccepted(inviteId, accept)
        .then(() => {
          setStatus("friend");
          setLoading(false);
        })
        .catch((error) => setError(parseError(error)?.messages[0]));
    }
  };

  return { status, sendInvite, setAccepted, loading, error };
};
