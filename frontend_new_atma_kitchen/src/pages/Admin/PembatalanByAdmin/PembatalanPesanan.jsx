import React, { useState, useEffect } from "react";
import { Button, Typography, Spinner, Card, Alert, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getDaftarPesanan, updatePesanan } from "../../../api/AdminApi/apiPembatalan";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PembatalanPesanan = () => {
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
    <div className="h-96 overflow-auto">
      <Card className="mx-h-80">
        <div className="flex justify-center">
          <Typography variant="h4" color="black">
            Selesaikan Pesanan
          </Typography>
        </div>
        {error && (
          <Alert color="red" className="my-4">
            {error}
          </Alert>
        )}
        <div className="mt-6">
          <Typography variant="h5" color="black" className="mb-4">
            Pilih Pesanan
          </Typography>
          {pesanan?.length > 0 ? (
            pesanan.map((item) => (
              <Card
                key={item.id}
                className={`mb-4 p-4 ${selectedPesanan === item.id ? "border-2 border-blue-500" : ""}`}
              >
                <Typography variant="paragraph" color="black">
                  ID Pesanan: {item.id}
                </Typography>
                <Typography variant="paragraph" color="black">
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
                <Typography variant="paragraph" color="black">
                  Status: {item.status_pesanan}
                </Typography>
                <Button onClick={() => handleSelectPesanan(item.id)} className="mt-2">
                  Batalkan
                </Button>
              </Card>
            ))
          ) : (
            <Typography variant="paragraph" color="black">
              Tidak ada pesanan yang perlu dibatalkan.
            </Typography>
          )}
        </div>
      </Card>

      <Dialog open={showModal} handler={() => setShowModal(false)}>
        <DialogHeader>Konfirmasi Pembatalan</DialogHeader>
        <DialogBody>
          <Typography>Apakah Anda yakin ingin membatalkan status pesanan?</Typography>
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

export default PembatalanPesanan;
