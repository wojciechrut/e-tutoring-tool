import { NextPage } from "next";
import { AuthRedirect } from "components/auth-redirect";
import { Files } from "components/files";

const FilesPage: NextPage = () => {
  return (
    <AuthRedirect>
      <Files />
    </AuthRedirect>
  );
};

export default FilesPage;
