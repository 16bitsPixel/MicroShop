import "@/styles/globals.css";
import type { AppProps } from "next/app";
import keycloak from '../keycloak';
import {ReactKeycloakProvider} from "@react-keycloak/web";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <ReactKeycloakProvider authClient={keycloak}>
      <Component {...pageProps} />
    </ReactKeycloakProvider>
  );
}
