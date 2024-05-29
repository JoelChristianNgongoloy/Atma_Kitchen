import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Spinner,
  Alert,
  Chip
} from "@material-tailwind/react";
import { GetProdukKue } from "../../../../api/CustomerApi/CatalogApi/CatalogApi";
import { getFotoProduk } from "../../../../api";
import { useNavigate } from "react-router-dom";

const CakeIndex = () => {
  const [kue, setKue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

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

  const filteredKueList = kue.filter((item) =>
    item.nama_produk.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const navigationProduk = (item) => {
    if (item.status_produk === "Pre Order") {
      navigate(`/informationprodukdate/${item.id}`);
    } else {
      navigate(`/informationproduk/${item.id}`);
    }
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
