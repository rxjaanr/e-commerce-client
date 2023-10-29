import "@/styles/globals.css";
import "@uploadthing/react/styles.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.title = "Next Commerce";
  }, []);

  return <Component {...pageProps} />;
}
