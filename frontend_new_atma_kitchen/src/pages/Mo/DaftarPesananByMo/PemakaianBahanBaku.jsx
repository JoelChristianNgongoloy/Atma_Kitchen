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
} from "@material-tailwind/react";

import { ReactToPrint } from "react-to-print";

import { GetAllPencatatanBahanBaku } from "../../../api/MoApi/apiDaftarPesanan";

const TABLE_HEAD = ["Nama Bahan", "Satuan", "Stok"];

const PemakaianBahanBaku = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [catat, setCatat] = useState([]);
  // const [tanggalCetak, setTanggalCetak] = useState("");
  const componentRef = useRef(null);
  const fetchCatat = () => {
    setIsLoading(true);
    GetAllPencatatanBahanBaku()
      .then((response) => {
        setCatat(response);
        // setTanggalCetak(response.tanggal);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCatat();
  }, []);

  const [today, setToday] = useState(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day} ${getIndonesianMonthName(month)} ${year}`;
  });

  function getIndonesianMonthName(monthIndex) {
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return monthNames[monthIndex];
  }

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

            <h1 className="font-bold text-xl">Laporan Stok Bahan Baku</h1>
            <h1 className="text-xl">Tanggal Cetak: {today}</h1>
          </div>
          {isLoading ? (
            <div className="text-center">
              <Spinner />
              <h6 className="mt-2 mb-0">Loading...</h6>
            </div>
          ) : catat.length > 0 ? (
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
                  {catat.map((item, index) => {
                    const isLast = index === catat.length - 1;
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
                              {item.bahan_baku.nama_bahan_baku}
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
                              {item.satuan}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.jumlah_bahan_baku}
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
              Belum Ada Pencatatan Bahan Baku saat ini ☹️
            </Alert>
          )}
        </CardBody>
      </Card>
      <ReactToPrint
        trigger={() => {
          return <Button>Print laporan</Button>;
        }}
        content={() => componentRef.current}
        documentTitle="Laporan Stok Bahan Baku"
        pageStyle="print"
      />
    </div>
  );
};

export default PemakaianBahanBaku;
