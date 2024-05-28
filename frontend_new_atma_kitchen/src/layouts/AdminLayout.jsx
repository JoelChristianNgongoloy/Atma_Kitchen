import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "../component/SideBarAdmin";
import {
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  CakeIcon,
  GiftIcon,
  BookOpenIcon,
  RectangleStackIcon,
  UserGroupIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

const routes = [
  {
    path: "/admin",
    name: "Home",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    path: "/admin/produk",
    name: "Produk",
    icon: <CakeIcon className="h-5 w-5" />,
  },
  {
    path: "/admin/hampers",
    name: "Hampers",
    icon: <GiftIcon className="h-5 w-5" />,
  },
  {
    path: "/admin/resep",
    name: "Resep",
    icon: <BookOpenIcon className="h-5 w-5" />,
  },
  {
    path: "/admin/bahanbaku",
    name: "Bahan Baku",
    icon: <RectangleStackIcon className="h-5 w-5" />,
  },
  {
    path: "/admin/listCustomer",
    name: "List Customer",
    icon: <UserGroupIcon className="h-5 w-5" />,
  },
  {
    path: "/admin/inputJarak",
    name: "Jarak Pengiriman",
    icon: <MapPinIcon className="h-5 w-5" />,
  },
  {
    path: "/admin/konfirmasiPesanan",
    name: "Konfirmasi Pesanan",
    icon: <CheckCircleIcon className="h-5 w-5" />,
  }
];

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: "flex" }} className="">
      <SideBarAdmin routes={routes} isOpen={sidebarOpen} />
      <button onClick={toggleSidebar} className="block md:hidden bg-gray-300">
        {sidebarOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </button>
      <div className="w-full h-screen flex justify-center bg-white">
        <div className="w-5/6  self-center h-5/6 ">
          {children ? children : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
