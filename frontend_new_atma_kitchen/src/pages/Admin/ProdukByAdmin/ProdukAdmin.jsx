import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";

import CreateProduk from "./CreateProduk";
import IndexProduk from "./IndexProduk";
import CreateProdukTitipan from "./CreateProdukTitipan";

const ProdukAdmin = () => {
  const data = [
    {
      label: "Show Product",
      value: "show",
      icon: Square3Stack3DIcon,
      element: <IndexProduk />,
    },
    {
      label: "Create Product",
      value: "create",
      icon: PlusCircleIcon,
      element: <CreateProduk />,
    },
    {
      label: "Product Titipan",
      value: "create2",
      icon: PlusIcon,
      element: <CreateProdukTitipan />,
    },
  ];
  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Produk By Admin</h1>
      <p className="w-3/5 mb-4">
        Hai Admin, Silahkan Anda Menambahkan Produk pada menu Create produk atau
        anda bisa melihat Product anda pada menu Show Product di bawah ini
      </p>
      <Tabs value="show">
        <TabsHeader className="w-2/5">
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, element }) => (
            <TabPanel key={value} value={value}>
              {element}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default ProdukAdmin;
