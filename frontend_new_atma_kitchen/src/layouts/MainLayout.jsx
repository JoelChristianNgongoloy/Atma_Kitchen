import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarGuest from "../component/NavbarGuest";
import NavbarCustomer from "../component/NavbarCustomer";

const MainLayout = () => {
  const [token, setToken] = useState("");
  const routes = token
    ? [
        {
          path: "/home",
          name: "Home",
        },
        {
          path: "/about",
          name: "About",
        },
        {
          path: "/product",
          name: "Product",
        },
        {
          path: "/pesanan",
          name: "Order",  
        },
        {
          path: "/contact",
          name: "Contact",
        },
      ]
    : [
        {
          path: "/home",
          name: "Home",
        },
        {
          path: "/about",
          name: "About",
        },
        {
          path: "/product",
          name: "Product",
        },
        {
          path: "/contact",
          name: "Contact",
        },
      ];

  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    setToken(tokenDariSS);
  }, []);

  return (
    <div className="h-screen bg-gray-400">
      <div className="max-h-[768px]">
        {!token ? (
          <>
            <NavbarGuest routes={routes} />
            <Outlet />
          </>
        ) : (
          <>
            <NavbarCustomer routes={routes} />
            <Outlet />
          </>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
