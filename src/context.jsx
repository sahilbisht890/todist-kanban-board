import React, { createContext, useState , useRef} from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);


  return (
    <ModalContext.Provider
      value={{
        loginVisible,
        setLoginVisible,
        signupVisible,
        setSignupVisible,
        featuresRef,
        pricingRef
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
