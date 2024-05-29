import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { sendBukti } from "../../../api/CustomerApi/apiPesanan";

const KirimBukti = ({ pesanan }) => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState({ bukti_pembayaran: null, id_pesanan: pesanan.id_pesanan });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    if (event.target.name === 'bukti_pembayaran') {
      setData({ ...data, bukti_pembayaran: event.target.files[0] });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const handleSendBukti = () => {
    setIsPending(true);

    const formData = new FormData();
    formData.append("bukti_pembayaran", data.bukti_pembayaran);
    formData.append("id_pesanan", data.id_pesanan);
  
    console.log(data.bukti_pembayaran); // Debugging line
    console.log(data.id_pesanan); // Debugging line

    sendBukti(formData)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        handleClose();
      })
      .catch((error) => {
        setIsPending(false);
        console.error("Error sending bukti:", error);
      });
  };

  return (
    <>
      <button
        className="mt-4 ml-4 bg-purple-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-purple-600"
        onClick={handleOpen}
      >
        Kirim bukti pembayaran
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        anim={true}
        animType="fade"
        size="lg"
      >
        <DialogHeader>Kirim Bukti Pembayaran</DialogHeader>
        <DialogBody>
          <div className="mb-4">
            <Input
              name="bukti_pembayaran"
              type="file"
              onChange={handleChange}
              label="Bukti Pembayaran"
              color="blue"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            color="blue"
            onClick={handleSendBukti}
          >
            {isPending ? (
              <>
                <Spinner size="sm" />
                <span className="ml-2">Loading...</span>
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default KirimBukti;
