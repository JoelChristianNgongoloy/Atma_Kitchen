import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
  Spinner,
  Card,
} from "@material-tailwind/react";

import { CreateHampersWE } from "../../../api/AdminApi/apiHampers";
import { GetAllProduk } from "../../../api/AdminApi/apiProduk";

const CreateHampers = () => {
  const [dataHampers, setDataHampers] = useState({
    nama_hampers: "",
    deskripsi_hampers: "",
    harga_hampers: "",
    stok_hampers: "",
    detail_hampers: [{ id_produk: "" }],
  });

  const [produk, setProducts] = useState([]);

  const fetchProduk = () => {
    setIsPending(true);
    GetAllProduk()
      .then((response) => {
        setProducts(response);
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

  const handleDetailChange = (index, event) => {
    const newDetailHampers = [...dataHampers.detail_hampers];
    newDetailHampers[index][event.target.name] = event.target.value;
    setDataHampers({ ...dataHampers, detail_hampers: newDetailHampers });
  };

  const addDetailHampers = () => {
    setDataHampers((prevState) => ({
      ...prevState,
      detail_hampers: [...prevState.detail_hampers, { id_produk: "" }],
    }));
  };

  const handleChange = (event) => {
    setDataHampers({ ...dataHampers, [event.target.name]: event.target.value });
  };

  const removeDetailHampers = (index) => {
    const newDetailHampers = [...dataHampers.detail_hampers];
    newDetailHampers.splice(index, 1);
    setDataHampers({ ...dataHampers, detail_hampers: newDetailHampers });
  };

  const [isPending, setIsPending] = useState(false);

  // const submitDataHampers = (event) => {
  //   event.preventDefault();
  //   setIsPending(true);
  //   const formData = new FormData();
  //   formData.append("nama_hampers", dataHampers.nama_hampers);
  //   formData.append("deskripsi_hampers", dataHampers.deskripsi_hampers);
  //   formData.append("harga_hampers", dataHampers.harga_hampers);
  //   formData.append("stok_hampers", dataHampers.stok_hampers);
  //   CreateHampersWE(formData)
  //     .then((response) => {
  //       setIsPending(false);
  //       console.log(response.message);
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsPending(false);
  //       console.log(JSON.stringify(err.message));
  //     });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);
    try {
      await CreateHampersWE(dataHampers);
      // Reset form or show success message
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="h-96 overflow-auto">
      <Card className=" mx-h-80">
        <div className="flex justify-center">
          <Typography variant="h4" color="black">
            Tambah Hampers anda disini
          </Typography>
        </div>
        <form action="" className="mt-6" onSubmit={handleSubmit}>
          <div>
            <Typography variant="h5" color="black" className="mb-4">
              Nama Hampers
            </Typography>
            <Input
              size="lg"
              placeholder="Masukan Nama Hampers Anda disini"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="text"
              name="nama_hampers"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-flow-col justify-stretch mt-6">
            <div>
              <Typography variant="h5" color="black" className="mb-4">
                Harga Hampers
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
                name="harga_hampers"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-flow-col justify-stretch mt-6">
            <div className="mr-4">
              <Typography variant="h5" color="black" className="mb-4">
                Stok Hampers
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
                name="stok_hampers"
                onChange={handleChange}
              />
            </div>
            <div>
              <Typography variant="h5" color="black" className="mb-4">
                Deskripsi Hampers
              </Typography>
              <Textarea
                required
                name="deskripsi_hampers"
                onChange={handleChange}
                placeholder="Masukkan Hampers Produk..."
              />
            </div>
          </div>
          <div>
            {dataHampers.detail_hampers.map((detail, index) => (
              <div key={index} className="flex justify-around mt-6">
                <div className="w-4/5">
                  <select
                    name="id_produk"
                    value={detail.id_produk}
                    onChange={(e) => handleDetailChange(index, e)}
                    required
                    className="w-full h-11 rounded-md border border-blue-gray-200 focus:border-gray-900 ml-2"
                  >
                    <option value="">Pilih Produk</option>
                    {produk?.length > 0 ? (
                      produk.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.nama_produk}
                        </option>
                      ))
                    ) : (
                      <option disabled>Loading produk...</option>
                    )}
                  </select>
                </div>

                <div className="w-1/6">
                  <Button
                    type="button"
                    onClick={() => removeDetailHampers(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            <div className="mt-4">
              <Button type="button" onClick={addDetailHampers}>
                Add Product
              </Button>
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
      </Card>
    </div>
  );
};

export default CreateHampers;
