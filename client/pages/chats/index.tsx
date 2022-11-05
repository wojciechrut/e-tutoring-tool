import { GetServerSideProps, NextPage } from "next";
import { Chats } from "components/chats";

type PageProps = {
  currentUser?: string;
};

export const getServerSideProps: GetServerSideProps<
  {},
  { user?: string },
  PageProps
> = async ({ query }) => {
  const { user } = query;

  return {
    props: {
      currentUser: user || null,
    },
  };
};

const Chat: NextPage<PageProps> = ({ currentUser }) => {
  return <Chats currentUser={currentUser} />;
};

export default Chat;
