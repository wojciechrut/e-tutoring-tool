import type { AppProps } from "next/app";
import "../core/styles/global.scss";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
