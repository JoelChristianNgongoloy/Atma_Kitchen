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
const CustomerLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarCustomer routes={routes}/>
      <div className="flex-grow">{children ? children : <Outlet />}</div>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
