import React from "react";
import { Outlet } from "react-router-dom";
import NavbarCustomer from "../component/NavbarCustomer";

const routes = [
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
    path: "/order",
    name: "Order",
  },
  {
    path: "/contact",
    name: "Contact",
  },
];

const MainLayout = () => {
  return (
    <div className="h-screen bg-gray-400">
      <div className="max-h-[768px]">
        
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
