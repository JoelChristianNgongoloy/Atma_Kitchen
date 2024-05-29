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
import EditBahanBaku from "./EditBahanBaku";

const TABLE_HEAD = ["Nama Bahan Baku", "Delete", "Edit"];

import {
  GetAllBahan,
  DeleteBahanBaku,
} from "../../../api/AdminApi/apiBahanBaku";

const IndexBahanBaku = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [searchKeywordBahan, setSearchKeywordBahan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBahanId, setDeleteBahanId] = useState(null);

  const handleDeleteConfirmation = (bahanId) => {
    setDeleteBahanId(bahanId);
    setShowDeleteModal(true);
  };

  const deleteBahan = (id) => {
    setIsPending(true);
    DeleteBahanBaku(id)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        window.location.reload();
        fetchBahanBaku();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(err.message);
      });
  };

  const handleDelete = () => {
    if (deleteBahanId) {
      deleteBahan(deleteBahanId);
      setDeleteBahanId(null);
    }
    setShowDeleteModal(false);
  };

  const [bahanBaku, setBahanBaku] = useState([]);

  const fetchBahanBaku = () => {
    setIsLoading(true);
    GetAllBahan()
      .then((response) => {
        setBahanBaku(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBahanBaku();
  }, []);

  const handleSearchChangeBahan = (event) => {
    setSearchKeywordBahan(event.target.value);
  };

  const filteredBahanList = bahanBaku.filter((item) =>
    item.nama_bahan_baku
      .toLowerCase()
      .includes(searchKeywordBahan.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredBahanList.length / itemsPerPage);

  // Function to slice items for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between">
        <div></div>
        <div className="w-full md:w-72 mt-2 mb-5 ">
          <Input
            label="Search Bahan Baku..."
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={handleSearchChangeBahan}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : bahanBaku?.length > 0 ? (
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
              {filteredBahanList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => {
                  const isLast = index === bahanBaku.length - 1;
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
                          {item.nama_bahan_baku}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Button
                          onClick={() => handleDeleteConfirmation(item.id)}
                          variant="gradient"
                          color="red"
                        >
                          Delete Bahan Baku
                        </Button>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <EditBahanBaku bahan={item} onClose={fetchBahanBaku} />
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
          Tidak ada Bahan Baku untukmu saat ini ☹️
        </Alert>
      )}

      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogHeader>Hapus Bahan Baku</DialogHeader>
        <DialogBody>
          Apakah Anda Yakin Ingin menghapus Bahan Baku Ini???
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

export default IndexBahanBaku;
