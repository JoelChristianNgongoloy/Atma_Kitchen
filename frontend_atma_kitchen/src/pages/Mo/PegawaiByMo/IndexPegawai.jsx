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

import { GetAllPegawai, DeletePegawai } from "../../../api/MoApi/apiPegawai";
const TABLE_HEAD = [
  "Pegawai",
  "Username",
  "Jabatan",
  "Tanggal Lahir",
  "Delete",
  "Edit",
];

import EditPegawai from "./EditPegawai";

const IndexPegawai = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePegawaiId, setDeletePegawaiId] = useState(null);

  const handleDeleteConfirmation = (pegawaiId) => {
    setDeletePegawaiId(pegawaiId);
    setShowDeleteModal(true);
  };

  const deletePegawai = (id) => {
    setIsPending(true);
    DeletePegawai(id)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        window.location.reload();
        fetchPegawai();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(err.message);
      });
  };

  const handleDelete = () => {
    if (deletePegawaiId) {
      deletePegawai(deletePegawaiId);
      setDeletePegawaiId(null);
    }
    setShowDeleteModal(false);
  };

  const [pegawai, setPegawai] = useState([]);

  const fetchPegawai = () => {
    setIsLoading(true);
    GetAllPegawai()
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

  const [searchKeywordPegawai, setSearchKeywordPegawai] = useState("");

  const handleSearchChangePegawai = (event) => {
    setSearchKeywordPegawai(event.target.value);
  };

  const filteredPegawaiList = pegawai.filter((item) =>
    item.nama.toLowerCase().includes(searchKeywordPegawai.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPegawaiList.length / itemsPerPage);

  // Function to slice items for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={handleSearchChangePegawai}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {isLoading ? (
            <div className="text-center">
              <Spinner />
              <h6 className="mt-2 mb-0">Loading...</h6>
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
                  {filteredPegawaiList
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
                                  {item.nama}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {item.email}
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
                                {item.username}
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
                                {item.role.jenis_role}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.tanggal_lahir}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <Button
                                onClick={() =>
                                  handleDeleteConfirmation(item.id)
                                }
                                variant="gradient"
                                color="red"
                              >
                                Delete Pegawai
                              </Button>
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <EditPegawai pegawai={item} onClose={fetchPegawai} />
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
      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogHeader>Hapus Produk</DialogHeader>
        <DialogBody>
          Apakah Anda Yakin Ingin menghapus Pegawai ini???
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            className="mr-1"
            onClick={() => setShowDeleteModal(false)}
          >
            <span>Tidak</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}>
            <span>Langsung Hapus Aje</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default IndexPegawai;
