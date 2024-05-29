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
    path: "/pesanan",
    name: "Order",
  },
  {
    path: "/contact",
    name: "Contact",
  },
];
const CustomerLayout = ({ children }) => {
  return (
    <div className="h-screen bg-gray-400">
      <div className="max-h-[768px]">
        <NavbarCustomer routes={routes} />
        {children ? children : <Outlet />}
      </div>
    </div>
  );
};

export default CustomerLayout;
