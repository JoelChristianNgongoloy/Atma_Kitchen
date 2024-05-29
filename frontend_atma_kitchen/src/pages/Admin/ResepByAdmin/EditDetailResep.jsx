import React, { useState } from "react";
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

const EditDetailResep = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="blue">
        Edit Detail Resep
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Detail Resep</DialogHeader>
        <form action="">
          <DialogBody>
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
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
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

export default EditDetailResep;
