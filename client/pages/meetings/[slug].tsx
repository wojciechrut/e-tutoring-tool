import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { AuthRedirect } from "components/auth-redirect";
import { Meeting } from "components/meeting";
import { useRouter } from "next/router";

type Data = {
  meetingId: string;
};

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const slug = params?.slug;
  const meetingId = typeof slug === "string" && slug;
  if (!meetingId) {
    return {
      notFound: true,
      props: {},
    };
  }

  return {
    props: { meetingId },
  };
};

const MeetingPage: NextPage = ({
  meetingId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push } = useRouter();

  if (!meetingId) {
    push("/meetings").then(() => undefined);
    return <></>;
  }

  return (
    <AuthRedirect>
      <Meeting meetingId={meetingId} />
    </AuthRedirect>
  );
};

export default MeetingPage;
