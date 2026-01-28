import Navbar from "../homePage/navbar";
import LoginModal from "../homePage/loginModal";
import SignupModal from "../homePage/signUpModal";
import Footer from "../homePage/footer";

import { useContext, useEffect, useRef } from "react";
import { ModalContext } from "../../context";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  checkAuthentication,
  refreshAccessToken,
} from "../../store/actions/user";

export default function Layout({ children }) {
  const {
    loginVisible,
    setLoginVisible,
    signupVisible,
    setSignupVisible,
    setIsAuthApiCalled,
  } = useContext(ModalContext);

  const dispatch = useDispatch();
  const location = useLocation();
  const apiCalled = useRef(false);

  // Routes that should SKIP auth check
  const skipAuthRoutes = [
    "/",              // Home
    "/verify-email",        // Verify email (prefix match)
  ];

  // Check if current route should skip auth
  const shouldSkipAuth = skipAuthRoutes.some((route) =>
    location.pathname === route ||
    location.pathname.startsWith(`${route}/`)
  );

  useEffect(() => {
    if (shouldSkipAuth) {
      setIsAuthApiCalled(true);
      return;
    }

    const checkAuth = async () => {
      try {
        await dispatch(checkAuthentication());
      } catch (err) {
        try {
          await dispatch(refreshAccessToken());
        } catch (refreshErr) {
          console.log("Please Login Again", refreshErr);
        } finally {
          setIsAuthApiCalled(true);
        }
      }
    };

    if (!apiCalled.current) {
      apiCalled.current = true;
      checkAuth();
    }
  }, [shouldSkipAuth, dispatch, setIsAuthApiCalled]);

  return (
    <>
      <LoginModal isVisible={loginVisible} setIsVisible={setLoginVisible} />
      <SignupModal isVisible={signupVisible} setIsVisible={setSignupVisible} />

      <div>
        <Navbar />
        <div className="p-4 min-h-screen">{children}</div>
        <Footer />
      </div>
    </>
  );
}
