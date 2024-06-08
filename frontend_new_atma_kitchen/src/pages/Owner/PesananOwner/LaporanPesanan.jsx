import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Typography, Spinner } from "@material-tailwind/react";
// import { GetTampilPesananByBulan } from "../../../api/MoApi/apiDaftarPesanan";
import toast from "react-hot-toast";
import { GetTampilPesananByBulanOwner } from "../../../api/OwnerApi/apiLaporan";

const TABLE_HEAD = ["Produk", "Kuantitas", "Harga", "Jumlah Uang"];
import { ReactToPrint } from "react-to-print";

const LaporanPesanan = () => {
  const [isPending, setIsPending] = useState(false);
  const [pesanan, setPesanan] = useState({
    bulan: "",
    tahun: "",
  });
  const [detailPesanan, setDetailPesanan] = useState([]);
  const [namaToko, setNamaToko] = useState("Atma Kitchen");
  const [alamatToko, setAlamatToko] = useState(
    "Jl. Centralpark No. 10 Yogyakarta"
  );
  const componentRef = useRef(null);

  const handleChange = (event) => {
    setPesanan({ ...pesanan, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData();
    formData.append("bulan", pesanan.bulan);
    formData.append("tahun", pesanan.tahun);
    GetTampilPesananByBulanOwner(formData)
      .then((response) => {
        setIsPending(false);
        setDetailPesanan(response.data);
        toast.success(response.message);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        toast.error(JSON.stringify(err.message));
      });
  };
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
      <div className="flex justify-center">
        <Typography variant="h4">
          Masukkan Bulan dan juga tahun untuk melihat laporan penjualan
        </Typography>
      </div>
      <form action="" onSubmit={handleSubmit} className="mt-6">
        <div>
          <Typography variant="h5" color="black">
            Bulan
          </Typography>
          <select
            name="bulan"
            required
            className="w-full h-11 rounded-md border border-blue-gray-200 focus:border-gray-900"
            id=""
            onChange={handleChange}
          >
            <option value="">Pilih Bulan</option>
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Agustus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </select>
        </div>
        <div className="mt-5">
          <Typography variant="h5" color="black">
            Tahun
          </Typography>
          <Input
            size="lg"
            placeholder="Masukan Tahun"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
            type="number"
            name="tahun"
            onChange={handleChange}
          />
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
              <span>Tampilkan</span>
            )}
          </Button>
        </div>
      </form>
      <div>
        {detailPesanan.length > 0 && (
          <div className="mt-8">
            <div ref={componentRef}>
              <div>
                <h1 className="font-bold text-4xl">{namaToko}</h1>
                <h1 className="text-xl mb-10">{alamatToko}</h1>
                <h1 className="font-bold text-xl underline">Laporan Penjualan Bulanan</h1>
                <h1 className="text-xl">Bulan : {pesanan.bulan}</h1>
                <h1 className="text-xl">Tahun : {pesanan.tahun}</h1>
                <h1 className="text-xl">Tanggal Cetak : {today}</h1>
              </div>
              <table className="mt-4 w-full min-w-max table-auto text-center border border-collapse border-blue-gray-200">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                  {detailPesanan.map((pesanan, index) => {
                    const isLast = index === detailPesanan.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-100";
                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {pesanan.nama_produk}
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
                              {pesanan.jmlh_produk}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {pesanan.harga_produk.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {(
                              pesanan.harga_produk * pesanan.jmlh_produk
                            ).toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="3" className="border-t border-blue-gray-100">
                      Total
                    </td>
                    <td className="border-t border-blue-gray-100">
                      {detailPesanan
                        .reduce(
                          (total, pesanan) =>
                            total + pesanan.jmlh_produk * pesanan.harga_produk,
                          0
                        )
                        .toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ReactToPrint
              trigger={() => {
                return <Button>Print laporan</Button>;
              }}
              content={() => componentRef.current}
              documentTitle="Laporan Stok Bahan Baku"
              pageStyle="print"
            />
          </div>
        )}
      </div>

      {/* Tampilkan pesan loading jika data sedang dimuat */}
      {isPending && (
        <div className="flex justify-center mt-4">
          <Spinner color="blue" size="xl" />
          <Typography>Loading...</Typography>
        </div>
      )}
    </div>
  );
};

export default LaporanPesanan;
