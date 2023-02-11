import localforage from "localforage";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [token, setToken] = useState();

  const getToken = async () => {
    const tok = await localforage.getItem("token");
    setToken(tok);
  };

  useEffect(() => {
    getToken();
  }, []);

  return token === null ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
