import type { NextPage } from "next";
import { Layout } from "components/layout";
import { AuthRedirect } from "components/auth-redirect";
import { useAuth } from "contexts/auth";

const Home: NextPage = () => {
  const { user } = useAuth();
  return (
    <AuthRedirect>
      <>{JSON.stringify(user, null, 2)}</>
      <Layout />
    </AuthRedirect>
  );
};

export default Home;
