import React, { useState } from "react";
import { Input, Button, Typography, Spinner } from "@material-tailwind/react";

import { CreateBahanBakuWE } from "../../../api/AdminApi/apiBahanBaku";

const CreateBahanBaku = () => {
  const [isPending, setIsPending] = useState(false);

  const [dataBahan, setDataBahan] = useState({
    nama_bahan_baku: "",
  });

  const handleChange = (event) => {
    setDataBahan({ ...dataBahan, [event.target.name]: event.target.value });
  };

  const submitDataBahan = (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("nama_bahan_baku", dataBahan.nama_bahan_baku);
    CreateBahanBakuWE(formData)
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
          Tambah Bahan Baku Anda Disini
        </Typography>
      </div>
      <form action="" className="mt-6" onSubmit={submitDataBahan}>
        <div>
          <Typography variant="h5" color="black" className="mb-4">
            Nama Bahan Baku
          </Typography>
          <Input
            size="lg"
            placeholder="Masukan Nama Bahan Baku Anda disini"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="text"
            name="nama_bahan_baku"
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

export default CreateBahanBaku;
