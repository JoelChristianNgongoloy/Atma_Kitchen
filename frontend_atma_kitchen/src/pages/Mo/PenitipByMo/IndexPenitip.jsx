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

const TABLE_HEAD = ["Nama Penitip", "Tanggal Menitip", "Delete", "Edit"];

import { AmbilPenitip, DeletePenitip } from "../../../api/MoApi/apiPenitip";

import EditPenitip from "./EditPenitip";

const IndexPenitip = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [searchKeywordPenitip, setSearchKeywordPenitip] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deletePenitipId, setDeletePenitipId] = useState(null);

  const handleDeleteConfirmation = (penitipId) => {
    setDeletePenitipId(penitipId);
    setShowDeleteModal(true);
  };

  const deletePenitip = (id) => {
    setIsPending(true);
    DeletePenitip(id)
      .then((response) => {
        setIsPending(false);
        console.log(response.message);
        window.location.reload();
        fetchPenitip();
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        console.log(err.message);
      });
  };

  const handleDelete = () => {
    if (deletePenitipId) {
      deletePenitip(deletePenitipId);
      setDeletePenitipId(null);
    }
    setShowDeleteModal(false);
  };

  const [penitip, setPenitip] = useState([]);

  const fetchPenitip = () => {
    setIsLoading(true);
    AmbilPenitip()
      .then((data) => {
        setPenitip(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPenitip();
  }, []);

  const handleSearchChangePenitip = (event) => {
    setSearchKeywordPenitip(event.target.value);
  };

  const filteredPenitipList = penitip.filter((item) =>
    item.nama_penitip.toLowerCase().includes(searchKeywordPenitip.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredPenitipList.length / itemsPerPage);

  // Function to slice items for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between">
        <div></div>
        <div className="w-full md:w-72 mt-2 mb-5 ">
          <Input
            label="Search Penitip..."
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={handleSearchChangePenitip}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : penitip?.length > 0 ? (
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
              {filteredPenitipList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => {
                  const isLast = index === penitip.length - 1;
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
                          {item.nama_penitip}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.tanggal_menitip}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Button
                          onClick={() => handleDeleteConfirmation(item.id)}
                          variant="gradient"
                          color="red"
                        >
                          Delete Penitip
                        </Button>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <EditPenitip penitip={item} onClose={fetchPenitip}/>
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
          Tidak ada  Penitip untukmu saat ini ☹️
        </Alert>
      )}

      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogHeader>Hapus Penitip</DialogHeader>
        <DialogBody>
          Apakah Anda Yakin Ingin menghapus Penitip Ini???
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

export default IndexPenitip;
