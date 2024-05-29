import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
  Spinner,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { Square3Stack3DIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import IndexAlamat from "./IndexAlamat";
import CreateAlamat from "./CreateAlamat";

const AlamatCustomer = () => {
  const data = [
    {
      label: "Show Alamat",
      value: "show",
      icon: Square3Stack3DIcon,
      element: <IndexAlamat />,
    },
    {
      label: "Create Alamat",
      value: "create",
      icon: PlusCircleIcon,
      element: <CreateAlamat />,
    },
  ];

  return (
    <div>
      <div>
        <div className="flex justify-center">
          <h1 className="font-bold text-3xl mb-4">Penitip By MO</h1>
        </div>
        <Tabs value="show">
          <TabsHeader className="w-full">
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

export default AlamatCustomer;
