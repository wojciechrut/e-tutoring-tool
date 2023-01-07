import { NextPage } from "next";
import { LeafletCreate } from "components/leaflet-create";
import { AuthRedirect } from "components/auth-redirect";

const Create: NextPage = () => {
  return (
    <AuthRedirect>
      <LeafletCreate />
    </AuthRedirect>
  );
};

export default Create;
