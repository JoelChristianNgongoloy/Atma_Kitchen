import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import IndexHampers from "./IndexHampers";
import CreateHampers from "./CreateHampers";

const HampersAdmin = () => {
  const data = [
    {
      label: "Show Hampers",
      value: "show",
      icon: Square3Stack3DIcon,
      element: <IndexHampers />,
    },
    {
      label: "Create Hampers",
      value: "create",
      icon: PlusCircleIcon,
      element: <CreateHampers />,
    },
  ];
  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Hampers By Admin</h1>
      <p className="w-3/5 mb-4">
        Hai Admin, Silahkan Anda Menambahkan Hampers pada menu Create Hampers
        atau anda bisa melihat Hampers anda pada menu Show Hampers di bawah ini,
        dan anda harus menambahkan detail hampers pada masing masing hampers.
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

export default HampersAdmin;
