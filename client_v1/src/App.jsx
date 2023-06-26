import { Auth0Provider } from "@auth0/auth0-react";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_CLIENT_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Layout />;
    </Auth0Provider>
  );
};
export default App;
