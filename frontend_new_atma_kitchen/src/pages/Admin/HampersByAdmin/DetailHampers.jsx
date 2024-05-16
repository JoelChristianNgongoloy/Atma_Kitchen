import React from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import EditDetailHampers from "./EditDetailHampers";
const TABLE_HEAD = ["Nama Produk", "Stok Produk", "Delete", "Edit"];

const TABLE_ROWS = [
  {
    nama_produk: "Kue Lapis Legit",
    stok_produk: "12 Loyang",
  },
  {
    nama_produk: "Kue Lapis Surabaya",
    stok_produk: "23/04/18",
  },
];

const DetailHampers = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Detail Hampers By Admin</h1>
      <p className="w-3/5 mb-4">
        Hai Admin, Silahkan Anda Menambahkan Detail Hampers pada Inputan Detail
        Hampers di bawah ini dan anda bisa melihat Detail Hampers di bawah ini.
      </p>

      <div className="flex justify-center">
        <Typography variant="h4">Tambah Detail Hampers Disini</Typography>
      </div>
      <div className="mt-2 mb-4">
        <form action="">
          <div>
            <Typography>Nama Produk</Typography>
            <Select label="Nama Produknya apa???" required>
              <Option>Kue Lapis Legit</Option>
            </Select>
          </div>
          <div className="mt-3">
            <Typography>Stok yang di ambil</Typography>
            <Select label="Stok Yang di ambil berapa ???" required>
              <Option>2 Loyang</Option>
            </Select>
          </div>
          <div className="mt-3 mb-3 flex justify-between">
            <div></div>
            <Button type="submit" color="blue">
              Simpan
            </Button>
          </div>
        </form>
      </div>

      <Card className="h-full w-full overflow-scroll">
        <div className="flex justify-between">
          <div></div>
          <div className="w-full md:w-72 mt-2 mb-5 ">
            <Input
              label="Search Detail..."
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <table className="w-full min-w-max table-auto text-left">
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
            {TABLE_ROWS.map(({ nama_produk, stok_produk }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={nama_produk}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {nama_produk}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {stok_produk}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Button onClick={handleOpen} variant="gradient" color="red">
                      Delete Detail Hampers
                    </Button>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <EditDetailHampers />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Hapus Detail Hampers</DialogHeader>
          <DialogBody>
            Apakah Anda Yakin Ingin menghapus Detail Hampers Ini???
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Tidak</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Langsung Hapus Aje</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </Card>
    </div>
  );
};

export default DetailHampers;
