import { NextPage } from "next";
import { AuthRedirect } from "components/auth-redirect";
import { useAuth } from "contexts/auth";

const Profile: NextPage = () => {
  const { user, logout } = useAuth();
  return (
    <AuthRedirect>
      {JSON.stringify(user, undefined, 2)}
      <br />
      <button onClick={logout}>LOGOUT</button>
    </AuthRedirect>
  );
};

export default Profile;
