import React, { useState } from "react";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import { CreateProdukWE } from "../../../api/AdminApi/apiProduk";
// import { useNavigate } from "react-router-dom";

const CreateProduk = () => {
  const [dataProduk, setDataProduk] = useState({
    nama_produk: "",
    stok_produk: "",
    deskripsi_produk: "",
    harga_produk: "",
    // foto_produk: "",
    status_produk: "",
  });

  const handleChange = (event) => {
    setDataProduk({ ...dataProduk, [event.target.name]: event.target.value });
  };

  const [isPending, setIsPending] = useState(false);

  const submitDataProduk = (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("nama_produk", dataProduk.nama_produk);
    formData.append("stok_produk", dataProduk.stok_produk);
    formData.append("deskripsi_produk", dataProduk.deskripsi_produk);
    formData.append("harga_produk", dataProduk.harga_produk);
    // formData.append("foto_produk", dataProduk.nama_produk);
    formData.append("status_produk", dataProduk.status_produk);
    CreateProdukWE(formData)
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
          Tambah Produk anda disini
        </Typography>
      </div>
      <form action="" onSubmit={submitDataProduk} className="mt-6">
        <div>
          <Typography variant="h5" color="black" className="mb-4">
            Nama Produk
          </Typography>
          <Input
            size="lg"
            placeholder="Masukan Nama Produk Anda disini"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="text"
            name="nama_produk"
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-flow-col justify-stretch mt-6">
          <div className="mr-4">
            <Typography variant="h5" color="black" className="mb-4">
              Stok Produk
            </Typography>
            <Input
              size="lg"
              placeholder="Masukan stok Produk Anda disini"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="number"
              name="stok_produk"
              onChange={handleChange}
            />
          </div>
          <div>
            <Typography variant="h5" color="black" className="mb-4">
              Harga Produk
            </Typography>
            <Input
              size="lg"
              placeholder="Masukan Harga Hampers Anda disini"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="number"
              name="harga_produk"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-flow-col justify-stretch mt-6">
          <div className="mr-4">
            <Typography variant="h5" color="black" className="mb-4">
              Status Produk
            </Typography>
            <select
              name="status_produk"
              required
              className="w-full h-14 border-t-blue-gray-200 rounded-md"
              id=""
              onChange={handleChange}
            >
              <option value="">Pilih Status Produk</option>
              <option value="Pre Order">Pre Order</option>
              <option value="Ready Stock">Ready Stock</option>
            </select>
          </div>
          <div>
            <Typography variant="h5" color="black" className="mb-4">
              Deskripsi Produk
            </Typography>
            <Textarea
              name="deskripsi_produk"
              required
              onChange={handleChange}
              placeholder="Masukkan Deskripsi Produk..."
            />
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

export default CreateProduk;
