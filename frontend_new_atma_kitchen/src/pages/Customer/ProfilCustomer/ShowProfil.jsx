import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
  Spinner,
} from "@material-tailwind/react";

import { GetUserLogin } from "../../../api/apiProfil";
import EditProfile from "./EditProfile";

const ShowProfil = () => {
  const [isPending, setIsPending] = useState(false);

  const [user, setUser] = useState();

  const fetchUser = () => {
    setIsPending(true);
    GetUserLogin()
      .then((data) => {
        setUser(data);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl text-black mb-2">Lihat/Edit Profil</h1>
      <hr className="border-r-4 border-gray-600 mb-5" />
      {isPending ? (
        <div className="flex justify-center mb-2">
          <Spinner />
        </div>
      ) : user ? (
        <>
          <div className="mb-2">
            <h1 className="font-bold text-black">Nama Lengkap</h1>
            <p className="text-black">{user && user.nama ? user.nama : ""}</p>
          </div>
          <div className="mb-2">
            <h1 className="font-bold text-black">Username</h1>
            <p className="text-black">
              {user && user.username ? user.username : ""}
            </p>
          </div>
          <div className="mb-2">
            <h1 className="font-bold text-black">Email</h1>
            <p className="text-black">{user && user.email ? user.email : ""}</p>
          </div>
          <div className="mb-2">
            <h1 className="font-bold text-black">Tanggal Lahir</h1>
            <p className="text-black">
              {user && user.tanggal_lahir ? user.tanggal_lahir : ""}
            </p>
          </div>
        </>
      ) : (
        <div></div>
      )}
      <div className="flex justify-between">
        <div></div>
        <EditProfile customer={user} onClose={fetchUser} />
      </div>
    </div>
  );
};

export default ShowProfil;
