import {
  IconListCheck,
  IconMenu2,
  IconCaretDownFilled,
  IconUserCircle
} from "@tabler/icons-react";
import { useState, useContext, useEffect } from "react";
import { ModalContext } from "../../context";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../store/actions/user";
import { useDispatch } from "react-redux";
import { useNavigate , useLocation } from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";

const Navbar = () => {
  const { userInfo, isAuthenticated } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loginVisible, setLoginVisible, signupVisible, setSignupVisible, featuresRef, pricingRef } = useContext(ModalContext);

    
  const handleFeatureClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "features" } });
    } else {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePricingClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "pricing" } });
    } else {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo === "features" && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (location.state?.scrollTo === "pricing" && pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);


  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
    } catch (err) {
      console.log("Error while loging out");
    }
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  


  return (
    <div className="w-full py-5 px-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <IconListCheck
            color="rgb(220 38 38)"
            size={40}
            className="rounded border-2 border-spacing-3 border-red-600"
          />
          <div className="text-2xl font-bold text-red-600">Todoist</div>
        </div>

        <div className="hidden md:flex justify-between items-center gap-7">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-base font-medium text-red-600 border-b-2 border-red-600"
                : "text-base font-medium cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-base font-medium text-red-600 border-b-2 border-red-600"
                : "text-base font-medium cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600"
            }
          >
            Dashboard
          </NavLink>
          <div className="text-base font-medium cursor-pointer hover:text-red-600  hover:border-b-2 hover:border-red-600"
          onClick={handleFeatureClick}
          >
            Features
          </div>
          <div className="text-base font-medium cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600"
          onClick={handlePricingClick}
          >
            Pricing
          </div>
          {!isAuthenticated && (
            <div
              className="text-base font-medium cursor-pointer hover:text-red-600 hover:border-b-2 hover:border-red-600"
              onClick={() => setLoginVisible(true)}
            >
              Log in
            </div>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Dropdown
                placement="bottomRight"
                trigger={["click"]}
                overlay={ <Menu>
                  <Menu.Item key="username">
                    <span className="font-semibold">{userInfo.email}</span>
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="logout" className="text-center">
                    <Button type="text" onClick={handleLogout} className="text-red-600 font-medium">
                      Logout
                    </Button>
                  </Menu.Item>
                </Menu>}
              >
                <div className="text-base font-semibold text-red-600 gap-1 cursor-pointer flex items-center">
                  <IconUserCircle className="text-red-800"/>
                  {userInfo.username}
                  <IconCaretDownFilled/>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-base font-medium px-3 py-2 rounded transition-transform duration-500 ease-in-out cursor-pointer hover:scale-110"
              onClick={() => setSignupVisible(true)}
            >
              Start for free
            </div>
          )}
        </div>
        <div className="md:hidden">
          <IconMenu2
            size={30}
            className="cursor-pointer text-red-600"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col gap-5 mt-5 md:hidden bg-gray-200 p-4 rounded shadow-lg justify-center items-center">
          {isAuthenticated ? (
            <div className="text-lg font-semibold text-red-600">
              Welcome {userInfo.username}
            </div>
          ) : (
            <div
              className="bg-gradient-to-r from-red-500 to-orange-500 text-center text-white text-lg w-1/2 font-medium p-3 rounded transition-transform duration-500 ease-in-out cursor-pointer hover:scale-105"
              onClick={() => setSignupVisible(true)}
            >
              Start for free
            </div>
          )}
          
          <NavLink
            to="/dashboard"
            className="text-lg font-medium cursor-pointer"
          >
            Dashboard
          </NavLink>
          <div className="text-lg font-medium cursor-pointer" onClick={handleFeatureClick}>Features</div>
          <div className="text-lg font-medium cursor-pointer" onClick={handlePricingClick}>Pricing</div>
          {isAuthenticated ? (
            <div
              className="text-lg font-medium cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          ) : (
            <div
              className="text-lg font-medium cursor-pointer"
              onClick={() => setLoginVisible(true)}
            >
              Log in
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
