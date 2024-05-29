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
import EditDetailResep from "./EditDetailResep";
const TABLE_HEAD = [
  "Nama Bahan Baku",
  "Nama Resep",
  "Jumlah",
  "Delete",
  "Edit",
];

const TABLE_ROWS = [
  {
    nama_bahan_baku: "Tepung",
    nama_resep: "Kue Lapis Legit",
    jumlah: "12",
    satuan: "gr",
  },
  {
    nama_bahan_baku: "Telur",
    nama_resep: "Kue Lapis Legit",
    jumlah: "5",
    satuan: "butir",
  },
];

const DetailResep = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Detail Resep By Admin</h1>
      <p className="w-3/5 mb-4">
        Hai Admin, Silahkan Anda Menambahkan Detail Resep pada Inputan Detail
        Hampers di bawah ini dan anda bisa melihat Detail Resep di bawah ini.
      </p>

      <div className="flex justify-center">
        <Typography variant="h4">Tambah Detail Resep Disini</Typography>
      </div>
      <div className="mt-2 mb-4">
        <form action="">
          <div>
            <Typography>Nama Bahan Baku</Typography>
            <Select label="Nama Bahan Bakunya apa???" required>
              <Option>Tepung</Option>
            </Select>
          </div>
          <div className="mt-3">
            <Typography>Jumlah Yang akan dipakai</Typography>
            <Input
              size="lg"
              placeholder="Jumlah Yang Akan Dipakai"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="number"
            />
          </div>
          <div className="mt-3">
            <Typography>Satuan Yang dipakai</Typography>
            <Input
              size="lg"
              placeholder="Satuan Yang Akan Dipakai"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="text"
            />
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
            {TABLE_ROWS.map(
              ({ nama_bahan_baku, nama_resep, jumlah, satuan }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={nama_bahan_baku}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nama_bahan_baku}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nama_resep}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {jumlah} {satuan}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Button
                        onClick={handleOpen}
                        variant="gradient"
                        color="red"
                      >
                        Delete Detail Resep
                      </Button>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <EditDetailResep />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Hapus Detail Resep</DialogHeader>
          <DialogBody>
            Apakah Anda Yakin Ingin menghapus Detail Resep Ini???
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

export default DetailResep;
