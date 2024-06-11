import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Typography,
  Spinner,
  Select,
  MenuItem,
} from "@material-tailwind/react";
import { GetAllPresensiGaji } from "../../../api/LaporanApi/PresensiGajiApi";
import { useReactToPrint } from "react-to-print";

const TABLE_HEAD = [
  "Nama",
  "Jumlah Hadir",
  "Jumlah Bolos",
  "Honor Harian",
  "Bonus Rajin",
  "Total",
];

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const LaporanPresensiGaji = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [laporan, setLaporan] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [tahun, setTahun] = useState("");
  const [tanggalCetak, setTanggalCetak] = useState("");
  const componentRef = useRef();

  const fetchLaporan = () => {
    setIsLoading(true);
    GetAllPresensiGaji()
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
              <Typography className="mb-4 font-bold">LAPORAN Presensi Karyawan</Typography>
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
                                      <td className="border-b border-blue-gray-100 p-4">{item.nama}</td>
                                      <td className="border-b border-blue-gray-100 p-4">{item.jumlah_hadir}</td>
                                      <td className="border-b border-blue-gray-100 p-4">{item.jumlah_bolos}</td>
                                      <td className="border-b border-blue-gray-100 p-4">Rp.{item.honor_harian}</td>
                                      <td className="border-b border-blue-gray-100 p-4">Rp.{item.bonus_rajin}</td>
                                      <td className="border-b border-blue-gray-100 p-4">Rp.{item.total}</td>
                                  </tr>
                              ))}
                              <tr>
                                    <td colSpan={5} className="border-b border-blue-gray-100 p-4">Total</td>
                                    <td className="border-b border-blue-gray-100 p-4">Rp.{laporan
                              .filter((item) => item.month === selectedMonth).reduce((acc, curr) => acc + curr.total, 0)}</td>
                              </tr>
                      </tbody>
                  </table>
              )}

          </Card>
      </div><button
                        className="mt-4 ml-4 bg-green-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-green-600"  onClick={handlePrint}>Print PDF</button></>
  );
};

export default LaporanPresensiGaji;
