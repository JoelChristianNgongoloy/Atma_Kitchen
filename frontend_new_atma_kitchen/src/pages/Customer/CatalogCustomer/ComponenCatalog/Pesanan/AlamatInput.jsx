import React, { useState, useEffect } from "react";
import { GetInputAlamat } from "../../../../../api/CustomerApi/Pesanan/PesananApi";
import { Spinner, Button, Typography } from "@material-tailwind/react";
import { getFotoProduk } from "../../../../../api";
import { useNavigate, useParams } from "react-router-dom";

import { GetAlamatCustomer } from "../../../../../api/CustomerApi/AlamatApi";
import { CreateAlamatPesanan } from "../../../../../api/CustomerApi/CatalogApi/informationApi";

const AlamatInput = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPengantaran, setSelectedPengantaran] = useState("");
  const [selectedAlamat, setSelectedAlamat] = useState("");
  const [alamatOptions, setAlamatOptions] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const data = await GetInputAlamat(id);
      setDetail(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchAlamatOptions = async () => {
    try {
      const alamatData = await GetAlamatCustomer();
      setAlamatOptions(alamatData);
    } catch (error) {
      console.error("Error fetching alamat:", error);
    }
  };

  const handleChangePengantaran = (event) => {
    setSelectedPengantaran(event.target.value);
  };

  const handleChangeAlamat = (event) => {
    setSelectedAlamat(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedPengantaran) {
      alert("Pilih jenis pengantaran!");
      return;
    }
    setIsPending(true);
    const data = {
      jenis_pengantaran: selectedPengantaran,
      id_alamat: selectedAlamat,
    };

    CreateAlamatPesanan(id, data)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        navigate(`/detail_pesanAll/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchDetail();
    fetchAlamatOptions();
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
    return <div className="text-center">Data produk tidak tersedia.</div>;
  }

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
        {detail[0].pesanan && (
          <div className="bg-orange-900 w-1/2 p-5">
            <form onSubmit={handleSubmit}>
              <div className="text-center border-2 border-sky-500 rounded-md p-5">
                <h1 className="font-bold text-2xl">Input Alamat</h1>
                <div className="mt-4">
                  <Typography variant="h6" color="black">
                    Pilih Jenis Pengantaran
                  </Typography>
                  <select
                    name="jenis_pengantaran"
                    value={selectedPengantaran}
                    onChange={handleChangePengantaran}
                    className="w-full h-11 rounded-md border border-blue-gray-200 focus:border-gray-900 mt-2"
                    required
                  >
                    <option value="">Pilih Jenis Pengantaran</option>
                    <option value="Di antar">Di antar</option>
                    <option value="Ambil Sendiri">Ambil Sendiri</option>
                  </select>
                </div>
                {selectedPengantaran === "Di antar" && (
                  <div className="mt-4">
                    <Typography variant="h6" color="black">
                      Pilih Alamat
                    </Typography>
                    <select
                      name="id_alamat"
                      value={selectedAlamat}
                      onChange={handleChangeAlamat}
                      className="w-full h-11 rounded-md border border-blue-gray-200 focus:border-gray-900 mt-2"
                      required
                    >
                      <option value="">Pilih Alamat</option>
                      {alamatOptions.map((alamat) => (
                        <option key={alamat.id} value={alamat.id}>
                          {alamat.alamat_customer}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="mt-4">
                  <Button
                    type="submit"
                    color="indigo"
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? "Menyimpan..." : "Simpan Alamat"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlamatInput;
