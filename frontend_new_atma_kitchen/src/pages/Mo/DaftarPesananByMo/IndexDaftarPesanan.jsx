import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Input,
  Spinner,
  Checkbox,
  Button,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  GetAllDaftarPesanan,
  updatePesananStatus,
} from "../../../api/MoApi/apiDaftarPesanan";
import toast from "react-hot-toast";

const TABLE_HEAD = [
  "Check",
  "Daftar Pesanan",
  "Produk",
  "Jumlah Produk",
  "Tanggal Pesan",
  "Total Harga",
  "Bahan Baku",
  "Proses Produk",
];

const IndexDaftarPesanan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetAllDaftarPesanan();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProcessOrder = async (order) => {
    setCurrentOrder(order);
    setOpen(true);
  };

  const handleConfirmProcess = async () => {
    try {
      const result = await updatePesananStatus(currentOrder.id_pesanan);
      toast.success(result.message);
      // Refresh the data after update
      const updatedData = await GetAllDaftarPesanan();
      setData(updatedData);
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) return <Spinner />;
  if (error) return <Alert color="red">{error.message}</Alert>;

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between mt-2">
        <div></div>
        <Input
          label="Search Daftar Pesanan"
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        />
      </div>
      <table className="w-full min-w-max table-auto text-center">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="flex justify-center">
                  <Checkbox defaultChecked />
                </div>
              </td>
              <td className="text-center">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.id_pesanan}
                </Typography>
              </td>
              <td className="text-center">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.detail_pesanan.map((dp) => dp.nama_produk).join(", ")}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.jumlah_produk}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.tanggal_pesan}
                </Typography>
              </td>
              <td className="">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {item.total_harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </Typography>
              </td>
              <td className="text-left flex justify-center">
                <ul className="font-normal">
                  {item.detail_pesanan.map((dp) =>
                    dp.resep.map((r) => (
                      <li key={r.id}>
                        {`- ${r.bahan_baku} ${r.jumlah}${r.satuan}`}
                        {/* {r.jumlah_bahan_baku < r.jumlah && (
                          <span className="text-red-500">
                            {" "}
                            (WARNING: STOK {r.jumlah_bahan_baku} {r.satuan})
                          </span>
                        )} */}
                      </li>
                    ))
                  )}
                </ul>
              </td>
              <td>
                <Button onClick={() => handleProcessOrder(item)}>
                  Proses Makanan
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={open} handler={handleClose}>
        <DialogHeader>Rekap Bahan Baku</DialogHeader>
        <DialogBody divider>
          {currentOrder && (
            <ul>
              {currentOrder.detail_pesanan.map((dp) =>
                dp.resep.map((r) => (
                  <li key={r.id}>
                    {`${r.bahan_baku} ${r.jumlah}${r.satuan}`}
                    {r.jumlah_bahan_baku < r.jumlah && (
                      <span className="text-red-500">
                        {" "}
                        (WARNING: STOK {r.jumlah_bahan_baku} {r.satuan})
                      </span>
                    )}
                  </li>
                ))
              )}
            </ul>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleConfirmProcess}
          >
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default IndexDaftarPesanan;
