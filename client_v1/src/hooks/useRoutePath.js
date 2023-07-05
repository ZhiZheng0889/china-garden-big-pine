import { useLocation, useParams } from "react-router-dom";

export const useRoutePath = () => {
  const { pathname } = useLocation();
  const params = useParams();
  return [pathname, params];
};
