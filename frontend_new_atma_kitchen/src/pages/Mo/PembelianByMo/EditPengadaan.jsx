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
import {
  UpdatePengadaan,
  GetAllBahanMo,
} from "../../../api/MoApi/apiPengadaan";

const EditPengadaan = ({ dataPengadaans, onClose }) => {
  const [open, setOpen] = useState(false);
  const [bahan, setBahan] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [dataPengadaan, setDataPengadaan] = useState(dataPengadaans);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const fetchBahan = () => {
    setIsPending(true);
    GetAllBahanMo()
      .then((response) => {
        setBahan(response);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  useEffect(() => {
    fetchBahan();
  }, []);

  const handleChange = (event) => {
    setDataPengadaan({
      ...dataPengadaan,
      [event.target.name]: event.target.value,
    });
  };

  const submitDataPengadaan = (event) => {
    event.preventDefault();

    // Validasi sederhana
    if (!dataPengadaan.harga_pengadaan) {
      console.log("Bidang harga pengadaan harus diisi");
      return;
    }

    setIsPending(true);

    UpdatePengadaan(dataPengadaan)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        handleClose();
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
        Edit Pengeluaran
      </Button>
      <Dialog
        open={open}
        handler={handleClose}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Edit Pengeluaran</DialogHeader>
        <form action="" onSubmit={submitDataPengadaan}>
          <DialogBody>
            <div>
              <Typography variant="h5" color="black" className="mb-4">
                Harga Bahan Baku
              </Typography>
              <Input
                size="lg"
                placeholder="Masukan harga bahan baku disini"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                required
                type="number"
                name="harga_pengadaan"
                onChange={handleChange}
                value={dataPengadaan?.pengadaan.harga_pengadaan}
              />
            </div>
            <div className="grid grid-flow-col justify-stretch mt-6">
              <div className="mr-4">
                <Typography variant="h5" color="black" className="mb-4">
                  Jumlah Bahan Baku
                </Typography>
                <Input
                  size="lg"
                  placeholder="Masukan jumlah Bahan Baku"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  required
                  type="number"
                  name="jumlah_bahan_baku"
                  onChange={handleChange}
                  value={dataPengadaan?.jumlah_bahan_baku}
                />
              </div>
              <div className="mr-4">
                <Typography variant="h5" color="black" className="mb-4">
                  Bahan Baku
                </Typography>
                <select
                  name="id_bahan_baku"
                  required
                  className="w-full h-11 rounded-md border border-blue-gray-200 focus:border-gray-900 ml-2"
                  id=""
                  onChange={handleChange}
                >
                  <option value="">
                    {dataPengadaan?.bahan_baku.nama_bahan_baku}
                  </option>
                  {bahan?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.nama_bahan_baku}
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
              <span>Tidak</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
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

export default EditPengadaan;
