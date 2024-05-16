import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
  Spinner
} from "@material-tailwind/react";

import { UpdateProduk } from "../../../api/AdminApi/apiProduk";

const EditProduk = ({ produk, onClose }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [isPending, setIsPending] = useState(false);
  const [dataProduk, setDataProduk] = useState(produk);
  const handleChange = (event) => {
    setDataProduk({ ...dataProduk, [event.target.name]: event.target.value });
  };
  const submitDataProduk = (event) => {
    event.preventDefault();
    setIsPending(true);
    UpdateProduk(dataProduk)
      .then((response) => {
        setIsPending(false);
        handleClose();
        console.log(response.message);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(err.message);
      });
  };
  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="blue">
        Edit Produk
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Produk</DialogHeader>
        <form action="" onSubmit={submitDataProduk}>
          <DialogBody>
            <div>
              <Typography color="black" className="mb-4">
                Nama Produk
              </Typography>
              <Input
                size="lg"
                placeholder="Masukan Nama Produk Anda disini"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
                type="text"
                name="nama_produk"
                onChange={handleChange}
                value={dataProduk?.nama_produk}
              />
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div className="mr-4">
                <Typography variant="h5" color="black" className="mb-4">
                  Stok Produk
                </Typography>
                <Input
                  size="lg"
                  placeholder="Masukan stok Produk Anda disini"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  type="number"
                  name="stok_produk"
                  onChange={handleChange}
                  value={dataProduk?.stok_produk}
                />
              </div>
              <div>
                <Typography color="black" className="mb-4">
                  Harga Produk
                </Typography>
                <Input
                  size="lg"
                  placeholder="Masukan Harga Produk Anda disini"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  type="number"
                  name="harga_produk"
                  onChange={handleChange}
                  value={dataProduk?.harga_produk}
                />
              </div>
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div className="mr-4">
                <Typography variant="h5" color="black" className="mb-4">
                  Status Produk
                </Typography>
                <select
                  name="status_produk"
                  required
                  className="w-full h-14 border-t-blue-gray-200 rounded-md"
                  id=""
                  onChange={handleChange}
                >
                  <option value="">{dataProduk?.status_produk}</option>
                  <option value="Pre Order">Pre Order</option>
                  <option value="Ready Stock">Ready Stock</option>
                </select>
              </div>
              <div>
                <Typography color="black" className="mb-4">
                  Deskripsi Produk
                </Typography>
                <Textarea
                  name="deskripsi_produk"
                  required
                  onChange={handleChange}
                  placeholder="Masukkan Deskripsi Produk..."
                  value={dataProduk?.deskripsi_produk}
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button type="submit">
              {isPending ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : (
                <span>Simpan</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default EditProduk;
