import React, { useEffect, useState } from "react";
import {
  Navbar,
  Avatar,
  Typography,
  Button,
  IconButton,
  Collapse,
  Badge,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import { ShoppingCartIcon, BellIcon } from "@heroicons/react/24/solid";

import AtmaLogo from "../assets/image/Atma_kitchen.png";

const NavbarCustomer = ({ routes }) => {
  const [openNav, setOpenNav] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    setToken(tokenDariSS);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Navbar className="sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-around text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium w-20"
        >
          <img src={AtmaLogo} alt="" />
        </Typography>
        <div className="hidden lg:block">
          <ul className="flex flex-row gap-6">
            {routes?.map((route, index) => (
              <Typography
                as="li"
                key={index}
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
              >
                <span
                  onClick={() => handleNavigation(route.path)}
                  className="cursor-pointer"
                >
                  {route.name}
                </span>
              </Typography>
            ))}
            {!token ? (
              <>{/* <div></div> */}</>
            ) : (
              <>
                <Typography
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="p-1 font-normal"
                >
                  <span
                    onClick={() => navigate("/order")}
                    className="cursor-pointer"
                  >
                    Order
                  </span>
                </Typography>
              </>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {!token ? (
            <>
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
                onClick={() => navigate("/")}
              >
                <span>Log In</span>
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                onClick={() => navigate("/register")}
              >
                <span>Sign in</span>
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Badge content="5" className="mr-3" withBorder>
                  <IconButton className="mr-3">
                    <BellIcon className="h-4 w-4" />
                  </IconButton>
                </Badge>
                <ShoppingCartIcon
                  onClick={() => navigate("/keranjangUser")}
                  className="h-8 w-8 mr-3 cursor-pointer"
                />
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  withBorder={true}
                  className="p-0.5 cursor-pointer"
                  onClick={() => navigate("/profil")}
                />
              </div>
            </>
          )}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="text-center">
          <ul className="flex flex-col gap-2 lg:gap-6">
            {routes?.map((route, index) => (
              <Typography
                as="li"
                key={index}
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
              >
                <span
                  onClick={() => handleNavigation(route.path)}
                  className="cursor-pointer"
                >
                  {route.name}
                </span>
              </Typography>
            ))}
            {!token ? (
              <>{/* <div></div> */}</>
            ) : (
              <>
                <Typography
                  as="li"
                  variant="small"
                  color="blue-gray"
                  className="p-1 font-normal"
                >
                  <span
                    onClick={() => navigate("/order")}
                    className="cursor-pointer"
                  >
                    Order
                  </span>
                </Typography>
              </>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {!token ? (
            <>
              <Button
                fullWidth
                variant="text"
                size="sm"
                onClick={() => navigate("/")}
              >
                <span>Log In</span>
              </Button>
              <Button
                fullWidth
                variant="gradient"
                size="sm"
                onClick={() => navigate("/register")}
              >
                <span>Sign in</span>
              </Button>
            </>
          ) : (
            <>
              <Button
                fullWidth
                variant="text"
                size="sm"
                onClick={() => navigate("/customer/profil")}
              >
                <span>Profile</span>
              </Button>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarCustomer;
