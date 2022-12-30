export type NoteCreateRequestBody = {
  text: string;
  meetingId: string;
  file?: FileList;
};
