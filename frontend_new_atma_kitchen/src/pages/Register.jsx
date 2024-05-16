import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { AuthRegister } from "../api/Auth";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardBody,
  Spinner,
  Alert,
} from "@material-tailwind/react";

const Register = () => {
  const navigate = useNavigate();

  const [isDisable, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    nama: "",
    username: "",
    password: "",
    tanggal_lahir: "",
    email: "",
  });

  const handleChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setData(newData);
    if (
      newData.email.trim().length > 0 &&
      newData.password.length > 0 &&
      newData.nama.trim().length > 0 &&
      newData.username.trim().length > 0 &&
      newData.tanggal_lahir.trim().length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const [loading, setLoading] = useState(false);

  const SignUp = (event) => {
    event.preventDefault();
    setLoading(true);
    AuthRegister(data)
      .then((res) => {
        navigate("/");
        setLoading(false);
        console.log(res.message);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-full flex justify-center mt-14">
      <div>
        <Card className="mx-auto w-full border" color="white">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Register
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details to Register.
            </Typography>
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={SignUp}
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                </Typography>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="nama"
                  onChange={handleChange}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Username
                </Typography>
                <Input
                  size="lg"
                  type="text"
                  placeholder="Username"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="username"
                  onChange={handleChange}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Date Birth
                </Typography>
                <Input
                  size="lg"
                  placeholder="D"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  type="date"
                  name="tanggal_lahir"
                  onChange={handleChange}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="email"
                  onChange={handleChange}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <Button
                disabled={isDisable || loading}
                type="submit"
                className="mt-6 flex justify-center"
                fullWidth
              >
                {loading ? <Spinner variant="light" /> : <span>Register</span>}
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <a href="/" className="font-medium text-gray-900">
                  Log In
                </a>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;
