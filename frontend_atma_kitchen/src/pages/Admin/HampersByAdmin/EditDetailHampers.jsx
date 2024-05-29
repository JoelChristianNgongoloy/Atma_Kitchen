import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography, 
  Select,
  Option,
} from "@material-tailwind/react";

const EditDetailHampers = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="blue">
        Edit Detail Hampers
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Detail Hampers</DialogHeader>
        <form action="">
          <DialogBody>
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

export default EditDetailHampers;
