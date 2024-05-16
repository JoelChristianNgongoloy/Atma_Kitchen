import React, { useState } from "react";
import { Input, Button, Typography, Spinner } from "@material-tailwind/react";

import { CreatePenitipWE } from "../../../api/MoApi/apiPenitip";

const CreatePenitip = () => {
  const [isPending, setIsPending] = useState(false);
  const [dataPenitip, setDataPenitip] = useState({
    nama_penitip: "",
    tanggal_menitip: "",
  });

  const handleChange = (event) => {
    setDataPenitip({ ...dataPenitip, [event.target.name]: event.target.value });
  };
  const submitdataPenitip = (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("nama_penitip", dataPenitip.nama_penitip);
    formData.append("tanggal_menitip", dataPenitip.tanggal_menitip);
    CreatePenitipWE(formData)
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
          Tambah Penitip Anda Disini
        </Typography>
      </div>
      <form action="" className="mt-6" onSubmit={submitdataPenitip}>
        <div>
          <Typography variant="h5" color="black" className="mb-4">
            Nama Penitip
          </Typography>
          <Input
            size="lg"
            placeholder="Masukan Nama Penitip disini"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="text"
            name="nama_penitip"
            onChange={handleChange}
          />
        </div>
        <div>
          <Typography variant="h5" color="black" className="mb-4">
            Tanggal Menitip
          </Typography>
          <Input
            size="lg"
            placeholder="Masukan Nama Bahan Baku Anda disini"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="date"
            name="tanggal_menitip"
            onChange={handleChange}
          />
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

export default CreatePenitip;
