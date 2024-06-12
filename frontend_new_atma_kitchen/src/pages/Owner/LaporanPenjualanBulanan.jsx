import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Spinner,
  Alert,
  CardBody,
  Button,
  Input,
} from "@material-tailwind/react";
import ReactToPrint from "react-to-print";
import { getLaporanPenjualanBulanan } from "../../api/OwnerApi/apiLaporanPenjualanBulanan";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LaporanPenjualaanBulanan = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pesanan, setPesanan] = useState([]);
  const [tahun, setTahun] = useState("");
  const [error, setError] = useState(null);
  const componentRef = useRef(null);

  const fetchPesanan = async () => {
    setIsLoading(true);
    try {
      const response = await getLaporanPenjualanBulanan(tahun);
      setPesanan(response);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengambil data pesanan.");
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (tahun) {
      fetchPesanan();
    } else {
      setError("Tahun harus diisi.");
    }
  };

  const getIndonesianMonthName = (monthIndex) => {
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
    return monthNames[monthIndex - 1];
  };

  const today = `${new Date().getDate()} ${getIndonesianMonthName(new Date().getMonth() + 1)} ${new Date().getFullYear()}`;

  const groupedByMonth = pesanan.reduce((acc, item) => {
    const month = new Date(item.tanggal_kirim).getMonth() + 1;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(groupedByMonth).map(month => getIndonesianMonthName(parseInt(month))),
    datasets: [
      {
        label: 'Jumlah Transaksi',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: Object.values(groupedByMonth).map(monthlyOrders => monthlyOrders.length)
      }
    ]
  };

  return (
    <div>
      <Card className="h-full w-full" ref={componentRef}>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col items-center justify-start gap-4 md:flex-row">
            <Typography variant="h4" color="black">
              Laporan Penjualan Bulanan
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0" style={{ maxHeight: "500px", overflowY: "auto" }}>
          <div>
            <h1 className="font-bold text-4xl mb-10">Atma Kitchen</h1>
            <h1 className="font-bold text-xl">Laporan Penjualan Bulanan</h1>
            <p className="font-bold">Tahun: {tahun}</p>
            <p className="font-bold">Tanggal cetak: {today}</p>
          </div>
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <Input
                size="lg"
                label="Tahun"
                type="number"
                min="2000"
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
              />
              <Button type="submit">Cari</Button>
            </div>
          </form>
          {error && (
            <Alert color="red" className="my-4">
              {error}
            </Alert>
          )}
          {isLoading ? (
            <div className="text-center">
              <Spinner />
              <h6 className="mt-2 mb-0">Loading...</h6>
            </div>
          ) : Object.keys(groupedByMonth).length > 0 ? (
            <>
              <table className="mt-4 w-full min-w-max table-auto text-left border-collapse border border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-2">Bulan</th>
                    <th className="border border-black p-2">Jumlah Transaksi</th>
                    <th className="border border-black p-2">Jumlah Uang</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 12 }, (_, index) => {
                    const monthIndex = index + 1;
                    const monthName = getIndonesianMonthName(monthIndex);
                    const monthlyOrders = groupedByMonth[monthIndex] || [];
                    const totalTransaksi = monthlyOrders.length;
                    const totalUang = monthlyOrders.reduce((sum, item) => sum + item.total_bayar, 0);
                    return (
                      <tr key={monthIndex}>
                        <td className="border border-black p-2">{monthName}</td>
                        <td className="border border-black p-2">{totalTransaksi}</td>
                        <td className="border border-black p-2">{totalUang.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="border border-black p-2 font-bold">Total</td>
                    <td className="border border-black p-2 font-bold">{pesanan.length}</td>
                    <td className="border border-black p-2 font-bold">
                      {pesanan.reduce((sum, item) => sum + item.total_bayar, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                    </td>
                  </tr>
                </tfoot>
              </table>
              
            </>
          ) : (
            <Alert color="red" className="text-center">
              Tidak ada pesanan untuk tahun yang dipilih ☹
            </Alert>
          )}
        </CardBody>
       
      </Card>
      <div className="mt-6">
                <Bar
                  data={chartData}
                  options={{
                    title: {
                      display: true,
                      text: 'Jumlah Transaksi per Bulan',
                      fontSize: 20
                    },
                    legend: {
                      display: true,
                      position: 'right'
                    }
                  }}
                />
              </div>
      <ReactToPrint
        trigger={() => {
          return <Button className="mt-6">Print Laporan</Button>;
        }}
        content={() => componentRef.current}
        documentTitle="Laporan Penjualan Bulanan"
        pageStyle="print"
      />
    </div>
  );
};

export default LaporanPenjualaanBulanan;
