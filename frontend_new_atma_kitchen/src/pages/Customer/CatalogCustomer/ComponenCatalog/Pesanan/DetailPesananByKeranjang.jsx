import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetPesananByKeranjang,
  UpdatePesanan,
  sendBukti,
} from "../../../../../api/CustomerApi/Pesanan/PesananApi";
import { Button, Spinner, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getFotoProduk } from "../../../../../api";

const DetailPesananByKeranjang = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jumlahPromo, setJumlahPromo] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [buktiDikirim, setBuktiDikirim] = useState(false);
  const [data, setData] = useState({
    bukti_pembayaran: null,
    id_pesanan: null,
  });
  const navigate = useNavigate();

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const data = await GetPesananByKeranjang(id);
      console.log("Ini Datanya", data);
      const bayaran = data.filter((item) => item.pesanan.jarak_pengiriman >= 0);
      setDetail(bayaran);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedPesanan = { jumlah_promo: jumlahPromo };
      const idPesan = pesanan.id;

      await UpdatePesanan(idPesan, updatedPesanan);
      alert("Pesanan berhasil diperbarui");
      navigate(`/transaksiCetak/${idPesan}`);
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Gagal memperbarui pesanan");
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "bukti_pembayaran") {
      setData({
        ...data,
        bukti_pembayaran: event.target.files[0],
        id_pesanan: pesanan.id,
      });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const handleSendBukti = () => {
    setIsPending(true);

    const formData = new FormData();
    formData.append("bukti_pembayaran", data.bukti_pembayaran);
    formData.append("id_pesanan", data.id_pesanan);

    sendBukti(formData)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        setBuktiDikirim(true);
        alert("Bukti pembayaran berhasil dikirim");
      })
      .catch((error) => {
        setIsPending(false);
        console.error("Error sending bukti:", error);
      });
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-96">
        <div className="flex justify-center">
          <Spinner />
        </div>
        <h6 className="mt-2 mb-0">Loading...</h6>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!detail || detail.length === 0) {
    return (
      <div className="text-center">Sabar Yah lagi sementara di konfirmasi</div>
    );
  }

  const pesanan = detail[0].pesanan;
  const isLunas = pesanan.status_pesanan === "Lunas";
  const totalHargaSetelahDiskon = pesanan.total_harga - jumlahPromo * 100;

  return (
    <div className="w-full px-96 py-20">
      <div className="flex justify-center items-start bg-orange-50">
        <div className="mr-2 bg-orange-700 w-1/2">
          {detail.map((item, index) => (
            <div
              key={index}
              className="border border-slate-700 shadow-lg rounded-md mb-2"
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start">
                <div className="w-40 max-w-xs lg:mb-0">
                  <img
                    className="w-40 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
                    src={getFotoProduk(item.produk.foto_produk)}
                    alt="Produk"
                  />
                </div>
                <div className="lg:w-2/3 w-full lg:ml-10 ">
                  <p className="font-bold">{item.produk.nama_produk}</p>
                  <p className="text-gray-700">
                    Harga Produk:{" "}
                    {item.produk.harga_produk.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {pesanan && (
          <div className="bg-orange-900 w-1/2 p-4">
            <div className="text-center border-2 items-center border-sky-500 mb-4">
              <h1 className="font-bold text-2xl">Detail Pesanan</h1>
            </div>
            <h1 className="font-bold text-2xl mb-4">
              Jumlah Pesanan: {pesanan.jumlah_produk}
            </h1>
            <h1 className="font-bold text-2xl mb-4">
              Total Harga:{" "}
              {pesanan.total_harga.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </h1>
            <h1 className="font-bold text-2xl mb-4">
              Promo Poin yang Digunakan:{" "}
              <input
                type="number"
                value={jumlahPromo}
                onChange={(e) => setJumlahPromo(parseInt(e.target.value) || 0)}
                className="border rounded-md p-1"
              />
            </h1>
            <h1 className="font-bold text-2xl mb-4">
              Total Harga Setelah Diskon:{" "}
              {totalHargaSetelahDiskon.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </h1>
            <div className="mb-4">
              <Input
                name="bukti_pembayaran"
                type="file"
                onChange={handleChange}
                label="Bukti Pembayaran"
                color="blue"
              />
            </div>
            <div className="flex space-x-4">
              <Button
                color="blue"
                onClick={handleSendBukti}
                disabled={isPending || buktiDikirim}
              >
                {isPending ? (
                  <>
                    <Spinner size="sm" />
                    <span className="ml-2">Loading...</span>
                  </>
                ) : buktiDikirim ? (
                  "Bukti Dikirim"
                ) : (
                  "Kirim Bukti Pembayaran"
                )}
              </Button>
              <Button
                color="green"
                onClick={handleUpdate}
                disabled={!buktiDikirim}
              >
                Lihat Nota
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPesananByKeranjang;
