import React, { useState, useEffect } from "react";
import {
  CreatePesananWE,
  GetProdukWithKuota,
  GetTanggalKuota,
} from "../../../../../api/CustomerApi/CatalogApi/informationApi";
import { Button, Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { getFotoProduk } from "../../../../../api";

import { ShoppingCartIcon } from "@heroicons/react/24/solid";

import { useNavigate } from "react-router-dom";
import { createKeranjangWE } from "../../../../../api/CustomerApi/KeranjangApi";

const ProdukInformationDate = () => {
  // const { id, tanggal } = useParams();
  // const [kuota, setKuota] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(tanggal);
  // const [selectedQuantity, setSelectedQuantity] = useState(1);
  // const [availableDates, setAvailableDates] = useState([]);
  // const navigate = useNavigate();
  const [token, setToken] = useState("");

  const { id, tanggal } = useParams();
  const [kuota, setKuota] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("tanggal");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [availableDates, setAvailableDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenDariSS = sessionStorage.getItem("token");
    setToken(tokenDariSS);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Jika tanggal sudah ditentukan dari params, maka gunakan tanggal tersebut
        if (tanggal) {
          const data = await GetProdukWithKuota(id, tanggal);
          console.log("Data fetched:", data);
          setKuota(data[0]); // Mengambil objek pertama dari array
          const dates = data.map((item) => item.tanggal_kuota);
          setAvailableDates(dates);
        } else {
          // Jika tidak ada tanggal yang ditentukan dari params, ambil tanggal pertama dari daftar kuota dengan menggunakan tanggal yang dipilih
          const data = await GetProdukWithKuota(id, selectedDate);
          console.log("Data fetched:", data);
          setKuota(data[0]); // Mengambil objek pertama dari array
          const dates = data.map((item) => item.tanggal_kuota);
          setAvailableDates(dates);
          setSelectedDate(dates[0]); // Set tanggal yang pertama kali tersedia
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, tanggal, selectedDate]);

  const handleSelectChange = async (e) => {
    console.log("handleSelectChange called"); // Tambahkan ini untuk memeriksa pemanggilan fungsi
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    // Perbarui kuota berdasarkan tanggal yang dipilih
    try {
      const data = await GetProdukWithKuota(id, selectedDate); // Panggil GetProdukWithKuota dengan id dan tanggal yang dipilih
      console.log("Data fetched Tanggal:", data);
      setKuota(data[0]); // Mengambil objek pertama dari array
      // Perbarui daftar tanggal yang tersedia
      const allDates = await GetTanggalKuota(id); // Panggil GetTanggalKuota dengan id untuk mendapatkan semua tanggal
      setAvailableDates(allDates.map((item) => item.tanggal_kuota)); // Set semua tanggal yang tersedia
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
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

  const handleKeranjang = async () => {
    if (!kuota || !kuota.produk) {
      console.log("Data produk tidak tersedia.");
      return;
    }

    console.log(kuota.produk.id);
    const masuk = {
      id_produk: kuota.produk.id,
      jumlah_produks: selectedQuantity,
    };
    try {
      const response = await createKeranjangWE(masuk);
      console.log(response);
      alert(response.message);
    } catch (err) {
      console.log(err);
      alert(err);
    }
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
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Gagal menambahkan pesanan");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }
  if (!kuota || !kuota.produk) {
    return <div>Data produk tidak tersedia.</div>;
  }

  return (
    <div className="flex flex-col items-center px-4 py-10 lg:px-20 lg:py-20">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl mb-4">Informasi Produk</h1>
        <select
          value={kuota.tanggal}
          onChange={handleSelectChange}
          className="mb-4 w-full text-center p-2 border border-gray-300 rounded"
        >
          {availableDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:max-w-4xl w-full">
        <div className="lg:w-1/3 w-full max-w-xs mb-6 lg:mb-0">
          {/* {console.log(handleSelectChange)} */}
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
