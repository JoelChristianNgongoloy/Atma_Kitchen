import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";

import {
  CreatePesananWE,
  GetJustProduk,
} from "../../../../../api/CustomerApi/CatalogApi/informationApi";
import { useParams } from "react-router-dom";
import { getFotoProduk } from "../../../../../api";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { createKeranjangWE } from "../../../../../api/CustomerApi/KeranjangApi";

import { toast } from "react-hot-toast";

const ProdukInformation = () => {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    GetJustProduk(id)
      .then((data) => {
        setProduk(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    setToken(tokenDariSS);
  }, []);

  const incrementQuantity = () => {
    setSelectedQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setSelectedQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };

  const handleKeranjang = (produks) => {
    console.log(produks.id);
    const masuk = {
      id_produk: produks.id,
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
      id_produk: produk.id,
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

  if (!produk) {
    console.log("Produk is null:", produk);
    return <div className="text-center">Data produk tidak tersedia.</div>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-10 lg:px-20 lg:py-20">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl mb-4">Informasi Produk</h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:max-w-4xl w-full">
        <div className="lg:w-1/3 w-full max-w-xs mb-6 lg:mb-0">
          <img
            className="w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
            src={getFotoProduk(produk.foto_produk)}
            alt="Produk"
          />
        </div>
        <div className="lg:w-2/3 w-full lg:ml-10 text-justify">
          <h1 className="font-bold text-3xl mb-4">{produk.nama_produk}</h1>
          <p className="text-black mb-2 break-words">
            {produk.deskripsi_produk}
          </p>
          <p className="text-black mb-4">Stok Produk: {produk.stok_produk}</p>
          <p className="text-black mb-4">
            Harga :{" "}
            {produk.harga_produk.toLocaleString("id-ID", {
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
                    onClick={() => handleKeranjang(produk)}
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

export default ProdukInformation;
