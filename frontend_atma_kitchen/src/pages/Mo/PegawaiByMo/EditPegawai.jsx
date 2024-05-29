import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";

import { UpdatePegawai, GetAllRole } from "../../../api/MoApi/apiPegawai";

const EditPegawai = ({ pegawai, onClose }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [isPending, setIsPending] = useState(false);

  const [dataPegawai, setDataPegawai] = useState(pegawai);
  const handleChange = (event) => {
    setDataPegawai({ ...dataPegawai, [event.target.name]: event.target.value });
  };

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

  const submitDataPegawai = (event) => {
    event.preventDefault();
    setIsPending(true);
    UpdatePegawai(dataPegawai)
      .then((response) => {
        setIsPending(false);
        handleClose();
        console.log(response.message);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(err.message);
      });
  };
  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="blue">
        Edit Pegawai
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Pegawai</DialogHeader>
        <form action="" onSubmit={submitDataPegawai}>
          <DialogBody>
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
                value={dataPegawai?.nama}
              />
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
                  value={dataPegawai?.username}
                />
              </div>
              <div>
                <Typography variant="h5" color="black" className="mb-4">
                  Tanggal Lahir
                </Typography>
                <Input
                  size="lg"
                  placeholder="Masukan Harga Hampers Anda disini"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  type="date"
                  name="tanggal_lahir"
                  onChange={handleChange}
                  value={dataPegawai?.tanggal_lahir}
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
                  <option value="">{dataPegawai?.role.jenis_role}</option>
                  {role?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.jenis_role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
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
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

export default EditPegawai;
