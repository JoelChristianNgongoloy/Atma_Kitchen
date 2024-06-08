import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Spinner,
  Alert,
  Chip,
} from "@material-tailwind/react";
import { GetProdukKue } from "../../../../api/CustomerApi/CatalogApi/CatalogApi";
import { getFotoProduk } from "../../../../api";
import { useNavigate } from "react-router-dom";

const CakeIndex = () => {
  const [kue, setKue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const fetchKue = () => {
    setIsLoading(true);
    GetProdukKue()
      .then((data) => {
        setKue(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchKue();
  }, []);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredKueList = kue.filter((item) =>
    item.nama_produk.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const navigationProduk = (item) => {
    if (item.status_produk === "Pre Order" && !selectedDate) {
      setShowAlert(true);
    } else {
      if (item.status_produk === "Pre Order" && selectedDate) {
        const tanggal = encodeURIComponent(selectedDate);
        navigate(`/informationprodukdate/${item.id}/${tanggal}`);
      } else {
        navigate(`/informationproduk/${item.id}`);
      }
    }
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().slice(0, 10);
      dates.push(formattedDate);
    }
    return dates;
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="font-bold text-3xl mb-4">Kue</h1>
        <h1 className="text-xl">
          Nikmati aneka Kue kami yang lembut dan lezat, dibuat dengan
          bahan-bahan terbaik. Dari Kue Lapis Legit hingga Kue Lapis Surabaya
          yang memukau, kami memiliki segala yang Anda butuhkan untuk merayakan
          momen spesial Anda.
        </h1>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Cari Kue..."
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={selectedDate}
          onChange={handleDateChange}
          className="ml-2 p-2 border border-gray-300 rounded"
        >
          <option value="">Pilih Tanggal Kuota</option>
          {generateDateOptions().map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        <h1 className="text-xl">
          Pilihlah tanggal kuota untuk melakukan pre
        </h1>
      </div>
      {showAlert && (
        <Alert color="red" className="mb-4 text-center">
          Harap pilih tanggal untuk produk pre-order.
        </Alert>
      )}
      <div className="">
        <div className="grid grid-cols-3 gap-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-center">
                <Spinner />
                <h6 className="mt-2 mb-0">Loading...</h6>
              </div>
            </div>
          ) : kue?.length > 0 ? (
            filteredKueList.map((item, index) => (
              <Card
                className="w-full h-full flex flex-col cursor-pointer"
                onClick={() => navigationProduk(item)}
                key={index}
              >
                <CardHeader floated={false} className="h-48 overflow-hidden">
                  <img
                    src={getFotoProduk(item.foto_produk)}
                    alt="profile-picture"
                    className="w-full h-full object-cover"
                  />
                </CardHeader>
                <CardBody className="flex-grow flex flex-col justify-between">
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                    {item.nama_produk}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-medium"
                    textGradient
                  >
                    {item.harga_produk.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </Typography>
                  <div className="flex justify-between">
                    <div></div>
                    <Chip color="blue" value={item.status_produk} />
                  </div>
                </CardBody>
                <CardFooter className="flex justify-center pt-2">
                  <Typography
                    color="blue-gray"
                    className="font-medium"
                    textGradient
                  >
                    {item.loyang}
                  </Typography>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Alert color="red" className="text-center">
              Tidak Ada Kue untukmu saat ini ☹️
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default CakeIndex;
