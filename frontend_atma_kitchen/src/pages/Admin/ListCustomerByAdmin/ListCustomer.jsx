import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Spinner,
  Alert,
} from "@material-tailwind/react";
const TABLE_HEAD = ["Member", "Username", "Tanggal Lahir"];

import { GetAllCustomer } from "../../../api/AdminApi/apiListCustomer";

const ListCustomer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [customer, setCustomer] = useState([]);

  const fetchCustomer = () => {
    setIsPending(true);
    GetAllCustomer()
      .then((data) => {
        setCustomer(data);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  useEffect(() => {
    fetchCustomer();
  }, []);
  const [searchKeywordCustomer, setSearchKeywordCustomer] = useState("");

  const handleSearchChangeCustomer = (event) => {
    setSearchKeywordCustomer(event.target.value);
  };

  const filteredCustomerList = customer.filter((item) =>
    item.nama.toLowerCase().includes(searchKeywordCustomer.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomerList.length / itemsPerPage);

  // Function to slice items for pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">List Customer By Admin</h1>
      <p className="w-3/5 mb-4">
        Hai Admin, Disini anda bisa melihat dan mencari daftar Customer Atma
        Kitchen.
      </p>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={handleSearchChangeCustomer}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {isPending ? (
            <div className="text-center">
              <Spinner />
              <h6 className="mt-2 mb-0">Loading...</h6>
            </div>
          ) : customer?.length > 0 ? (
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
                  {filteredCustomerList
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((item, index) => {
                      const isLast = index === customer.length - 1;
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
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.tanggal_lahir}
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
              Tidak ada Customer untukmu saat ini ☹️
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

export default ListCustomer;
