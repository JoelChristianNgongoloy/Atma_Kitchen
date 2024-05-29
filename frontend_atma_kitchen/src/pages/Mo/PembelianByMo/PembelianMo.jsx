import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

import IndexPembelian from "./IndexPembelian";
import CreatePembelian from "./CreatePembelian";

const PembelianMo = () => {
  const data = [
    {
      label: "Show Pembelian",
      value: "show",
      icon: Square3Stack3DIcon,
      element: <IndexPembelian />,
    },
    {
      label: "Create Pembelian",
      value: "create",
      icon: PlusCircleIcon,
      element: <CreatePembelian />,
    },
  ];
  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl mb-4">Pembelian By MO</h1>
        <p className="w-3/5 mb-4">
          Hai Mo, Silahkan Anda Menambahkan Pembelian pada menu Create Pembelian
          atau anda bisa melihat Pembelian anda pada menu Show Pembelian di bawah
          ini.
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
    </div>
  );
};

export default PembelianMo;
