import React, { useState, useEffect } from "react";
import { Button, Typography, Spinner, Card, Alert, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getDaftarPesanan, updatePesanan } from "../../../api/CustomerApi/Pesanan/KonfirmasiPesananApi";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UpdateStatus = () => {
  const [pesanan, setPesanan] = useState([]);
  const [selectedPesanan, setSelectedPesanan] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPesanan();
  }, []);

  const fetchPesanan = async () => {
    setIsPending(true);
    try {
      const data = await getDaftarPesanan();
      setPesanan(data);
      setIsPending(false);
    } catch (error) {
      setError(error.message || "Terjadi kesalahan saat mengambil data pesanan.");
      setIsPending(false);
    }
  };

  const handleSubmit = async () => {
    setIsPending(true);
    try {
      if (selectedPesanan) {
        await updatePesanan(selectedPesanan);
        fetchPesanan(); // Mengambil data baru setelah pembaruan status
        toast.success("Berhasil memperbarui status.");
        window.location.reload();
      } else {
        setError("Silakan pilih pesanan.");
      }
    } catch (error) {
      setError(error.message || "Terjadi kesalahan saat menyimpan data.");
      console.error(error);
    } finally {
      setIsPending(false);
      setShowModal(false); // Tutup modal setelah proses selesai
    }
  };

  const handleSelectPesanan = (id) => {
    setSelectedPesanan(id);
    setShowModal(true); // Tampilkan modal setelah pesanan dipilih
  };

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h3" color="black" className="text-center mb-8">
        Konfirmasi Pesanan
      </Typography>
      {error && (
        <Alert color="red" className="my-4">
          {error}
        </Alert>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pesanan?.length > 0 ? (
          pesanan.map((item) => (
            <Card key={item.id} className="p-4 shadow-md">
              <div className="flex justify-between">
                <Typography variant="h6" color="black">
                  ID Pesanan: {item.id}
                </Typography>
                <Typography variant="h6" color="black">
                  Status: {item.status_pesanan}
                </Typography>
              </div>
              <Typography variant="paragraph" color="black" className="mt-2">
                Tanggal Transaksi: {item.tanggal_pesan}
              </Typography>
              <Typography variant="paragraph" color="black">
                Harga: {item.total_harga}
              </Typography>
              <Typography variant="paragraph" color="black">
                Nama Customer: {item.customer.nama}
              </Typography>
              <Typography variant="paragraph" color="black">
                Alamat: {item.alamat.alamat_customer}
              </Typography>
              <Typography variant="paragraph" color="black">
                Kode Pos: {item.alamat.kode_pos}
              </Typography>
              <Button onClick={() => handleSelectPesanan(item.id)} className="mt-4 w-full">
                Konfirmasi
              </Button>
            </Card>
          ))
        ) : (
          <Typography variant="paragraph" color="black" className="text-center">
            Tidak ada pesanan yang perlu dikonfirmasi.
          </Typography>
        )}
      </div>

      <Dialog open={showModal} handler={() => setShowModal(false)}>
        <DialogHeader>Konfirmasi Selesaikan Pesanan</DialogHeader>
        <DialogBody>
          <Typography>Apakah Anda yakin ingin menyelesaikan status pesanan?</Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            onClick={() => setShowModal(false)}
            ripple={false}
          >
            Batal
          </Button>
          <Button
            color="green"
            onClick={handleSubmit}
            ripple={true}
          >
            Yakin
          </Button>
        </DialogFooter>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default UpdateStatus;
