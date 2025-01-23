import Navbar from "../homePage/navbar";
import LoginModal from "../homePage/loginModal";
import SignupModal from "../homePage/signUpModal";
import { useContext , useEffect , useRef } from "react";
import { ModalContext } from "../../context";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "../../store/actions/user";
import { refreshAccessToken } from "../../store/actions/user";
import Footer from "../homePage/footer";

export default function Layout({ children }) {
  const { loginVisible, setLoginVisible, signupVisible, setSignupVisible } = useContext(ModalContext);
  const apiCalled = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
       await dispatch(checkAuthentication());
      } catch (err) {
        try {
          await dispatch(refreshAccessToken());
        } catch (refreshErr) {
          console.log("Please Login Again",refreshErr);
        }
      }
    };

    if(!apiCalled.current){
      apiCalled.current = true ;
      checkAuth();
    }
  }, []);

  return (
    <>
      <LoginModal isVisible={loginVisible} setIsVisible={setLoginVisible} />
      <SignupModal isVisible={signupVisible} setIsVisible={setSignupVisible}/>
      <div>
        <Navbar />
        <div className="p-4 min-h-screen">{children}</div>
        <Footer/>
      </div>
    </>
  );
}
