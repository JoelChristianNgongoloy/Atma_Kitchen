import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Typography,
  Alert,
  Spinner,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import {
    GetAllPenarikan,
    KonfirmPenarikan,
  } from "../../../api/AdminApi/apiKonfirmasiPenarikan";


const KonfirmasiPenarikan = () => {
const [Penarikan, setPenarikan] = useState([]);
const [error, setError] = useState(null);
const [isPending, setIsPending] = useState(false);
const [showModal, setShowModal] = useState(false);
const [selectedPenarikan, setSelectedPenarikan] = useState(null);

useEffect(() => {
    fetchPenarikan();
  }, []);

  const fetchPenarikan = () => {
    setIsPending(true);
    GetAllPenarikan()
      .then((data) => {
        setPenarikan(data);
        setIsPending(false);
      })
      .catch((err) => {
        setError(
          err.message || "Terjadi kesalahan saat mengambil data pesanan."
        );
        setIsPending(false);
      });
  };

const handleKonfirmasi = (id) => {
    setIsPending(true);
    setSelectedPenarikan(id);
    setShowModal(true);
};

const konfirmPenarikan = async () => {
    setIsPending(true);
    try {
        await KonfirmPenarikan(selectedPenarikan);
        fetchPenarikan();
        setIsPending(false);
        setShowModal(false);
        toast.success("Penarikan berhasil dikonfirmasi.");
    } catch (error) {
        setError(error.message || "Terjadi kesalahan saat mengkonfirmasi penarikan.");
        setIsPending(false);
        setShowModal(false);
    }
}

return (
    <div className="h-96 overflow-auto">
      <Card className="mx-h-80">
        <div className="flex justify-center">
          <Typography variant="h4" color="black">
            Konfirmasi Penarikan
          </Typography>
        </div>
        {error && (
          <Alert color="red" className="my-4">
            {error}
          </Alert>
        )}
        <div className="mt-6">
            {Penarikan.length > 0 ? (
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="px-16 py-2">ID Penarikan</th>
                        <th className="px-16 py-2">Nama User</th>
                        <th className="px-16 py-2">Tanggal Penarikan</th>
                        <th className="px-16 py-2">Jumlah Penarikan</th>
                        <th className="px-16 py-2">Status</th>
                        <th className="px-16 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {Penarikan.map((penarikan) => (
                        <tr key={penarikan.id_penarikan}>
                            <td className="border px-16 py-2">{penarikan.id_penarikan}</td>
                            <td className="border px-16 py-2">{penarikan.user.nama}</td>
                            <td className="border px-16 py-2">{penarikan.tanggal_penarikan}</td>
                            <td className="border px-16 py-2">{penarikan.total_penarikan}</td>
                            <td className="border px-16 py-2">{penarikan.status_penarikan}</td>
                            <td className="border px-16 py-2">
                            {penarikan.status_penarikan === 'Menunggu Konfirmasi' && (
                                <Button color="green" onClick={() => handleKonfirmasi(penarikan.id_penarikan)} ripple={true}>
                                    Konfirmasi
                                </Button>
                            )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
        <DialogHeader>Konfirmasi Penarikan</DialogHeader>
        <DialogBody>
          <Typography>
            Konfirmasi Penarikan?
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => setShowModal(false)} ripple={true}>
            Batal
          </Button>
          <Button color="green" onClick={konfirmPenarikan} ripple={true}>
            Yakin
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default KonfirmasiPenarikan;