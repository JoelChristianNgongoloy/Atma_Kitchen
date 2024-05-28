import React, { useState, useEffect } from "react";
import {
  GetProdukWithKuota,
  GetProdukWithKuotathen,
  GetProdukWithKuotabesok,
  CreatePesananWE,
} from "../../../../../api/CustomerApi/CatalogApi/informationApi";
import { Button, Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { getFotoProduk } from "../../../../../api";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";

import { useNavigate } from "react-router-dom";
import { createKeranjangWE } from "../../../../../api/CustomerApi/KeranjangApi";

const ProdukInformationDate = () => {
  const { id } = useParams();
  const [kuota, setKuota] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("today");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    setToken(tokenDariSS);
  }, []);

  useEffect(() => {
    if (selectedDate === "today") {
      fetchData();
    } else if (selectedDate === "besok") {
      fetchDataBesok();
    } else {
      fetchDatathen();
    }
  }, [id, selectedDate]);

  const fetchDataBesok = async () => {
    setIsLoading(true);
    try {
      const dataBesok = await GetProdukWithKuotabesok(id);
      console.log("Data fetched:", dataBesok);
      if (Array.isArray(dataBesok) && dataBesok.length > 0) {
        setKuota(dataBesok[0]);
      } else {
        setKuota(null);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await GetProdukWithKuota(id);
      console.log("Data fetched:", data);
      if (Array.isArray(data) && data.length > 0) {
        setKuota(data[0]);
      } else {
        setKuota(null);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const fetchDatathen = async () => {
    setIsLoading(true);
    try {
      const thenData = await GetProdukWithKuotathen(id);
      console.log("Data fetched:", thenData);
      if (Array.isArray(thenData) && thenData.length > 0) {
        setKuota(thenData[0]);
      } else {
        setKuota(null);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const incrementQuantity = () => {
    setSelectedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setSelectedQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };

  const handleKeranjang = (produk) => {
    if (!kuota || !kuota.produk) {
      console.log("Data produk tidak tersedia.");
      return;
    }

    console.log(kuota.produk.id);
    const masuk = {
      id_produk: kuota.produk.id,
      jumlah_produks: selectedQuantity,
    };
    createKeranjangWE(masuk)
      .then((response) => {
        console.log(response);
        alert(response.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const handleToAddPesanan = async () => {
    if (!token) {
      alert("Silakan login terlebih dahulu");
      return;
    }
    const orderData = {
      id_produk: kuota.produk.id,
      jumlah_produk: selectedQuantity,
    };
    try {
      const data = await CreatePesananWE(orderData);
      alert("Pesanan berhasil ditambahkan");
      const detail_pesanId = data.data;

      navigate(`/showInputAlamat/${detail_pesanId}`);
      console.log(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Gagal menambahkan pesanan");
    }
  };

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

  if (!kuota || !kuota.produk) {
    console.log("Kuota or kuota.produk is null:", kuota);
    return <div className="text-center">Data produk tidak tersedia.</div>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-10 lg:px-20 lg:py-20">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl mb-4">Informasi Produk</h1>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mb-4 w-full text-center p-2 border border-gray-300 rounded"
        >
          <option value="today">Hari Ini</option>
          <option value="besok">Besok</option>
          <option value="then">Lusa</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:max-w-4xl w-full">
        <div className="lg:w-1/3 w-full max-w-xs mb-6 lg:mb-0">
          <img
            className="w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
            src={getFotoProduk(kuota.produk.foto_produk)}
            alt="Produk"
          />
        </div>
        <div className="lg:w-2/3 w-full lg:ml-10 text-justify">
          <h1 className="font-bold text-3xl mb-4">
            {kuota.produk.nama_produk}
          </h1>
          <p className="text-black mb-2 break-words">
            {kuota.produk.deskripsi_produk}
          </p>
          <h2 className="font-bold text-xl mb-2">
            Tanggal Kuota: {kuota.tanggal_kuota}
          </h2>
          <p className="text-black mb-4">Jumlah Kuota: {kuota.loyang}</p>
          <p className="text-black mb-4">
            Stok Produk: {kuota.produk.stok_produk}
          </p>
          <p className="text-black mb-4">
            Harga :{" "}
            {kuota.produk.harga_produk.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
          <div className="flex items-center mb-4">
            <button
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded-l"
              onClick={decrementQuantity}
              disabled={selectedQuantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              className="w-12 text-center border-t border-b border-gray-300"
              value={selectedQuantity}
              readOnly
            />
            <button
              className="px-2 py-1 bg-gray-300 text-gray-700 rounded-r"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
          <div className="flex">
            {!token ? (
              <>
                <div>
                  <ShoppingCartIcon
                    aria-disabled
                    className="h-8 w-8 mr-3 cursor-not-allowed text-gray-400"
                  />
                </div>
                <div>
                  <Button disabled>Login Dulu Yah manis</Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <ShoppingCartIcon
                    onClick={handleKeranjang}
                    className="h-8 w-8 mr-3 cursor-pointer"
                  />
                </div>
                <div>
                  <Button onClick={handleToAddPesanan}>Tambah Pesanan</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdukInformationDate;
