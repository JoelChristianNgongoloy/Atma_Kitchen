import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import SideBarMo from "../component/SideBarMo";
import {
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  IdentificationIcon,
  UsersIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  GiftIcon,
  BanknotesIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

const routes = [
  {
    path: "/mo",
    name: "Home",
    icon: <HomeIcon className="h-5 w-5" />,
  },
  {
    path: "/mo/jabatan",
    name: "Kelola Jabatan",
    icon: <IdentificationIcon className="h-5 w-5" />,
  },
  {
    path: "/mo/pegawai",
    name: "Kelola Pegawai",
    icon: <UserGroupIcon className="h-5 w-5" />,
  },
  {
    path: "/mo/penitip",
    name: "Kelola Penitip",
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    path: "/mo/pesanan",
    name: "Kelola Pesanan",
    icon: <ShoppingCartIcon className="h-5 w-5" />,
  },
  {
    path: "/mo/pembelian",
    name: "Kelola Pembelian",
    icon: <ShoppingBagIcon className="h-5 w-5" />,
  },
  {
    path: "/mo/pengeluaran",
    name: "Kelola Pengeluaran",
    icon: <CurrencyDollarIcon className="h-5 w-5" />,
  },
  {
    path: "/mo/daftarPesanan",
    name: "Daftar Pesanan",
    icon: <GiftIcon className="h-5 w-5" />,
  },
  {
    path: "/mo/penjualanProduk",
    name: "Laporan Penjualan Produk",
    icon: <BanknotesIcon className="h-5 w-5" />,
  },
  {
    path:"/mo/laporan/presensi-gaji",
    name:"Laporan Presensi & Gaji",
    icon:<UserGroupIcon className="h-5 w-5" />
  },
  {
    path:"/mo/laporan/pengeluaran-pemasukkan",
    name:"Laporan Pemasukkan & Pengeluaran",
    icon:<CurrencyDollarIcon className="h-5 w-5" />
  },
  {
    path:"/mo/laporan/transaksi-penitip",
    name:"Laporan Transaksi Penitip",
    icon:<UsersIcon className="h-5 w-5" />
  },
  {
    path: "/mo/laporanPenjualanBulananMo",
    name: "Laporan Penjualan Bulanan",
    icon: <PlusIcon className="h-5 w-5" />,
  },
  {
    path: "/mo/laporanPenggunaanBahanBakuMo",
    name: "Laporan Pengunaan Bahan Baku",
    icon: <PlusIcon className="h-5 w-5" />,
  },
];

const MoLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBarMo routes={routes} isOpen={sidebarOpen} />
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

export default MoLayout;
