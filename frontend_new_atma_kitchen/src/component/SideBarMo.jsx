import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import { UserCircleIcon, PowerIcon, HomeIcon } from "@heroicons/react/24/solid";

import { useNavigate, useLocation } from "react-router-dom";

const SideBarMo = ({ routes, isOpen }) => {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Card
      className={`h-100 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ${
        isOpen ? "block" : "hidden md:block h-100"
      } bg-gray-300`}
    >
      <div className="mb-2 flex items-center gap-4 p-4">
        <img
          src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
          alt="brand"
          className="h-8 w-8"
        />
        <Typography variant="h5" color="blue-gray">
          Manager Operasional
        </Typography>
      </div>
      <List>
        {routes?.map((route, index) => (
          <Accordion key={index} open={open === index}>
            <ListItem className="p-0">
              <AccordionHeader
                onClick={() => navigate(route.path)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>{route.icon}</ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  {route.name}
                </Typography>
              </AccordionHeader>
            </ListItem>
          </Accordion>
        ))}
        <hr className="my-2 border-blue-gray-300" />
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem onClick={logout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default SideBarMo;
