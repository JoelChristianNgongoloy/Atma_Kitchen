import React from "react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import CakeIndex from "./ComponenCatalog/CakeIndex";
import RotiIndex from "./ComponenCatalog/RotiIndex";
import MinumanIndex from "./ComponenCatalog/MinumanIndex";
import HampersIndex from "./ComponenCatalog/HampersIndex";

const CatalogPage = () => {
  const data = [
    {
      label: "Kue",
      value: "cake",
      element: <CakeIndex />,
    },
    {
      label: "Roti",
      value: "roti",
      element: <RotiIndex />,
    },
    {
      label: "Minuman",
      value: "minuman",
      element: <MinumanIndex />,
    },
    {
      label: "Hampers",
      value: "hampers",
      element: <HampersIndex />,
    },
  ];
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="px-96 py-20">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl mb-4">Catalog Produk</h1>
          <h1 className="text-xl">
            Selamat datang di Atma Kitchen, tempat Anda menemukan berbagai macam
            kelezatan yang sempurna untuk setiap momen. Kami menawarkan:
          </h1>
        </div>
        <Tabs value="cake">
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
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

export default CatalogPage;
