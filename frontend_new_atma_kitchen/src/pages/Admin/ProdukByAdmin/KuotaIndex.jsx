import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Typography,
  Button,
  Input,
  Spinner,
} from "@material-tailwind/react";

import { GetKuota, AddKuota } from "../../../api/AdminApi/apiProduk";

const KuotaIndex = () => {
  const { id } = useParams();
  const [kuota, setKuota] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newKuota, setNewKuota] = useState({
    tanggal_kuota: "",
    loyang: 0,
  });

  const fetchKuota = async () => {
    setIsLoading(true);
    try {
      const data = await GetKuota(id);
      setKuota(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKuota();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewKuota({ ...newKuota, [name]: value });
  };

  const handleAddKuota = async () => {
    setIsLoading(true);
    try {
      await AddKuota(id, newKuota);
      fetchKuota();
      setNewKuota({ tanggal_kuota: "", loyang: 0 });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between">
        <div className="w-full md:w-72 mt-2 mb-5 items-center">
          <h2 className="font-bold text-center align-middle">Kuota Produk</h2>
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : (
        <>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Tanggal Kuota
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Loyang
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {kuota.map((item, index) => (
                <tr key={index}>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.tanggal_kuota}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.loyang}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <div>
              <Input
                type="date"
                name="tanggal_kuota"
                label="Tanggal Kuota"
                onChange={handleInputChange}
                value={newKuota.tanggal_kuota}
              />
            </div>
            <div className="mt-4">
              <Input
                type="number"
                name="loyang"
                label="Loyang"
                onChange={handleInputChange}
                value={newKuota.loyang}
              />
            </div>
            <Button
              onClick={handleAddKuota}
              variant="gradient"
              color="blue"
              className="mt-4"
            >
              Tambah Kuota
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default KuotaIndex;
