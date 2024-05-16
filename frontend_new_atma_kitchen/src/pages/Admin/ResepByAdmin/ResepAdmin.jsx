import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import IndexResep from "./IndexResep";
import CreateResep from "./CreateResep";

const ResepAdmin = () => {
  const data = [
    {
      label: "Show Resep",
      value: "show",
      icon: Square3Stack3DIcon,
      element: <IndexResep />,
    },
    {
      label: "Create Resep",
      value: "create",
      icon: PlusCircleIcon,
      element: <CreateResep />,
    },
  ];
  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Resep By Admin</h1>
      <p className="w-3/5 mb-4">
        Hai Admin, Silahkan Anda Menambahkan Resep pada menu Create Resep
        atau anda bisa melihat Resep anda pada menu Show Resep di bawah ini,
        dan anda harus menambahkan detail Resep pada masing masing Resep.
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

export default ResepAdmin;
