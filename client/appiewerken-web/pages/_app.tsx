import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ConfirmProvider } from "../components/ConfirmDialog/ConfirmProvider";
import ConfirmDialog from "../components/ConfirmDialog";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ConfirmProvider>
        <Component {...pageProps} />
        <ConfirmDialog />
      </ConfirmProvider>
    </>
  );
}
export default MyApp;
