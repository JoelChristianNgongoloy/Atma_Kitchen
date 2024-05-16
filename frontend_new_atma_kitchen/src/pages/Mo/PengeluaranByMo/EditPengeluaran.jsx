import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";

import { UpdatePengeluaran } from "../../../api/MoApi/apiPengeluaran";

const EditPengeluaran = ({ pengeluaran, onClose }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [isPending, setIsPending] = useState(false);
  const [dataPengeluaran, setDataPengeluaran] = useState(pengeluaran);

  const handleChange = (event) => {
    setDataPengeluaran({
      ...dataPengeluaran,
      [event.target.name]: event.target.value,
    });
  };

  const submitDataPengeluaran = (event) => {
    event.preventDefault();
    setIsPending(true);

    UpdatePengeluaran(dataPengeluaran)
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
        Edit Pengeluaran
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Pengeluaran</DialogHeader>
        <form action="" onSubmit={submitDataPengeluaran}>
          <DialogBody>
            <div>
              <Typography variant="h5" color="black" className="mb-4">
                Nama Pengeluaran
              </Typography>
              <Input
                size="lg"
                placeholder="Masukan Nama Pengeluaran disini"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
                type="text"
                name="nama_pengeluaran"
                onChange={handleChange}
                value={dataPengeluaran?.nama_pengeluaran}
                
              />
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div className="mr-4">
                <Typography variant="h5" color="black" className="mb-4">
                  Tanggal Pengeluaran
                </Typography>
                <Input
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  type="date"
                  name="tanggal_pengeluaran"
                  value={dataPengeluaran?.tanggal_pengeluaran}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Typography variant="h5" color="black" className="mb-4">
                  Total Pengeluaran
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
                  name="total_pengeluaran"
                  value={dataPengeluaran?.total_pengeluaran}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div className="mr-4">
                <Typography variant="h5" color="black" className="mb-4">
                  qty Pengeluaran
                </Typography>
                <Input
                  size="lg"
                  placeholder="Masukan qty Pengeluaran"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  type="number"
                  name="qty_pengeluaran"
                  value={dataPengeluaran?.qty_pengeluaran}
                  onChange={handleChange}
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
              <span>Tidak</span>
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

export default EditPengeluaran;
