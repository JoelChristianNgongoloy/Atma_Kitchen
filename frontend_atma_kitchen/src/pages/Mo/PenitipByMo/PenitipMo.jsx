import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import IndexPenitip from "./IndexPenitip";
import CreatePenitip from "./CreatePenitip";

const PenitipMo = () => {
  const data = [
    {
      label: "Show Penitip",
      value: "show",
      icon: Square3Stack3DIcon,
      element: <IndexPenitip />,
    },
    {
      label: "Create Pegawai",
      value: "create",
      icon: PlusCircleIcon,
      element: <CreatePenitip />,
    },
  ];
  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl mb-4">Penitip By MO</h1>
        <p className="w-3/5 mb-4">
          Hai Mo, Silahkan Anda Menambahkan Penitip pada menu Create Penitip
          atau anda bisa melihat Penitip anda pada menu Show Penitip di bawah
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

export default PenitipMo;
