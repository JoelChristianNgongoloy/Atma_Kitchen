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
  Spinner,
  Alert,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import EditResep from "./EditResep";

import {
  GetAllResep,
  DeleteResep,
} from "../../../api/AdminApi/apiResep";

const TABLE_HEAD = [
  "Nama Resep",
  "Nama Produk",
  "Detail Resep",
  "Delete",
  "Edit",
];


const IndexResep = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const [searchKeywordResep, setSearchKeywordResep] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteResepId, setDeleteResepId] = useState(null);

  const handleDeleteConfirmation = (resepId) => {
    setDeleteResepId(resepId);
    setShowDeleteModal(true);
  };

  const deleteResep = (id) => {
    setIsPending(true);
    DeleteResep(id)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        window.location.reload();
        fetchResep();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(err.message);
      });
  };

  const handleDelete = () => {
    if (deleteResepId) {
      deleteResep(deleteResepId);
      setDeleteResepId(null);
    }
    setShowDeleteModal(false);
  };

  const [resep, setResep] = useState([]);

  const fetchResep = () => {
    setIsLoading(true);
    GetAllResep()
      .then((data) => {
        setResep(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchResep();
  }, []);

  const handleSearchChangeResep = (event) => {
    setSearchKeywordResep(event.target.value);
  };

  const filteredResepList = resep.filter((item) =>
    item.nama_resep.toLowerCase().includes(searchKeywordResep.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredResepList.length / itemsPerPage);

  // Function to slice items for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between">
        <div></div>
        <div className="w-full md:w-72 mt-2 mb-5 ">
          <Input
            label="Search Resep..."
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={handleSearchChangeResep}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : resep?.length > 0 ? (
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
              {filteredResepList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => {
                  const isLast = index === resep.length - 1;
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
                          {item.nama_resep}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.produk.nama_produk}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Link
                          to="/admin/resep/detailResep"
                          className="text-blue-500 font-medium"
                        >
                          Detail Resep
                        </Link>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Button
                          onClick={() => handleDeleteConfirmation(item.id)}
                          variant="gradient"
                          color="red"
                        >
                          Delete Resep
                        </Button>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <EditResep resep={item} onClose={fetchResep} />
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
          Tidak ada Resep untukmu saat ini ☹️
        </Alert>
      )}

      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogHeader>Hapus Resep</DialogHeader>
        <DialogBody>Apakah Anda Yakin Ingin menghapus Resep Ini???</DialogBody>
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

export default IndexResep;
