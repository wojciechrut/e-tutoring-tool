import { NextPage } from "next";
import { AuthRedirect } from "components/auth-redirect";
import { ProfileInfo } from "components/profile-info";

const Profile: NextPage = () => {
  return (
    <AuthRedirect>
      <ProfileInfo />
    </AuthRedirect>
  );
};

export default Profile;
