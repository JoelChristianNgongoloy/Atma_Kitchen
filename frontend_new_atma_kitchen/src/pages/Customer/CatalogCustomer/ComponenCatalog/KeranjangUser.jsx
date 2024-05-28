import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import {
  GetMyProduk,
  createPesananKeranjang,
} from "../../../../api/CustomerApi/KeranjangApi";
import { getFotoProduk } from "../../../../api";

import { useNavigate } from "react-router-dom";

const KeranjangUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [produk, setProduk] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    GetMyProduk()
      .then((data) => {
        setProduk(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleSelectProduk = (id) => {
    setSelectedProduk((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((prodId) => prodId !== id)
        : [...prevSelected, id]
    );
  };

  const handlePesanan = () => {
    const produkIds = selectedProduk.map((id) => id);
    createPesananKeranjang({ produk_ids: produkIds })
      .then((response) => {
        alert("Pesanan berhasil dibuat!");
        setSelectedProduk([]);
        const idPesan = response.data;
        console.log("Id Pesanan : ", idPesan);
        navigate(`/showInputAlamat/${idPesan}`);
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal membuat pesanan!");
      });
  };

  return (
    <div className="flex flex-col items-center px-4 py-10 lg:px-20 lg:py-20">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl mb-4">Keranjang</h1>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : produk?.length > 0 ? (
        <>
          {produk?.map((item, index) => (
            <div
              key={index}
              className="border border-slate-700 shadow-lg rounded-md py-12 px-52 mb-2"
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start lg:max-w-4xl w-full">
                <div className="w-full max-w-xs mb-6 lg:mb-0">
                  <img
                    className="w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
                    src={getFotoProduk(item.produk.foto_produk)}
                    alt="Produk"
                  />
                </div>
                <div className="lg:w-2/3 w-full lg:ml-10 text-justify">
                  <h2 className="font-bold text-xl mb-2">
                    {item.produk.nama_produk}
                  </h2>
                  <p className="text-gray-700">
                    Harga Produk:{" "}
                    <strong>
                      {item.produk.harga_produk.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </strong>
                  </p>
                  <p className="text-gray-700">
                    Jumlah Pesanan: {item.jumlah_produks}
                  </p>
                  <input
                    type="checkbox"
                    checked={selectedProduk.includes(item.produk.id)}
                    onChange={() => handleSelectProduk(item.produk.id)}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={handlePesanan} className="mt-4">
            Buat Pesanan
          </Button>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default KeranjangUser;
