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

import { UpdateBahanBaku } from "../../../api/AdminApi/apiBahanBaku";

const EditBahanBaku = ({ bahan, onClose }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [isPending, setIsPending] = useState(false);
  const [dataBahan, setDataBahan] = useState(bahan);
  const handleChange = (event) => {
    setDataBahan({ ...dataBahan, [event.target.name]: event.target.value });
  };

  const submitDataBahan = (event) => {
    event.preventDefault();
    setIsPending(true);
    UpdateBahanBaku(dataBahan)
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
        Edit Bahan Baku
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Bahan Baku</DialogHeader>
        <form action="" onSubmit={submitDataBahan}>
          <DialogBody>
            <div>
              <Typography variant="h5" color="black" className="mb-4">
                Nama Bahan Baku
              </Typography>
              <Input
                size="lg"
                placeholder="Masukan Nama Bahan Baku Anda disini"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
                type="text"
                name="nama_bahan_baku"
                onChange={handleChange}
                value={dataBahan?.nama_bahan_baku}
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
  );
};

export default EditBahanBaku;
