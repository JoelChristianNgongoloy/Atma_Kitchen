import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Spinner
} from "@material-tailwind/react";

import { UpdatePenitip } from "../../../api/MoApi/apiPenitip";
const EditPenitip = ({penitip, onClose}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      onClose();
    };
    const [isPending, setIsPending] = useState(false);
    const [dataPenitip, setDataPenitip] = useState(penitip);

  const handleChange = (event) => {
    setDataPenitip({ ...dataPenitip, [event.target.name]: event.target.value });
  };

  const submitdataPenitip = (event) => {
    event.preventDefault();
    setIsPending(true);
    UpdatePenitip(dataPenitip)
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
        Edit Penitip
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Penitip</DialogHeader>
        <form action="" onSubmit={submitdataPenitip}>
          <DialogBody>
            <div>
              <Typography variant="h5" color="black" className="mb-4">
                Nama Penitip
              </Typography>
              <Input
                size="lg"
                placeholder="Masukan Nama Penitip disini"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
                type="text"
                name="nama_penitip"
                onChange={handleChange}
                value={dataPenitip?.nama_penitip}
              />

              <Input
                size="lg"
                placeholder="Masukan Nama Penitip disini"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
                type="date"
                name="tanggal_menitip"
                onChange={handleChange}
                value={dataPenitip?.tanggal_menitip}
              />
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
  )
}

export default EditPenitip;
