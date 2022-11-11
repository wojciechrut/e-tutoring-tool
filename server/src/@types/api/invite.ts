import { Invite } from "../../models/invite";

export type InviteSendQuery = { userId: string };

export type InviteResponseBody = Invite;

export type MultipleInvitesResponseBody = Array<Invite>;

export type InviteSetAcceptedParams = { inviteId: string };
export type InviteSetAcceptedQuery = { accept: "true" | "false" };

export type InviteStatusResponseBody =
  | {
      status: "friend" | "invite sent" | "can invite";
      inviteId: undefined;
    }
  | {
      status: "invited by";
      inviteId: string;
    };

export type InviteStatusRequestQuery = {
  user: string;
};
