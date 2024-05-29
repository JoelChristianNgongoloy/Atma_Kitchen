import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
  Alert,
  Avatar,
  CardFooter,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { GetAllPegawaiByOwner } from "../../../api/OwnerApi/apiUbahGaji";
import EditGaji from "./EditGaji";

const TABLE_HEAD = [
  "Pegawai",
  "Username",
  "Tanggal Lahir",
  "Gaji Pegawai",
  "Bonus Gaji",
  "Edit",
];

const GajiOwner = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [pegawai, setPegawai] = useState([]);

  const fetchPegawai = () => {
    setIsLoading(true);
    GetAllPegawaiByOwner()
      .then((data) => {
        setPegawai(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPegawai();
  }, []);

  const [searchKeywordGaji, setSearchKeywordGaji] = useState("");
  const handleSearchChangeGaji = (event) => {
    setSearchKeywordGaji(event.target.value);
  };

  const filteredGajiList = pegawai.filter((item) =>
    item.user.nama.toLowerCase().includes(searchKeywordGaji.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGajiList.length / itemsPerPage);

  // Function to slice items for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">Gaji By Owner</h1>
      <p className="w-3/5 mb-4">
        Hai Owner Bosq, Disini anda bisa melihat, mencari, dan mengubah gaji dan
        bonus daftar Pegawai Atma Kitchen.
      </p>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={handleSearchChangeGaji}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {isLoading ? (
            <div className="">
              <div>
                <Spinner className="content-center" />
                <h6 className="mt-2 mb-0">Loading...</h6>
              </div>
            </div>
          ) : pegawai?.length > 0 ? (
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
                  {filteredGajiList
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item, index) => {
                      const isLast = index === pegawai.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar
                                src="https://docs.material-tailwind.com/img/face-2.jpg"
                                alt="avatar"
                                size="sm"
                              />
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {item.user.nama}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {item.user.email}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {item.user.username}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.user.tanggal_lahir}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.gaji_pegawai.toLocaleString("id-ID", {
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
                              {item.bonus_gaji.toLocaleString("id-ID", {
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
                              <EditGaji pegawai={item} onClose={fetchPegawai} />
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
              Tidak ada Pegawai untukmu saat ini ☹️
            </Alert>
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of {totalPages}
          </Typography>
          <div className="flex gap-2">
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default GajiOwner;
