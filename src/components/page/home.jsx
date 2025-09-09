import FAQ from "../homePage/faq";
import Features from "../homePage/features";
import HeroSection from "../homePage/home";
import Pricing from "../homePage/pricing";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { ModalContext } from "../../context";

const HomePage = () => {
  const { setSignupVisible, featuresRef, pricingRef } =
    useContext(ModalContext);
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <HeroSection />
      <Pricing pricingRef={pricingRef} />
      <Features featuresRef={featuresRef} />
      <FAQ />
    </>
  );
};

export default HomePage;
