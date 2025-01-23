import React, { createContext, useState } from "react";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        loginVisible,
        setLoginVisible,
        signupVisible,
        setSignupVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
