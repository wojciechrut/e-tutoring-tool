import { NextPage } from "next";
import { LeafletSearch } from "components/leaflet-search";
import { AuthRedirect } from "../../core/components/auth-redirect";

const Leaflets: NextPage = () => {
  return (
    <AuthRedirect>
      <LeafletSearch />
    </AuthRedirect>
  );
};

export default Leaflets;
