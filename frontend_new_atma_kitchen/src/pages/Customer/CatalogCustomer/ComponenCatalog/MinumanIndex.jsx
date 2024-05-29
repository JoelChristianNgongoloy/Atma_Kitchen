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
import { GetProdukMinuman } from "../../../../api/CustomerApi/CatalogApi/CatalogApi";
import { getFotoProduk } from "../../../../api";
import { useNavigate } from "react-router-dom";

const MinumanIndex = () => {
  const [minuman, setMinuman] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const navigate = useNavigate();

  const fetchKue = () => {
    setIsLoading(true);
    GetProdukMinuman()
      .then((data) => {
        setMinuman(data);
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

  const filteredMinumanList = minuman.filter((item) =>
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
        <h1 className="font-bold text-3xl mb-4">Minuman</h1>
        <h1 className="text-xl">
          Lengkapi santapan Anda dengan pilihan minuman susu segar kami. Mulai
          dari susu murni, susu almond, hingga susu kedelai, setiap tegukan akan
          memberikan kelezatan dan nutrisi yang menyehatkan.
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
          ) : minuman?.length > 0 ? (
            filteredMinumanList.map((item, index) => (
              <Card
                className="w-full h-full flex flex-col cursor-pointer"
                key={index}
                onClick={() => navigationProduk(item)}
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
                  <div>
                    <Typography
                      color="blue-gray"
                      className="font-medium"
                      textGradient
                    >
                      {item.loyang}
                    </Typography>
                    <Chip
                      color="green"
                      className="text-center"
                      value={item.status_produk}
                    />
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Alert color="red" className="text-center">
              Tidak Ada Minum saat ini ☹️
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinumanIndex;
