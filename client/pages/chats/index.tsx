import { NextPage } from "next";
import { Chats } from "components/chats";
import { AuthRedirect } from "components/auth-redirect";

const Chat: NextPage = () => {
  return (
    <AuthRedirect redirect={"unauthorized"}>
      <Chats />
    </AuthRedirect>
  );
};

export default Chat;
