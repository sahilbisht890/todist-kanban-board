import { Image } from "antd";
import {
  IconPlus,
  IconStarFilled,
  IconBrandAppleFilled,
} from "@tabler/icons-react";
import { ModalContext } from "../../context";
import { useContext } from "react";
import { useSelector } from "react-redux";
import heroImg from "../../assets/homePageImage.avif";

const HeroSection = () => {
  const { setSignupVisible, featuresRef, pricingRef } = useContext(ModalContext);
  
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <div className="w-full mt-[60px] md:mt-[100px]">
        <div className="pt-2 w-full flex flex-col-reverse sm:flex-row md:flex-row justify-between items-center">
          <div className="p-3 sm:ps-6 md:ps-10 lg:ps-16 flex flex-col gap-4 sm:w-[40%] w-full">
            <div className="text-[30px] md:text-[36px] lg:text-[60px] leading-[120%] font-semibold">
              Organize your <br className="hidden md:block" /> work and{" "}
              <br className="hidden md:block" /> life, finally.
            </div>
            <div className="mt-4 text-base md:text-lg lg:text-xl font-semibold  text-gray-600 leading-6 text-left">
              Simplify life for both you and your team with the world’s #1 task
              manager and to-do list app
            </div>

            <div className="flex items-center text-sm sm:text-base md:text-lg flex-wrap mt-4">
              <div className="flex items-center font-bold text-gray-600">
                <div>500k</div>
                <IconPlus size={20} stroke={2} className="ml-1" />
              </div>
              <div className="flex mx-2">
                <IconStarFilled className="text-yellow-500" size={20} />
                <IconStarFilled className="text-yellow-500" size={20} />
                <IconStarFilled className="text-yellow-500" size={20} />
                <IconStarFilled className="text-yellow-500" size={20} />
                <IconStarFilled className="text-gray-500" size={20} />
              </div>
              <div className="font-bold text-gray-600">reviews from</div>
              <div className="ps-2">
                <IconBrandAppleFilled className="text-gray-500" size={20} />
              </div>
            </div>

            {isAuthenticated ? (
              <div className="text-red-600 text-lg font-medium italic">
                Welcome {userInfo.username}{" "}
              </div>
            ) : (
              <button
                className="mt-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-base md:text-lg py-3 px-6 rounded-lg shadow-md transition-transform duration-150 ease-in-out hover:-translate-y-1 active:translate-y-1"
                onClick={() => setSignupVisible(true)}
              >
                Start for free
              </button>
            )}
          </div>

          <div className="mt-6 sm:mt-0 w-full sm:w-[60%]">
            <Image preview={false} src={heroImg} alt="Hero Image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
