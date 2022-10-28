import type { AppProps } from "next/app";
import "../core/styles/global.scss";
import { AuthProvider } from "contexts/auth";
import { Layout } from "components/layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default App;
