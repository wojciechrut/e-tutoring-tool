import { Invite } from '../../models/invite';

export type InviteSendParameters = { userId: string };

export type InviteResponseBody = Invite;

export type MultipleInvitesResponseBody = Array<Invite>;
