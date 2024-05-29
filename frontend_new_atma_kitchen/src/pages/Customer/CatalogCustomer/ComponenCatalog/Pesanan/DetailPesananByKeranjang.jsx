import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetPesananByKeranjang,
  UpdatePesanan,
} from "../../../../../api/CustomerApi/Pesanan/PesananApi";
import { Button, Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getFotoProduk } from "../../../../../api";
import KirimBukti from "./KirimBukti";

const DetailPesananByKeranjang = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [jumlahPromo, setJumlahPromo] = useState(0);
  const navigate = useNavigate();

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const data = await GetPesananByKeranjang(id);
      console.log("Ini Datanya",data);
      const bayaran = data.filter(
        (item) => item.pesanan.jarak_pengiriman >= 0
      );
      setDetail(bayaran);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedPesanan = {
        jumlah_promo: jumlahPromo,
      };
      const idPesan = pesanan.id;

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
    return <div className="text-center">Sabar Yah lagi sementara di konfirmasi</div>;
  }

  // Ambil pesanan dari item pertama
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
          {/* Jika pesanan adalah objek dalam detail */}
        </div>
        {pesanan && (
          <div className="bg-orange-900 w-1/2">
            <div className="">
              <div className="text-center border-2 items-center border-sky-500">
                <h1 className="font-bold text-2xl">
                  Detail Pesanan
                </h1>
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
                  onChange={(e) =>
                    setJumlahPromo(parseInt(e.target.value) || 0)
                  }
                  className="border rounded-md p-1"
                />
              </h1>
              <h1 className="font-bold text-2xl mb-4">
                Total Harga:{" "}
                {totalHargaSetelahDiskon.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </h1>
              {/* <div className="flex justify-between"> */}
              {!isLunas && (
                <Button onClick={handleUpdate} className="">
                  Lihat Nota
                </Button>
              )}
              <KirimBukti pesanan={pesanan} totalHarga={totalHargaSetelahDiskon} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPesananByKeranjang;
