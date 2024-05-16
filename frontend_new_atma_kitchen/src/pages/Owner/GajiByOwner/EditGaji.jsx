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

import { UpdateGaji } from "../../../api/OwnerApi/apiUbahGaji";

const EditGaji = ({ pegawai, onClose }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [isPending, setIsPending] = useState(false);

  const [dataPegawai, setDataPegawai] = useState(pegawai);
  const handleChange = (event) => {
    setDataPegawai({ ...dataPegawai, [event.target.name]: event.target.value });
  };

  const submitDataPegawai = (event) => {
    event.preventDefault();
    setIsPending(true);
    UpdateGaji(dataPegawai)
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
        Edit Pegawai
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Pegawai</DialogHeader>
        <form action="" onSubmit={submitDataPegawai}>
          <DialogBody>
            <div>
              <Typography variant="h5" color="black" className="mb-4">
                Gaji Pegawai
              </Typography>
              <Input
                size="lg"
                placeholder="Masukan Gaji Pegawai disini"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
                type="number"
                name="gaji_pegawai"
                onChange={handleChange}
                value={dataPegawai?.gaji_pegawai}
              />
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div className="mr-4">
                <Typography variant="h5" color="black" className="mb-4">
                  Bonus Gaji
                </Typography>
                <Input
                  size="lg"
                  placeholder="Masukan username Pegawai"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  type="number"
                  name="bonus_gaji"
                  onChange={handleChange}
                  value={dataPegawai?.bonus_gaji}
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

export default EditGaji;
