import { NextPage } from "next";
import { AuthRedirect } from "components/auth-redirect";
import { NotesBrowse } from "components/notes-browse";

const Notes: NextPage = () => {
  return (
    <AuthRedirect>
      <NotesBrowse />
    </AuthRedirect>
  );
};

export default Notes;
