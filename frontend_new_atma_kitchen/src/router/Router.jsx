import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AdminLayout from "../layouts/AdminLayout";
import WelcomeAdmin from "../pages/Admin/WelcomeAdmin";
import ProdukAdmin from "../pages/Admin/ProdukByAdmin/ProdukAdmin";
import HampersAdmin from "../pages/Admin/HampersByAdmin/HampersAdmin";
import DetailHampers from "../pages/Admin/HampersByAdmin/DetailHampers";
import ResepAdmin from "../pages/Admin/ResepByAdmin/ResepAdmin";
import DetailResep from "../pages/Admin/ResepByAdmin/DetailResep";
import BahanBakuAdmin from "../pages/Admin/BahanBakuByAdmin/BahanBakuAdmin";
import ListCustomer from "../pages/Admin/ListCustomerByAdmin/ListCustomer";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import About from "../pages/About"
import Product from "../pages/Product"
import Contact from "../pages/Contact"

import MoLayout from "../layouts/MoLayout";
import WelcomeMo from "../pages/Mo/WelcomeMo";
import PegawaiMo from "../pages/Mo/PegawaiByMo/PegawaiMo";
import PenitipMo from "../pages/Mo/PenitipByMo/PenitipMo";
import PengeluaranMo from "../pages/Mo/PengeluaranByMo/PengeluaranMo";
import PembelianMo from "../pages/Mo/PembelianByMo/PembelianMo";
import PesananMo from "../pages/Mo/PesananByMo/PesananMo";

import OwnerLayout from "../layouts/OwnerLayout";
import WelcomeOwner from "../pages/Owner/WelcomeOwner";
import GajiOwner from "../pages/Owner/GajiByOwner/GajiOwner";
import CustomerLayout from "../layouts/CustomerLayout";
import ProfilCustomer from "../pages/Customer/ProfilCustomer/ProfilCustomer";
import MainLayout from "../layouts/MainLayout";
import WaitingOrder from "../pages/Customer/PesananCustomer/WaitingOrder";

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
      {
        path: "/mo/pesanan",
        element: <PesananMo />,
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
        path: "/pesanan",
        element: <WaitingOrder />,
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
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
