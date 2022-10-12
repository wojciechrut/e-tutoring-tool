import { Invite } from '../../models/invite';

export type InviteSendQuery = { userId: string };

export type InviteResponseBody = Invite;

export type MultipleInvitesResponseBody = Array<Invite>;

export type InviteSetAcceptedParams = { inviteId: string };
export type InviteSetAcceptedQuery = { accept: 'true' | 'false' };
