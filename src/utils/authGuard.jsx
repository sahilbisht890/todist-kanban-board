import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ModalContext } from "../context";

const AuthGuard = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { setLoginVisible } = useContext(ModalContext);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoginVisible(true);
    }
  }, [isAuthenticated, setLoginVisible]);

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
