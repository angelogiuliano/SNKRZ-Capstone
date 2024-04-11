import { jwtDecode } from "jwt-decode";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Login } from "../components/Login/Login";

const auth = () => {
  return localStorage.getItem("auth");
};

export const useSession = () => {
  const session = auth();
  const decodedSession = jwtDecode(session);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      navigate("/login", { replace: true });
    }
  }, [session]);

  return decodedSession;
};

const ProtectedRoutes = () => {
  const isAuthorized = auth();

  return isAuthorized ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
