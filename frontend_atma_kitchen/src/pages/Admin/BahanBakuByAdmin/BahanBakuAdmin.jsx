import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { Square3Stack3DIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import IndexBahanBaku from "./IndexBahanBaku";
import CreateBahanBaku from "./CreateBahanBaku";

const BahanBakuAdmin = () => {
  const data = [
    {
      label: "Show Bahan Baku",
      value: "show",
      icon: Square3Stack3DIcon,
      element: <IndexBahanBaku />,
    },
    {
      label: "Create Bahan Baku",
      value: "create",
      icon: PlusCircleIcon,
      element: <CreateBahanBaku />,
    },
  ];
  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Bahan Baku By Admin</h1>
      <p className="w-3/5 mb-4">
        Hai Admin, Silahkan Anda Menambahkan Bahan Baku pada menu Create Bahan Baku
        atau anda bisa melihat Bahan Baku anda pada menu Show Bahan Baku di bawah ini.
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

export default BahanBakuAdmin;
