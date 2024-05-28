import React from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { getBukti } from "../../../api/index";
import { konfirmasiPesanan } from "../../../api/MoApi/apiPesanan";


const ShowBukti = ({ isOpen, onClose, bukti, orderId }) => {
  const buktiURL = getBukti(bukti); // Get the URL of the bukti_pembayaran image
  const handleKonfirmasi = () => {console.log("Order detail clicked for order ID:", orderId);
    konfirmasiPesanan(orderId)
      .then((response) => {
        console.log(response.message);
        onClose();
      })
      .catch((error) => {
        console.error("Error confirming order:", error);
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogHeader>Bukti Pembayaran</DialogHeader>
      <DialogBody>
        <img src={buktiURL} alt="Bukti Pembayaran" style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </DialogBody>
      <DialogFooter>
        <Button className="mr-4" color="blue" onClick={handleKonfirmasi}>Konfirmasi Pesanan</Button>
        <Button color="blue" onClick={onClose}>Close</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ShowBukti;
