import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
  Spinner,
} from "@material-tailwind/react";

import { GetUserLogin, GetUserUpdate } from "../../../api/CustomerApi/apiProfil";

const EditProfile = ({ customer, onClose }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  const [isPending, setIsPending] = useState(false);
  const [dataUser, setDataUser] = useState(customer);

  const handleChange = (event) => {
    setDataUser({ ...dataUser, [event.target.name]: event.target.value });
  };

  const submitDataCustomer = (event) => {
    event.preventDefault();
    setIsPending(true);
    GetUserUpdate(dataUser)
      .then((response) => {
        setIsPending(false);
        if (response.status === "success") {
          console.log(response.message);
          handleClose();
        } else {
          console.log(response.message);
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(err.message);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await GetUserLogin();
        setDataUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Edit
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Customer</DialogHeader>
        <form action="" onSubmit={submitDataCustomer}>
          <DialogBody>
            <div>
              <Typography color="black" className="mb-4">
                Nama
              </Typography>
              <Input
                size="lg"
                placeholder="Masukan Nama Anda disini"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
                type="text"
                name="nama"
                onChange={handleChange}
                value={dataUser?.nama}
              />
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div className="mr-4">
                <Typography variant="h5" color="black" className="mb-4">
                  Username
                </Typography>
                <Input
                  size="lg"
                  placeholder="Masukan username Anda disini"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={dataUser?.username}
                />
              </div>
              <div>
                <Typography color="black" className="mb-4">
                  Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="Masukan Email Anda disini"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={dataUser?.email}
                />
              </div>
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div>
                <Typography color="black" className="mb-4">
                  Tanggal Lahir
                </Typography>
                <Input
                  name="tanggal_lahir"
                  required
                  onChange={handleChange}
                  value={dataUser?.tanggal_lahir}
                  type="date"
                />
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

export default EditProfile;
