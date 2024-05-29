import React from "react";
import { Outlet } from "react-router-dom";
import NavbarCustomer from "../component/NavbarCustomer";
import Footer from "../component/Footer";

const routes = [
  {
    path: "/home",
    name: "Home",
  },
  {
    path: "/catalog",
    name: "Catalog",
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

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-h-[768px]">
        <NavbarCustomer routes={routes} />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
