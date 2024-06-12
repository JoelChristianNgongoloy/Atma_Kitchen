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
  "Nama Bahan Baku",
  "Jumlah Bahan Baku",
  "Harga Bahan Baku",
  "Total Harga",
  "Tanggal Pengadaan",
  "Delete",
  "Edit",
];
import { GetAllPengadaan } from "../../../api/MoApi/apiPengadaan";
import EditPengadaan from "./EditPengadaan";
const IndexPembelian = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchKeywordBeli, setSearchKeywordBeli] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [beli, setBeli] = useState([]);

  const fetchBeli = () => {
    setIsLoading(true);
    GetAllPengadaan()
      .then((data) => {
        setBeli(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBeli();
  }, []);

  const handleSearchChangeBeli = (event) => {
    setSearchKeywordBeli(event.target.value);
  };
  const filteredBeliList = beli.filter((item) =>
    item.bahan_baku.nama_bahan_baku
      .toLowerCase()
      .includes(searchKeywordBeli.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredBeliList.length / itemsPerPage);

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
            onChange={handleSearchChangeBeli}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <div>
            <Spinner />
          </div>
        </div>
      ) : beli?.length > 0 ? (
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
              {filteredBeliList
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => {
                  const isLast = index === beli.length - 1;
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
                          {item.bahan_baku.nama_bahan_baku}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.jumlah_bahan_baku}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.pengadaan.harga_pengadaan.toLocaleString(
                            "id-ID",
                            {
                              style: "currency",
                              currency: "IDR",
                            }
                          )}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.total_harga.toLocaleString("id-ID", {
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
                          {item.pengadaan.tanggal_pengadaan}
                        </Typography>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <Button
                          // onClick={() => handleDeleteConfirmation(item.id)}
                          variant="gradient"
                          color="red"
                        >
                          Delete Pengadaan
                        </Button>
                      </td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        <EditPengadaan
                          dataPengadaans={item}
                          onClose={fetchBeli}
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
          Tidak ada Pengadaan untukmu saat ini ☹️
        </Alert>
      )}

      {/* <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
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
        </Dialog> */}
    </Card>
  );
};

export default IndexPembelian;
