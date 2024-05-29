import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

import IndexPegawai from "./IndexPegawai";
import CreatePegawai from "./CreatePegawai";

const PegawaiMo = () => {
  const data = [
    {
      label: "Show Pegawai",
      value: "show",
      icon: Square3Stack3DIcon,
      element: <IndexPegawai />,
    },
    {
      label: "Create Pegawai",
      value: "create",
      icon: PlusCircleIcon,
      element: <CreatePegawai />,
    },
  ];
  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl mb-4">Pegawai By MO</h1>
        <p className="w-3/5 mb-4">
          Hai Mo, Silahkan Anda Menambahkan Pegawai pada menu Create Pegawai atau
          anda bisa melihat Pegawai anda pada menu Show Pegawai di bawah ini.
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

export default PegawaiMo;
