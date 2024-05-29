import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Spinner,
  Alert,
} from "@material-tailwind/react";

import { toast } from "react-hot-toast";

import { GetAlamatCustomer } from "../../../api/CustomerApi/AlamatApi";

const IndexAlamat = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [isLoading, setIsLoading] = useState(false);

  const [alamat, setAlamat] = useState([]);

  const fetchAlamat = () => {
    setIsLoading(true);
    GetAlamatCustomer()
      .then((data) => {
        setAlamat(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const totalPages = Math.ceil(alamat.length / itemsPerPage);

  // Function to slice items for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    fetchAlamat();
  }, []);
  return (
    <div className="px-2">
      <div>
        {isLoading ? (
          <div className="text-center">
            <Spinner />
            <h6 className="mt-2 mb-0">Loading...</h6>
          </div>
        ) : alamat?.length > 0 ? (
          <>
            {alamat
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item, index) => {
                const isLast = index === alamat.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <Card
                    key={index}
                    className={`${classes} flex flex-col md:flex-row justify-between items-center`}
                  >
                    <Typography variant="h6" className="p-2" color="blue-gray">
                      {item.alamat_customer}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="p-2 font-normal"
                    >
                      {item.kode_pos}
                    </Typography>
                  </Card>
                );
              })}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                {[...Array(totalPages).keys()].map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber + 1)}
                    variant="text"
                    color={pageNumber + 1 === currentPage ? "blue" : "black"}
                    className="mx-1"
                  >
                    {pageNumber + 1}
                  </Button>
                ))}
              </div>
            )}
          </>
        ) : (
          <Alert color="red">
            <h1 className="">Belum Ada Alamat Bro</h1>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default IndexAlamat;
  