import type { AppProps } from "next/app";
import "../core/styles/global.scss";
import { AuthProvider } from "contexts/auth";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
