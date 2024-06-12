import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Spinner,
  Alert,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@material-tailwind/react";

import { ReactToPrint } from "react-to-print";
import { getPenggunaanBahanBaku } from "../../api/MoApi/apiPenggunaanBahanBakuMo";

const TABLE_HEAD = ["ID Customer", "Total Harga", "ID Pesanan"];

const DataToPrint = ({ laporan }) => (
  <div>
    {laporan.map((item, index) => (
      <div key={index}>
        <p>ID Pesanan: {item.id_pesanan}</p>
        <p>Jumlah Produk: {item.jumlah_produk}</p>
        <p>Total Harga: {item.total_harga}</p>
        <p>Status Pesanan: {item.status_pesanan}</p>
        <p>Tanggal Pesan: {item.tanggal_pesan}</p>
        <p>Tanggal Kirim: {item.tanggal_kirim}</p>
        <p>ID Customer: {item.id_customer}</p>
        <p>Jenis Pengantaran: {item.jenis_pengantaran}</p>
      </div>
    ))}
  </div>
);

const LaporanPenggunaanBahanBakuMo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");

  const [laporan, setLaporan] = useState([]);
  const componentRef = useRef(null);

  const fetchLaporan = () => {
    setIsLoading(true);
    getPenggunaanBahanBaku()
      .then((response) => {
        setLaporan(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchLaporan(tanggalMulai, tanggalSelesai); // Menggunakan nilai tanggal_mulai dan tanggal_selesai dari state
  };

  useEffect(() => {
    fetchLaporan();
  }, []);

  return (
    <div>
      <Card className="h-full w-full" ref={componentRef}>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col items-center justify-start gap-4 md:flex-row">
            <div className="w-full md:w-72"></div>
          </div>
        </CardHeader>
        <CardBody
          className="overflow-scroll px-0"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <div>
            <h1 className="font-bold text-4xl mb-10">Atma Kitchen</h1>
            <h1 className="font-bold text-xl">Laporan Penggunaan Bahan Baku</h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  type="date"
                  label="Tanggal Mulai"
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                />
                <Input
                  type="date"
                  label="Tanggal Selesai"
                  value={tanggalSelesai}
                  onChange={(e) => setTanggalSelesai(e.target.value)}
                />
              </div>
            </form>
          </div>
          {isLoading ? (
            <div className="text-center">
              <Spinner />
              <h6 className="mt-2 mb-0">Loading...</h6>
            </div>
          ) : laporan.length > 0 ? (
            <>
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {laporan.map((item, index) => {
                    const isLast = index === laporan.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.id_pesanan}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.total_harga}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.tanggal_pesan}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.tanggal_kirim}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <Alert color="red" className="text-center">
              Belum Ada Penggunaan Bahan Baku saat ini ☹
            </Alert>
          )}
        </CardBody>
      </Card>
      <ReactToPrint
        trigger={() => {
          return <Button>Print laporan</Button>;
        }}
        content={() => componentRef.current}
        documentTitle="Laporan Penggunaan Bahan Baku"
        pageStyle="print"
      />
    </div>
  );
};

export default LaporanPenggunaanBahanBakuMo;
