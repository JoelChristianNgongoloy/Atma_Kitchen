import React, { useState, useEffect } from "react";
import {
  GetPesanan,
  UpdatePesanan,
} from "../../../../../api/CustomerApi/Pesanan/PesananApi";
import { Spinner, Button } from "@material-tailwind/react";
import { getFotoProduk } from "../../../../../api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import KirimBukti from "./KirimBukti";

const DetailPesanan = () => {
  const { id } = useParams();

  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jumlahPromo, setJumlahPromo] = useState(0);

  const navigate = useNavigate();

  const fetchDetail = async () => {
    setIsLoading(true);
    try {
      const thenData = await GetPesanan(id);
      console.log("Data fetched:", thenData);
      setDetail(thenData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedPesanan = {
        jumlah_promo: jumlahPromo,
      };
      const idPesan = detail.pesanan.id;
      navigate(`/transaksiCetak/${idPesan}`);

      await UpdatePesanan(idPesan, updatedPesanan);
      alert("Pesanan berhasil diperbarui");
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Gagal memperbarui pesanan");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (isLoading) {
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

  if (!detail || !detail.produk || !detail.pesanan) {
    console.log("Detail or detail.produk is null:", detail);
    return <div className="text-center">Data produk tidak tersedia.</div>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-10 lg:px-20 lg:py-15">
      <div className="text-center mb-5">
        <h1 className="font-bold text-3xl mb-4">Detail Pesanan</h1>
      </div>
      <div className="border border-slate-700 shadow-lg rounded-md py-12 px-64 mb-2">
        <div className="text-center mb-5">
          <h1 className="font-bold text-2xl mb-4">Produk</h1>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:max-w-4xl w-full">
          <div className="w-full max-w-xs mb-6 lg:mb-0">
            <img
              className="w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
              src={getFotoProduk(detail.produk.foto_produk)}
              alt="Produk"
            />
          </div>
          <div className="lg:w-2/3 w-full lg:ml-10 text-justify">
            <h2 className="font-bold text-xl mb-2">
              {detail.produk.nama_produk}
            </h2>
            <p className="text-gray-700">
              Harga Produk:{" "}
              {detail.produk.harga_produk.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <p className="text-gray-700">
              Jumlah Pesanan: {detail.pesanan.jumlah_produk}
            </p>
          </div>
        </div>
      </div>
      <div className="px-96">
        <div className="text-left mt-5">
          <h1 className="font-bold text-2xl mb-4">
            Jumlah Pesanan: {detail.pesanan.jumlah_produk}
          </h1>
          <h1 className="font-bold text-2xl mb-4">
            Total Harga:{" "}
            {detail.pesanan.total_harga.toLocaleString("id-ID", {
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
            Total Harga:{" "}
            {(
              detail.pesanan.total_harga - // Ongkos kirim
              jumlahPromo
            ) // Potongan poin
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
          </h1>
          <div className="flex justify-between">
            <div></div>
            <Button onClick={handleUpdate} className="">
              Pesan Sekarang
            </Button>

            <KirimBukti pesanan={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPesanan;
