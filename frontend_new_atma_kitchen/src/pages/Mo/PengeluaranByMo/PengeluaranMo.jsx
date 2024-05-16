import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

import IndexPengeluaran from "./IndexPengeluaran";
import CreatePengeluaran from "./CreatePengeluaran";

const PengeluaranMo = () => {
  const data = [
    {
      label: "Show Pengeluaran",
      value: "show",
      icon: Square3Stack3DIcon,
      element: <IndexPengeluaran />,
    },
    {
      label: "Create Pengeluaran",
      value: "create",
      icon: PlusCircleIcon,
      element: <CreatePengeluaran />,
    },
  ];
  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl mb-4">Pengeluaran By MO</h1>
        <p className="w-3/5 mb-4">
          Hai Mo, Silahkan Anda Menambahkan Pengeluaran pada menu Create Pengeluaran
          atau anda bisa melihat Pengeluaran anda pada menu Show Pengeluaran di bawah
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

export default PengeluaranMo;
