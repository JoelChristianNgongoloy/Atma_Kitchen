import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Select,
  Textarea,
  Option,
  Spinner,
} from "@material-tailwind/react";

import { UpdateHampers } from "../../../api/AdminApi/apiHampers";

const EditHampers = ({ hampers, onClose }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [isPending, setIsPending] = useState(false);
  const [dataHampers, setDataHampers] = useState(hampers);

  const handleChange = (event) => {
    setDataHampers({ ...dataHampers, [event.target.name]: event.target.value });
  };

  const submitDataHampers = (event) => {
    event.preventDefault();
    setIsPending(true);
    UpdateHampers(dataHampers)
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
        Edit Hampers
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Hampers</DialogHeader>
        <form action="" onSubmit={submitDataHampers}>
          <DialogBody>
            <div>
              <Typography variant="h5" color="black" className="mb-4">
                Nama Hampers
              </Typography>
              <Input
                size="lg"
                placeholder="Masukan Nama Hampers Anda disini"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
                type="text"
                name="nama_hampers"
                onChange={handleChange}
                value={dataHampers?.nama_hampers}
              />
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div>
                <Typography variant="h5" color="black" className="mb-4">
                  Harga Hampers
                </Typography>
                <Input
                  size="lg"
                  placeholder="Masukan Harga Hampers Anda disini"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  type="number"
                  name="harga_hampers"
                  onChange={handleChange}
                  value={dataHampers?.harga_hampers}
                />
              </div>
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div className="mr-4">
                <Typography variant="h5" color="black" className="mb-4">
                  Stok Hampers
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
                  name="stok_hampers"
                  onChange={handleChange}
                  value={dataHampers?.stok_hampers}
                />
              </div>
              <div>
                <Typography variant="h5" color="black" className="mb-4">
                  Deskripsi Hampers
                </Typography>
                <Textarea
                  required
                  name="deskripsi_hampers"
                  onChange={handleChange}
                  placeholder="Masukkan Hampers Produk..."
                  value={dataHampers?.deskripsi_hampers}
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
              {isPending ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : (
                <span>Simpan</span>
              )}
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default EditHampers;
