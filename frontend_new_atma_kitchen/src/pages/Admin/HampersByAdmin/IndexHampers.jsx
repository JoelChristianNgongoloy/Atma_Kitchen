import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Alert,
  Spinner,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import EditHampers from "./EditHampers";

import { GetAllHampers, DeleteHampers } from "../../../api/AdminApi/apiHampers";

const TABLE_HEAD = [
  "Nama Hampers",
  "Deskripsi Hampers",
  "Stok Hampers",
  "Harga Hampers",
  "Detail Hampers",
  "Delete",
  "Edit",
];

const IndexHampers = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const [searchKeywordHampers, setSearchKeywordHampers] = useState("");
  const [isPending, setIsPending] = useState(false);

  const [hampers, setHampers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteHampersId, setDeleteHampersId] = useState(null);

  const handleDeleteConfirmation = (productId) => {
    setDeleteHampersId(productId);
    setShowDeleteModal(true);
  };
  const deleteHampers = (id) => {
    setIsPending(true);
    DeleteHampers(id)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        window.location.reload();
        fetchProduk();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(err.message);
      });
  };
  const handleDelete = () => {
    if (deleteHampersId) {
      deleteHampers(deleteHampersId);
      setDeleteHampersId(null);
    }
    setShowDeleteModal(false);
  };

  const fetchHampers = () => {
    setIsLoading(true);
    GetAllHampers()
      .then((data) => {
        setHampers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchHampers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchKeywordHampers(event.target.value);
  };

  const filteredHampersList = hampers.filter((item) =>
    item.nama_hampers.toLowerCase().includes(searchKeywordHampers.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredHampersList.length / itemsPerPage);

  // Function to slice items for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between">
        <div></div>
        <div className="w-full md:w-72 mt-2 mb-5 ">
          <Input
            label="Search Hampers..."
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : hampers?.length > 0 ? (
        <>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
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
              {filteredHampersList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => {
                  const isLast = index === hampers.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.nama_hampers}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.deskripsi_hampers}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.stok_hampers}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {item.harga_hampers.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Link
                          to="/admin/detailHampers"
                          className="text-blue-500 font-medium"
                        >
                          Detail Hampers
                        </Link>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Button
                          onClick={() => handleDeleteConfirmation(item.id)}
                          variant="gradient"
                          color="red"
                        >
                          Delete Hampers
                        </Button>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <EditHampers hampers={item} onClose={fetchHampers} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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
        <Alert color="red" className="text-center">
          Tidak ada Hampers untukmu saat ini ☹️
        </Alert>
      )}

      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogHeader>Hapus Hampers</DialogHeader>
        <DialogBody>
          Apakah Anda Yakin Ingin menghapus Hampers Ini???
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setShowDeleteModal(false)}
            className="mr-1"
          >
            <span>Tidak</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}>
            <span>Langsung Hapus Aje</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};

export default IndexHampers;
