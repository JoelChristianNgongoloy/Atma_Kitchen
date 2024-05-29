import React, { useState, useEffect } from "react";

import { Input, Button, Typography, Spinner } from "@material-tailwind/react";

import { CreatePengeluaranWE } from "../../../api/MoApi/apiPengeluaran";

const CreatePengeluaran = () => {
  const [isPending, setIsPending] = useState(false);

  const [dataPengeluaran, setDataPengeluaran] = useState({
    nama_pengeluaran: "",
    tanggal_pengeluaran: "",
    total_pengeluaran: "",
    qty_pengeluaran: "",
  });

  const handleChange = (event) => {
    setDataPengeluaran({
      ...dataPengeluaran,
      [event.target.name]: event.target.value,
    });
  };
  const handleCreatePengeluaran = (event) => {
    event.preventDefault();
    setIsPending(true);
    CreatePengeluaranWE(dataPengeluaran)
      .then((response) => {
        setIsPending(false);
        window.location.reload();
        console.log(response.message || "Pengeluaran berhasil dibuat");
      })
      .catch((error) => {
        console.error("Error creating pengeluaran:", error);
        setIsPending(false);
        console.log(
          error.response?.data?.message ||
            "Terjadi kesalahan saat membuat pengeluaran"
        );
      });
  };
  return (
    <div>
      <div className="flex justify-center">
        <Typography variant="h4" color="black">
          Tambah Pengeluaran anda disini
        </Typography>
      </div>
      <form action="" onSubmit={handleCreatePengeluaran} className="mt-6">
        <div>
          <Typography variant="h5" color="black" className="mb-4">
            Nama Pengeluaran
          </Typography>
          <Input
            size="lg"
            placeholder="Masukan Pengeluaran disini"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="text"
            name="nama_pengeluaran"
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-flow-col justify-stretch mt-6">
          <div className="mr-4">
            <Typography variant="h5" color="black" className="mb-4">
              Tanggal Pengeluaran
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="date"
              name="tanggal_pengeluaran"
              onChange={handleChange}
            />
          </div>
          <div>
            <Typography variant="h5" color="black" className="mb-4">
              Total Pengeluaran
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
              name="total_pengeluaran"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-flow-col justify-stretch mt-6">
          <div className="mr-4">
            <Typography variant="h5" color="black" className="mb-4">
              qty Pengeluaran
            </Typography>
            <Input
              size="lg"
              placeholder="Masukan qty Pengeluaran"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="number"
              name="qty_pengeluaran"
              onChange={handleChange}
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

export default CreatePengeluaran;
