import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Typography,
  Spinner,
  Button,
} from "@material-tailwind/react";
import { useReactToPrint } from "react-to-print";
import { GetAllTransaksiPenitip } from "../../../api/LaporanApi/TransaksiPenitipApi";

const TABLE_HEAD = [
  "Nama",
  "Qty",
  "Harga Jual",
  "Total",
  "20% Komisi",
  "Yang Diterima"
];

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const LaporanTransaksiPenitip = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [laporan, setLaporan] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [tahun, setTahun] = useState("");
  const [tanggalCetak, setTanggalCetak] = useState("");
  const componentRef = useRef();

  const fetchLaporan = () => {
    setIsLoading(true);
    GetAllTransaksiPenitip()
      .then((data) => {
        setLaporan(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const date = new Date();
    const defaultMonth = "Januari";
    setSelectedMonth(defaultMonth);
    fetchLaporan();
    setTahun(date.getFullYear());
    setTanggalCetak(date.toLocaleDateString("en-US"));
  }, []);

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <><div ref={componentRef}>
      <Card className="h-full w-full overflow-scroll p-6">
        <Typography className="mb-4 font-bold">Atma Kitchen</Typography>
        <Typography className="mb-4">Jl. Centralpark No. 10 Yogyakarta</Typography>
        <Typography className="mb-4 font-bold">LAPORAN Transaksi Penitip</Typography>
        <Typography className="mb-2">ID Penitip: {laporan.id_penitip}</Typography>
        <Typography className="mb-2">Nama Penitip: {laporan.nama_penitip}</Typography>
        <div className="mb-2">
          <i className="mb-2">Bulan:</i>
          <select
            onChange={(event) => handleMonthChange(event)}
          >
            {monthNames.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
      </div>

      <Typography className="mb-2">Tahun: {tahun}</Typography>
      <Typography className="mb-2">Tanggal Cetak: {tanggalCetak}</Typography>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="large" color="blue" />
        </div>
      ) : (
        <div >
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={index}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
            {laporan
            .filter((item) => item.month === selectedMonth)
            .map((item, index) => (
                  <tr key={index}>
                    <td className='border-b border-blue-gray-100 p-4'>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.nama_produk}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-100 p-4'>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.jumlah_produk}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-100 p-4'>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.harga_produk}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-100 p-4'>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.total}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-100 p-4'>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.komisi}
                      </Typography>
                    </td>
                    <td className='border-b border-blue-gray-100 p-4'>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.terima}
                      </Typography>
                    </td>
                  </tr>
                )
              )}
              
            </tbody>
          </table>
        </div>
      )}
    </Card>
    </div><button
    className="mt-4 ml-4 bg-green-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-green-600"  onClick={handlePrint}>Print PDF</button></>
  );
};

export default LaporanTransaksiPenitip;
