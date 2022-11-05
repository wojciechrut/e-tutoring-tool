import { GetServerSideProps, NextPage } from "next";
import { Chats } from "components/chats";

type PageProps = {
  currentUser: string;
};

export const getServerSideProps: GetServerSideProps<
  {},
  { user?: string },
  PageProps
> = async ({ query }) => {
  const { user } = query;

  if (!user || Array.isArray(user)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      currentUser: user,
    },
  };
};

const Chat: NextPage<PageProps> = ({ currentUser }) => {
  return <Chats currentUser={currentUser} />;
};

export default Chat;
