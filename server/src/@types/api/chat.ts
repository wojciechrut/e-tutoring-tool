export type ChatAccessQuery =
  | {
      userId: string;
      meetingId: undefined;
    }
  | {
      userId: undefined;
      meetingId: string;
    };
