import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import SideBarOwner from "../component/SideBarOwner";
import {
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";

const routes = [
  {
    path: "/owner",
    name: "Home",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    path: "/owner/gaji",
    name: "Ubah Gaji Pegawai",
    icon: <BanknotesIcon className="h-5 w-5" />,
  },
];

const OwnerLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div style={{ display: "flex" }}>
      <SideBarOwner routes={routes} isOpen={sidebarOpen} />
      <button onClick={toggleSidebar} className="block md:hidden bg-gray-300">
        {sidebarOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </button>
      <div className="w-full h-lvh flex justify-center bg-white">
        <div className="w-5/6  self-center h-5/6 ">
          {children ? children : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default OwnerLayout;
