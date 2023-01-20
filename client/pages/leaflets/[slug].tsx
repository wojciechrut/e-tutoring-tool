import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { Leaflet } from "components/leaflet";

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const slug = params?.slug;
  const leafletId = typeof slug === "string" && slug;
  if (!leafletId) {
    return {
      notFound: true,
      props: {},
    };
  }

  return {
    props: { leafletId: leafletId },
  };
};

const LeafletPage: NextPage = ({
  leafletId: leafletId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push } = useRouter();

  if (!leafletId) {
    push("/leaflet").then(() => undefined);
    return <></>;
  }

  return <Leaflet id={leafletId} />;
};

export default LeafletPage;
