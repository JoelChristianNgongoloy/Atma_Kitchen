import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import AdminLayout from "../layouts/AdminLayout";
import WelcomeAdmin from "../pages/Admin/WelcomeAdmin";
import ProdukAdmin from "../pages/Admin/ProdukByAdmin/ProdukAdmin";
import HampersAdmin from "../pages/Admin/HampersByAdmin/HampersAdmin";
import DetailHampers from "../pages/Admin/HampersByAdmin/DetailHampers";
import ResepAdmin from "../pages/Admin/ResepByAdmin/ResepAdmin";
import DetailResep from "../pages/Admin/ResepByAdmin/DetailResep";
import BahanBakuAdmin from "../pages/Admin/BahanBakuByAdmin/BahanBakuAdmin";
import ListCustomer from "../pages/Admin/ListCustomerByAdmin/ListCustomer";
import InputJarak from "../pages/Admin/InputJarakByAdmin/InputJarak";
import KonfirmasiPesanan from "../pages/Admin/KonfirmasiPesananByAdmin/KonfirmasiPesanan";

import Register from "../pages/Register";
import Login from "../pages/Login";

import MoLayout from "../layouts/MoLayout";
import WelcomeMo from "../pages/Mo/WelcomeMo";
import PegawaiMo from "../pages/Mo/PegawaiByMo/PegawaiMo";
import PenitipMo from "../pages/Mo/PenitipByMo/PenitipMo";
import PengeluaranMo from "../pages/Mo/PengeluaranByMo/PengeluaranMo";
import PembelianMo from "../pages/Mo/PembelianByMo/PembelianMo";

import OwnerLayout from "../layouts/OwnerLayout";
import WelcomeOwner from "../pages/Owner/WelcomeOwner";
import GajiOwner from "../pages/Owner/GajiByOwner/GajiOwner";
import CustomerLayout from "../layouts/CustomerLayout";
import ProfilCustomer from "../pages/Customer/ProfilCustomer/ProfilCustomer";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Customer/HomeCustomer/HomePage";
import CatalogPage from "../pages/Customer/CatalogCustomer/CatalogPage";
import ProdukInformation from "../pages/Customer/CatalogCustomer/ComponenCatalog/ProdukInformation/ProdukInformation";
import KuotaIndex from "../pages/Admin/ProdukByAdmin/KuotaIndex";
import ProdukInformationDate from "../pages/Customer/CatalogCustomer/ComponenCatalog/ProdukInformation/ProdukInformationDate";
import DetailPesanan from "../pages/Customer/CatalogCustomer/ComponenCatalog/Pesanan/DetailPesanan";
import Transaksi from "../pages/Customer/CatalogCustomer/ComponenCatalog/Pesanan/Transaksi";
import KeranjangUser from "../pages/Customer/CatalogCustomer/ComponenCatalog/KeranjangUser";
import DetailPesananByKeranjang from "../pages/Customer/CatalogCustomer/ComponenCatalog/Pesanan/DetailPesananByKeranjang";
import AlamatInput from "../pages/Customer/CatalogCustomer/ComponenCatalog/Pesanan/AlamatInput";
import TampilPesanan from "../pages/Customer/CatalogCustomer/ComponenCatalog/Pesanan/TampilPesanan";
// import KuotaIndex from "../pages/Admin/HampersByAdmin/KuotaIndex";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found</div>,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <WelcomeAdmin />,
      },
      {
        path: "/admin/produk",
        element: <ProdukAdmin />,
      },
      {
        path: "/admin/produk/kuotaproduk/:id",
        element: <KuotaIndex />,
      },
      {
        path: "/admin/hampers",
        element: <HampersAdmin />,
      },
      {
        path: "/admin/detailHampers",
        element: <DetailHampers />,
      },
      {
        path: "/admin/resep",
        element: <ResepAdmin />,
      },
      {
        path: "/admin/resep/detailResep",
        element: <DetailResep />,
      },
      {
        path: "/admin/bahanBaku",
        element: <BahanBakuAdmin />,
      },
      {
        path: "/admin/listCustomer",
        element: <ListCustomer />,
      },
      {
        path: "/admin/inputJarak",
        element: <InputJarak />,
      },
      {
        path: "/admin/konfirmasiPesanan",
        element: <KonfirmasiPesanan />,
      },
    ],
  },
  {
    path: "/mo",
    element: <MoLayout />,
    children: [
      {
        path: "/mo",
        element: <WelcomeMo />,
      },
      {
        path: "/mo/pegawai",
        element: <PegawaiMo />,
      },
      {
        path: "/mo/penitip",
        element: <PenitipMo />,
      },
      {
        path: "/mo/pembelian",
        element: <PembelianMo />,
      },
      {
        path: "/mo/pengeluaran",
        element: <PengeluaranMo />,
      },
    ],
  },
  {
    path: "/owner",
    element: <OwnerLayout />,
    children: [
      {
        path: "/owner",
        element: <WelcomeOwner />,
      },
      {
        path: "/owner/gaji",
        element: <GajiOwner />,
      },
    ],
  },
  {
    // path: "/customer",
    element: <CustomerLayout />,
    children: [
      {
        path: "/profil",
        element: <ProfilCustomer />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/catalog",
        element: <CatalogPage />,
      },
      {
        path: "/informationprodukdate/:id",
        element: <ProdukInformationDate />,
      },
      {
        path: "/informationproduk/:id",
        element: <ProdukInformation />,
      },
      {
        path: "/detail_pesan/:id",
        element: <DetailPesanan />,
      },
      {
        path: "/detail_pesanAll/:id",
        element: <DetailPesananByKeranjang />,
      },
      {
        path: "/transaksiCetak/:id",
        element: <Transaksi />,
      },
      {
        path: "/showInputAlamat/:id",
        element: <AlamatInput />,
      },
      {
        path: "/transaksi",
        element: <Transaksi />,
      },
      {
        path: "/keranjangUser",
        element: <KeranjangUser />,
      },
      {
        path: "/order",
        element: <TampilPesanan />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      // {
      //   path: "/home",
      //   element: <HomePage />,
      // },
      // {
      //   path: "/catalog",
      //   element: <CatalogPage />,
      // },
    ],
  },
]);

const AppRouter = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "z-50",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
