import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import TampilPending from "./TampilPesan/TampilPending";

const TampilPesanan = () => {
  const [activeTab, setActiveTab] = React.useState("pending");
  const data = [
    {
      label: "Pending",
      value: "pending",
      element: <TampilPending />,
    },
    {
      label: "React",
      value: "react",
      element: <div></div>,
    },
    {
      label: "Vue",
      value: "vue",
      element: <div></div>,
    },
    {
      label: "Angular",
      value: "angular",
      element: <div></div>,
    },
    {
      label: "Svelte",
      value: "svelte",
      element: <div></div>,
    },
  ];
  return (
    <div className="flex flex-col items-center px-4 py-5 lg:px-20 lg:py-10">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl">Tampil Pesanan</h1>
      </div>
      <div className="w-1/2">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => setActiveTab(value)}
                className={activeTab === value ? "text-gray-900" : ""}
              >
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

export default TampilPesanan;
