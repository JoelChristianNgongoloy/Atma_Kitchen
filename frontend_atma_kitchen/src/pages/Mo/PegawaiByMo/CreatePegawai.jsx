import React, { useState, useEffect } from "react";

import {
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";

import { CreatePegawaiWE, GetAllRole } from "../../../api/MoApi/apiPegawai";

const CreatePegawai = () => {
  const [isPending, setIsPending] = useState(false);

  const [dataPegawai, setDataPegawai] = useState({
    nama: "",
    username: "",
    password: "",
    tanggal_lahir: "",
    email: "",
    id_role: "",
  });

  const [role, setRole] = useState([]);

  const fetchRole = () => {
    setIsPending(true);
    GetAllRole()
      .then((response) => {
        setRole(response);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const handleChange = (event) => {
    setDataPegawai({ ...dataPegawai, [event.target.name]: event.target.value });
  };

  const submitDataPegawai = (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("nama", dataPegawai.nama);
    formData.append("username", dataPegawai.username);
    formData.append("password", dataPegawai.password);
    formData.append("tanggal_lahir", dataPegawai.tanggal_lahir);
    formData.append("email", dataPegawai.email);
    formData.append("id_role", dataPegawai.id_role);
    CreatePegawaiWE(formData)
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
      <form action="" onSubmit={submitDataPegawai} className="mt-6">
        <div>
          <Typography variant="h5" color="black" className="mb-4">
            Nama Pegawai
          </Typography>
          <Input
            size="lg"
            placeholder="Masukan Nama Pegawai disini"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="text"
            name="nama"
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-flow-col justify-stretch mt-6">
          <div className="mr-4">
            <Typography variant="h5" color="black" className="mb-4">
              Email Pegawai
            </Typography>
            <Input
              size="lg"
              placeholder="Masukan Email Pegawai"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div>
            <Typography variant="h5" color="black" className="mb-4">
              Password
            </Typography>
            <Input
              size="lg"
              placeholder="Masukan Password Pegawai disini"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-flow-col justify-stretch mt-6">
          <div className="mr-4">
            <Typography variant="h5" color="black" className="mb-4">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="Masukan username Pegawai"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="text"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <Typography variant="h5" color="black" className="mb-4">
              Tanggal Lahir
            </Typography>
            <Input
              size="lg"
              placeholder="Masukan Tanggal lahie Anda disini"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              type="date"
              name="tanggal_lahir"
              onChange={handleChange}
            />
          </div>
          <div className="mr-4">
            <Typography variant="h5" color="black" className="mb-4">
              Jabatan
            </Typography>
            <select
              name="id_role"
              required
              className="w-full h-11 rounded-md border border-blue-gray-200 focus:border-gray-900 ml-2"
              id=""
              onChange={handleChange}
            >
              <option value="">Pilih Jabatan</option>
              {role?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.jenis_role}
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

export default CreatePegawai;
