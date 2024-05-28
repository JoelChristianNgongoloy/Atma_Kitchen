import React, { useState, useEffect } from "react";
import {
  Card,
  Avatar,
  Typography,
  List,
  ListItem,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  LockClosedIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import ShowProfil from "./ShowProfil";
import GantiPassword from "./GantiPassword";
import { GetUserLogin } from "../../../api/CustomerApi/apiProfil";

const ProfilCustomer = () => {
  const [activeTab, setActiveTab] = useState("show");

  const navigate = useNavigate();

  const data = [
    {
      label: "Profil",
      value: "show",
      icon: UserCircleIcon,
      element: <ShowProfil />,
    },
    // {
    //   label: "Ganti Password",
    //   value: "ganti",
    //   icon: LockClosedIcon,
    //   element: <GantiPassword />,
    // },
  ];

  const redirectToForgetPassword = () => {
    window.location.href = "http://127.0.0.1:8000/forgetPassword";
  };

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

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mt-16">
        <div>
          <Card className="p-8 border">
            <div className="flex items-center gap-4">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
              <div>
                <Typography variant="h6">
                  {user && user.nama ? user.nama : ""}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  {user && user.email ? user.email : ""}
                </Typography>
              </div>
            </div>
          </Card>
          <Card className="mt-2 border">
            <List>
              {data.map(({ label, value, icon }) => (
                <ListItem key={value} onClick={() => setActiveTab(value)}>
                  <span className="mr-2">
                    {React.createElement(icon, { className: "w-5 h-5" })}
                  </span>
                  {label}
                </ListItem>
              ))}
              <ListItem onClick={redirectToForgetPassword}>
                <span>
                  <LockClosedIcon className="w-5 h-5 mr-2" />
                </span>
                Ganti Password
              </ListItem>
              <ListItem onClick={logout}>
                <span>
                  <PowerIcon className="w-5 h-5 mr-2" />
                </span>
                LogOut
              </ListItem>
            </List>
          </Card>
        </div>
        <div className="ml-2">
          <Card className="w-96 border">
            {data.map(
              ({ value, element }) =>
                activeTab === value && (
                  <div key={value} value={value} className="">
                    {element}
                  </div>
                )
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilCustomer;
