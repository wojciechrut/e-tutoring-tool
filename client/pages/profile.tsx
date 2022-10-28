import { NextPage } from "next";
import { AuthRedirect } from "components/auth-redirect";

const Profile: NextPage = () => {
  return <AuthRedirect>Profile</AuthRedirect>;
};

export default Profile;
