import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
  Alert,
} from "@material-tailwind/react";

import { toast } from "react-hot-toast";

import { createAlamatWe } from "../../../api/CustomerApi/AlamatApi";

import { GetUserLogin } from "../../../api/apiProfil";

const CreateAlamat = () => {
  const [dataAlamat, setDataAlamat] = useState({
    alamat_customer: "",
    kode_pos: "",
    id_customer: "",
  });
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await GetUserLogin();
        setDataAlamat((prevState) => ({
          ...prevState,
          id_customer: user.id,
        }));
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("alamat_customer", dataAlamat.alamat_customer);
    formData.append("kode_pos", dataAlamat.kode_pos);
    formData.append("id_customer", dataAlamat.id_customer);
    createAlamatWe(formData)
      .then((response) => {
        setIsPending(false);
        toast.success(response.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(JSON.stringify(err.message));
      });
  };

  const handleChange = (event) => {
    setDataAlamat({ ...dataAlamat, [event.target.name]: event.target.value });
  };

  return (
    <div className="px-2">
      <div>
        <form action="" onSubmit={handleSubmit}>
          <Typography variant="h5" color="black" className="mb-2">
            Alamat
          </Typography>
          <Input
            placeholder="Masukkan Alamat Anda"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="text"
            name="alamat_customer"
            onChange={handleChange}
          />

          <Typography variant="h5" color="black" className="mb-2 mt-2">
            Kode Pos
          </Typography>
          <Input
            placeholder="Masukkan Kode Pos Anda"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="number"
            name="kode_pos"
            onChange={handleChange}
          />
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
    </div>
  );
};

export default CreateAlamat;
