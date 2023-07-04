import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect } from "react";
import Layout from "./layout/Layout";
import Storage from "./utils/Storage";
import Cart from "./api/Cart";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "./slices/cartSlice";
import { isObjectEmpty } from "./utils/isObjectEmpty";

const App = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    (async () => {
      if (!cart || isObjectEmpty(cart)) {
        const foundCartId = Storage.get("cart_id");
        if (foundCartId) {
          const response = await Cart.getCart(foundCartId);
          console.log("FOUND CART: ", response);
          if (response.data) {
            dispatch(updateCart(response.data));
          }
        }
      }
    })();
  }, []);
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_CLIENT_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Layout />
    </Auth0Provider>
  );
};
export default App;
