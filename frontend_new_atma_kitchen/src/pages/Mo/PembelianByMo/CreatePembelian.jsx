import React, { useState, useEffect } from "react";
import { Input, Button, Typography, Spinner } from "@material-tailwind/react";
import {
  CreatePengadaanWE,
  GetAllBahanMo,
} from "../../../api/MoApi/apiPengadaan";

const CreatePembelian = () => {
  const [isPending, setIsPending] = useState(false);
  const [pengadaan, setPengadaan] = useState({
    harga_pengadaan: "",
    id_bahan_baku: "",
    jumlah_bahan_baku: "",
  });
  const [bahan, setBahan] = useState([]);

  const fetchBahan = () => {
    setIsPending(true);
    GetAllBahanMo()
      .then((response) => {
        setBahan(response);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  useEffect(() => {
    fetchBahan();
  }, []);

  const handleChange = (event) => {
    setPengadaan({ ...pengadaan, [event.target.name]: event.target.value });
  };

  const submitDataPengadaan = (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("harga_pengadaan", pengadaan.harga_pengadaan);
    formData.append("id_bahan_baku", pengadaan.id_bahan_baku);
    formData.append("jumlah_bahan_baku", pengadaan.jumlah_bahan_baku);
    CreatePengadaanWE(formData)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(JSON.stringify(err.message));
      });
  };

  return (
    <div>
      <div className="flex justify-center">
        <Typography variant="h4" color="black">
          Tambah Produk Titipan anda disini
        </Typography>
      </div>
      <form action="" onSubmit={submitDataPengadaan} className="mt-6">
        <div>
          <Typography variant="h5" color="black" className="mb-4">
            Harga Bahan Baku
          </Typography>
          <Input
            size="lg"
            placeholder="Masukan harga bahan baku disini"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="number"
            name="harga_pengadaan"
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-flow-col justify-stretch mt-6">
          <div className="mr-4">
            <Typography variant="h5" color="black" className="mb-4">
              Jumlah Bahan Baku
            </Typography>
            <Input
              size="lg"
              placeholder="Masukan jumlah Bahan Baku"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="number"
              name="jumlah_bahan_baku"
              onChange={handleChange}
            />
          </div>

          <div className="mr-4">
            <Typography variant="h5" color="black" className="mb-4">
              Bahan Baku
            </Typography>
            <select
              name="id_bahan_baku"
              required
              className="w-full h-11 rounded-md border border-blue-gray-200 focus:border-gray-900 ml-2"
              id=""
              onChange={handleChange}
            >
              <option value="">Pilih Bahan Baku</option>
              {bahan?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.nama_bahan_baku}
                </option>
              ))}
            </select>
          </div>
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
              <span>Simpan</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePembelian;
