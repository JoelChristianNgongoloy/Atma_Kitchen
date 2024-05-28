import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Spinner, Card, Alert, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { GetAllPesananPerluInput, UpdateJarakPengiriman } from "../../../api/AdminApi/apiInputJarak";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InputJarak = () => {
  const [pesananPerluInput, setPesananPerluInput] = useState([]);
  const [selectedPesanan, setSelectedPesanan] = useState("");
  const [jarakPengiriman, setJarakPengiriman] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPesananPerluInput();
  }, []);

  const fetchPesananPerluInput = () => {
    setIsPending(true);
    GetAllPesananPerluInput()
      .then((data) => {
        setPesananPerluInput(data);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message || "Terjadi kesalahan saat mengambil data pesanan.");
        setIsPending(false);
      });
  };

  const handleSubmit = async () => {
    setIsPending(true);
    try {
      if (selectedPesanan && jarakPengiriman) {
        await UpdateJarakPengiriman(selectedPesanan, jarakPengiriman);
        setSelectedPesanan("");
        setJarakPengiriman("");
        fetchPesananPerluInput();
        toast.success("Berhasil Menginputkan Jarak!");
        setShowModal(false);
        window.location.reload();
      } else {
        setError("Pesanan dan jarak pengiriman harus diisi.");
      }
    } catch (error) {
      setError(error.message || "Terjadi kesalahan saat menyimpan data.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleSelectPesanan = (id) => {
    setSelectedPesanan(id);
  };

  return (
    <div className="h-96 overflow-auto">
      <Card className="mx-h-80">
        <div className="flex justify-center">
          <Typography variant="h4" color="black">
            Input Jarak Pengiriman
          </Typography>
        </div>
        {error && (
          <Alert color="red" className="my-4">
            {error}
          </Alert>
        )}
        <form action="" className="mt-6" onSubmit={handleConfirm}>
          <div>
            <Typography variant="h5" color="black" className="mb-4">
              Pilih Pesanan
            </Typography>
            {pesananPerluInput?.length > 0 ? (
              pesananPerluInput.map((item, index) => (
                <Card
                  key={index}
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
                  <Button onClick={() => handleSelectPesanan(item.id)} className="mt-2">
                    Pilih
                  </Button>
                </Card>
              ))
            ) : (
              <Typography variant="paragraph" color="black">
                Tidak ada pesanan yang perlu diinputkan jaraknya.
              </Typography>
            )}
          </div>
          <div className="mt-6">
            <Typography variant="h5" color="black" className="mb-4">
              Jarak Pengiriman (km)
            </Typography>
            <Input
              size="lg"
              placeholder="Masukkan Jarak Pengiriman"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="number"
              name="jarak_pengiriman"
            //   value={jarakPengiriman}
              onChange={(e) => setJarakPengiriman(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-2">
            <div></div>
            <Button type="submit">
              {isPending ? (
                <>
                  <Spinner />
                  Loading...
                </>
              ) : (
                <span>Input Jarak</span>
              )}
            </Button>
          </div>
        </form>
      </Card>

      <Dialog open={showModal} handler={() => setShowModal(false)}>
        <DialogHeader>Konfirmasi Input Jarak</DialogHeader>
        <DialogBody>
          <Typography>Apakah anda yakin ingin menginputkan jarak?</Typography>
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

export default InputJarak;
