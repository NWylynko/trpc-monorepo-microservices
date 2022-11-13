import type { AppProps } from "next/app";
import { AuthProvider } from "../providers/AuthProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const children = <Component {...pageProps} />;
  return <AuthProvider>{children}</AuthProvider>;
}
