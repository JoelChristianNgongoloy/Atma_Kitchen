import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
  Spinner,
} from "@material-tailwind/react";
import { CreateResepWE, GetAllProduk } from "../../../api/AdminApi/apiResep";

const CreateResep = () => {
  const [produks, setProduks] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const [dataResep, setDataResep] = useState({
    nama_resep: "",
    id_produk: "",
  });

  const fetchProduk = () => {
    setIsPending(true);
    GetAllProduk()
      .then((response) => {
        setProduks(response);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const handleChange = (event) => {
    setDataResep({ ...dataResep, [event.target.name]: event.target.value });
  };

  const submitDataResep = (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("nama_resep", dataResep.nama_resep);
    formData.append("id_produk", dataResep.id_produk);
    CreateResepWE(formData)
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
          Tambah Resep anda disini
        </Typography>
      </div>
      <form action="" className="mt-6" onSubmit={submitDataResep}>
        <div>
          <Typography variant="h5" color="black" className="mb-4">
            Nama Resep
          </Typography>
          <Input
            size="lg"
            placeholder="Masukan Nama Resep Anda disini"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="text"
            name="nama_resep"
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-flow-col justify-stretch mt-6">
          <div className="">
            <Typography variant="h5" color="black" className="mb-4">
              Nama Produk
            </Typography>
            <select
              name="id_produk"
              required
              className="w-full h-11 rounded-md border border-blue-gray-200 focus:border-gray-900"
              size="lg"
              onChange={handleChange}
            >
              <option value="">Pilih Nama Produk</option>
              {produks?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.nama_produk}
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

export default CreateResep;
