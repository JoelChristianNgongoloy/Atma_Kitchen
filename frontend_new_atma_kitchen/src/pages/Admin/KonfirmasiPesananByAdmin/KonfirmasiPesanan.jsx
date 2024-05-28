import React, { useState, useEffect } from "react";
import { Button, Card, Typography, Alert, Spinner, Input, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { GetAllPesananSudahLunas, UpdateStatusPesanan } from "../../../api/AdminApi/apiKonfirmasiPesanan";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const KonfirmasiPesanan = () => {
  const [pesananSudahLunas, setPesananSudahLunas] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [jumlahTransaksi, setJumlahTransaksi] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPesanan, setSelectedPesanan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPesananSudahLunas();
  }, []);

  const fetchPesananSudahLunas = () => {
    setIsPending(true);
    GetAllPesananSudahLunas()
      .then((data) => {
        setPesananSudahLunas(data);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message || "Terjadi kesalahan saat mengambil data pesanan.");
        setIsPending(false);
      });
  };

  const handleKonfirmasi = async () => {
    setIsPending(true);
    try {
      const transaksi = jumlahTransaksi[selectedPesanan];
      if (!transaksi || transaksi <= 0) {
        setError("Jumlah transaksi harus lebih dari 0.");
        setIsPending(false);
        setShowModal(false);
        return;
      }
      await UpdateStatusPesanan(selectedPesanan, transaksi);
      fetchPesananSudahLunas();
      toast.success("Berhasil menginputkan jumlah transaksi!");
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      setError(error.message || "Terjadi kesalahan saat mengkonfirmasi pesanan.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleInputChange = (id, value) => {
    setJumlahTransaksi((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleConfirm = (id) => {
    setSelectedPesanan(id);
    setShowModal(true);
  };

  return (
    <div className="h-96 overflow-auto">
      <Card className="mx-h-80">
        <div className="flex justify-center">
          <Typography variant="h4" color="black">
            Konfirmasi Pesanan
          </Typography>
        </div>
        {error && (
          <Alert color="red" className="my-4">
            {error}
          </Alert>
        )}
        <div className="mt-6">
          {pesananSudahLunas?.length > 0 ? (
            pesananSudahLunas.map((pesanan) => (
              <Card key={pesanan.id} className="mb-4 p-4">
                <Typography variant="paragraph" color="black">
                  ID Pesanan: {pesanan.id}
                </Typography>
                <Typography variant="paragraph" color="black">
                  Jumlah Produk: {pesanan.jumlah_produk}
                </Typography>
                <Typography variant="paragraph" color="black">
                  Total Harga: {pesanan.total_harga}
                </Typography>
                <Typography variant="paragraph" color="black">
                  Tanggal Pesan: {pesanan.tanggal_pesan}
                </Typography>
                <Typography variant="paragraph" color="black">
                    Nama Customer: {pesanan.customer.nama}
                  </Typography>
                  <Typography variant="paragraph" color="black">
                    Alamat: {pesanan.alamat.alamat_customer}
                  </Typography>
                <Input
                  type="number"
                  placeholder="Masukkan Jumlah Transaksi"
                  value={jumlahTransaksi[pesanan.id] || ""}
                  onChange={(e) => handleInputChange(pesanan.id, e.target.value)}
                  className="mt-2"
                />
                <Button onClick={() => handleConfirm(pesanan.id)} className="mt-2">
                  Konfirmasi
                </Button>
              </Card>
            ))
          ) : (
            <Typography variant="paragraph" color="black">
              Tidak ada pesanan yang perlu dikonfirmasi.
            </Typography>
          )}
        </div>
        {isPending && (
          <div className="flex justify-center mt-6">
            <Spinner />
            <Typography variant="h6" color="black" className="ml-2">
              Memproses...
            </Typography>
          </div>
        )}
      </Card>

      {/* Modal Konfirmasi */}
      <Dialog open={showModal} handler={() => setShowModal(false)}>
        <DialogHeader>Konfirmasi Jumlah Transaksi</DialogHeader>
        <DialogBody>
          <Typography>Apakah anda yakin ingin menginput jumlah transaksi?</Typography>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => setShowModal(false)} ripple={true}>
            Batal
          </Button>
          <Button color="green" onClick={handleKonfirmasi} ripple={true}>
            Yakin
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default KonfirmasiPesanan;
