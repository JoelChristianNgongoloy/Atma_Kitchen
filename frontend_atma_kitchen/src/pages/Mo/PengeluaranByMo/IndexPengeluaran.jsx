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

const TABLE_HEAD = [
  "Nama Pengeluaran",
  "Tanggal Pengeluaran",
  "Total Pengeluaran",
  "qty Pengeluaran",
  "Delete",
  "Edit",
];

import EditPengeluaran from "./EditPengeluaran";

import {
  GetAllPengeluaran,
  DeletePengeluaran,
} from "../../../api/MoApi/apiPengeluaran";

const IndexPengeluaran = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [searchKeywordPengeluaran, setSearchKeywordPengeluaran] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deletePengeluaranId, setDeletePengeluaranId] = useState(null);

  const handleDeleteConfirmation = (pengeluaranId) => {
    setDeletePengeluaranId(pengeluaranId);
    setShowDeleteModal(true);
  };

  const handleDeletePengeluaran = (id) => {
    setIsPending(true);
    DeletePengeluaran(id)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        fetchPengeluaran();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting role:", error);
        setIsPending(false);
      });
  };

  const handleDelete = () => {
    if (deletePengeluaranId) {
      handleDeletePengeluaran(deletePengeluaranId);
      setDeletePengeluaranId(null);
    }
    setShowDeleteModal(false);
  };

  const [pengeluaranList, setPengeluaranList] = useState([]);

  const fetchPengeluaran = () => {
    setIsLoading(true);
    GetAllPengeluaran()
      .then((data) => {
        setPengeluaranList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPengeluaran();
  }, []);

  const handleSearchChangePengeluaran = (event) => {
    setSearchKeywordPengeluaran(event.target.value);
  };

  const filteredPengeluaranList = pengeluaranList.filter((item) =>
    item.nama_pengeluaran
      .toLowerCase()
      .includes(searchKeywordPengeluaran.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredPengeluaranList.length / itemsPerPage);

  // Function to slice items for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between">
        <div></div>
        <div className="w-full md:w-72 mt-2 mb-5 ">
          <Input
            label="Search Pengeluaran..."
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={handleSearchChangePengeluaran}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : pengeluaranList?.length > 0 ? (
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
              {filteredPengeluaranList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => {
                  const isLast = index === pengeluaranList.length - 1;
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
                          {item.nama_pengeluaran}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.tanggal_pengeluaran}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.total_pengeluaran.toLocaleString("id-ID", {
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
                          {item.qty_pengeluaran}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Button
                          onClick={() => handleDeleteConfirmation(item.id)}
                          variant="gradient"
                          color="red"
                        >
                          Delete Pengeluaran
                        </Button>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <EditPengeluaran
                          pengeluaran={item}
                          onClose={fetchPengeluaran}
                        />
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
          Tidak ada Pengeluaran untukmu saat ini ☹️
        </Alert>
      )}

      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogHeader>Hapus Pengeluaran</DialogHeader>
        <DialogBody>
          Apakah Anda Yakin Ingin menghapus Pengeluaran Ini???
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

export default IndexPengeluaran;
