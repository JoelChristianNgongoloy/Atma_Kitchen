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

import EditProduk from "./EditProduk";

import {
  GetAllProduk,
  DeleteProduk,
  GetAllProdukPenitip,
} from "../../../api/AdminApi/apiProduk";

const TABLE_HEAD = [
  "Nama Product",
  "Deskripsi Produk",
  "Stok",
  "harga",
  "Status Produk",
  "Delete",
  "Edit",
];

const TABLE_HEAD_TITIPAN = [
  "Nama Product",
  "Deskripsi Produk",
  "Stok",
  "harga",
  "Status Produk",
  "Penitip",
  "Delete",
  "Edit",
];

const IndexProduk = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchKeywordTitipan, setSearchKeywordTitipan] = useState("");

  const [produk, setProduk] = useState([]);
  const [produkPenitip, setProdukPenitip] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const handleDeleteConfirmation = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteModal(true);
  };
  const deleteProduk = (id) => {
    setIsPending(true);
    DeleteProduk(id)
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
    if (deleteProductId) {
      deleteProduk(deleteProductId);
      setDeleteProductId(null);
    }
    setShowDeleteModal(false);
  };

  const fetchProduk = () => {
    setIsLoading(true);
    GetAllProduk()
      .then((data) => {
        setProduk(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProdukPenitip = () => {
    setIsLoading(true);
    GetAllProdukPenitip()
      .then((data) => {
        setProdukPenitip(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProdukPenitip();
  }, []);

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchChangeTitipan = (event) => {
    setSearchKeywordTitipan(event.target.value);
  };

  const filteredProdukList = produk.filter((item) =>
    item.nama_produk.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const filteredProdukTitipanList = produkPenitip.filter((item) =>
    item.nama_produk.toLowerCase().includes(searchKeywordTitipan.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProdukList.length / itemsPerPage);

  // Function to slice items for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="h-full w-full overflow-scroll">
      <div className="flex justify-between">
        <div className="w-full md:w-72 mt-2 mb-5 items-center">
          <h2 className="font-bold text-center align-middle">Product</h2>
        </div>
        <div className="w-full md:w-72 mt-2 mb-5 ">
          <Input
            label="Search Product..."
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
      ) : produk?.length > 0 ? (
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
              {filteredProdukList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => {
                  const isLast = index === produk.length - 1;
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
                          {item.nama_produk}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.deskripsi_produk}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.stok_produk}
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
                          {item.harga_produk.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
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
                          {item.status_produk}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Button
                          onClick={() => handleDeleteConfirmation(item.id)}
                          variant="gradient"
                          color="red"
                        >
                          Delete Produk
                        </Button>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <EditProduk produk={item} onClose={fetchProduk}/>
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
          Tidak ada Produk untukmu saat ini ☹️
        </Alert>
      )}
      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogHeader>Hapus Produk</DialogHeader>
        <DialogBody>Apakah Anda Yakin Ingin menghapus Produk Ini???</DialogBody>
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

      <div className="flex justify-between mt-10">
        <div className="w-full md:w-72 mt-2 mb-5 items-center">
          <h2 className="font-bold text-center align-middle">
            Product Titipan
          </h2>
        </div>
        <div className="w-full md:w-72 mt-2 mb-5 ">
          <Input
            label="Search Product Titipan..."
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={handleSearchChangeTitipan}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : produkPenitip?.length > 0 ? (
        <>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD_TITIPAN.map((head) => (
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
              {filteredProdukTitipanList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => {
                  const isLast = index === produk.length - 1;
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
                          {item.nama_produk}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.deskripsi_produk}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.stok_produk}
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
                          {item.harga_produk.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
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
                          {item.status_produk}
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
                          {item.penitip.nama_penitip}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Button
                          onClick={() => handleDeleteConfirmation(item.id)}
                          variant="gradient"
                          color="red"
                        >
                          Delete Produk
                        </Button>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        {/* <EditProduk produk={item} onClose={fetchProduk} /> */}
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
          Belum ada Produk Penitip untukmu saat ini ☹️
        </Alert>
      )}
    </Card>
  );
};

export default IndexProduk;
