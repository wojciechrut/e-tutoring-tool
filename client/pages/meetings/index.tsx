import { NextPage } from "next";
import { Meetings } from "components/meetings";
import { AuthRedirect } from "components/auth-redirect";

const MeetingsPage: NextPage = () => {
  return (
    <AuthRedirect>
      <Meetings />
    </AuthRedirect>
  );
};

export default MeetingsPage;
