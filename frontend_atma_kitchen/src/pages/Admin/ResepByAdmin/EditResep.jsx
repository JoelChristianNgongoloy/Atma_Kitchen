import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";

import { UpdateResep, GetAllProduk } from "../../../api/AdminApi/apiResep";
const EditResep = ({ resep, onClose }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [isPending, setIsPending] = useState(false);
  const [dataResep, setDataResep] = useState(resep);
  const handleChange = (event) => {
    setDataResep({ ...dataResep, [event.target.name]: event.target.value });
  };
  const [produks, setProduks] = useState([]);

  const fetchProduk = () => {
    setIsPending(true);
    GetAllProduk()
      .then((response) => {
        setProduks(response);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const submitDataResep = (event) => {
    event.preventDefault();
    setIsPending(true);
    UpdateResep(dataResep)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        handleClose();
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
        Edit Resep
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Resep</DialogHeader>
        <form action="" onSubmit={submitDataResep}>
          <DialogBody>
            <div>
              <Typography variant="h5" color="black" className="mb-4">
                Nama Resep
              </Typography>
              <Input
                size="lg"
                placeholder="Masukan Nama Resep Anda disini"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
                type="text"
                name="nama_resep"
                onChange={handleChange}
                value={dataResep?.nama_resep}
              />
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div className="">
                <Typography variant="h5" color="black" className="mb-4">
                  Nama Produk
                </Typography>
                <select
                  name="id_produk"
                  required
                  className="w-full h-11 rounded-md border border-blue-gray-200 focus:border-gray-900"
                  size="lg"
                  onChange={handleChange}
                >
                  <option value="">{dataResep?.produk.nama_produk}</option>
                  {produks?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.nama_produk}
                    </option>
                  ))}
                </select>
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
              Tidak
            </Button>
            <Button variant="gradient" color="green" type="submit">
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

export default EditResep;
