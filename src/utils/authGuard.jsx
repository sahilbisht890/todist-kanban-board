import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ModalContext } from "../context";

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { setLoginVisible , isAuthApiCalled } = useContext(ModalContext);

  useEffect(() => {
    if (!isAuthenticated && isAuthApiCalled) {
      setLoginVisible(true);
    }
  }, [isAuthenticated, setLoginVisible , isAuthApiCalled]);

  if (!isAuthenticated && isAuthApiCalled) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
