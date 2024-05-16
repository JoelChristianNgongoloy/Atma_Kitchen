import React, { useEffect, useState } from "react";
import { AuthLogin } from "../api/Auth";
import { Link, useNavigate } from "react-router-dom";
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

const Login = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [token, setToken] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  //   const [toastMessage, setToastMessage] = useState("");

  const handleChange = (event) => {
    const newData = { ...data, [event.target.name]: event.target.value };
    setData(newData);
    if (newData.email.trim().length > 0 && newData.password.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const SignIn = (event) => {
    event.preventDefault();
    setLoading(true);
    AuthLogin(data)
      .then((res) => {
        console.log("Response:", res);
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("userRole", res.data.id_role);
        if (res.data.id_role === 2) {
          navigate("/admin");
          //   <Alert color="green">Welcome Admin</Alert>
        } else if (res.data.id_role === 3) {
          navigate("/mo");
          setToastMessage("Welcome, mo!");
        } else if (res.data.id_role === 1) {
          navigate("/owner");
          setToastMessage("Welcome Owner!");
        } else if (res.data.id_role === 4) {
          navigate("/profil");
          setToastMessage("welcome");
        } else {
          navigate("/");
        }
        console.log(res.message);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        setLoading(false);
      });
  };

  return (
    !token && (
      <div className="w-full h-full flex justify-center mt-32">
        <div>
          <Card className="mx-auto w-full border" color="white">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Log In
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Enter your Email and password to Log In.
              </Typography>
              <form
                className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96"
                onSubmit={SignIn}
              >
                <div className="mb-1 flex flex-col gap-6">
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
                    id="email"
                    onChange={handleChange}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    id="password"
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
                  className="mt-6 flex justify-center"
                  fullWidth
                  type="submit"
                  disabled={isDisabled || loading}
                >
                  {loading ? <Spinner variant="light" /> : <span>Log In</span>}
                </Button>
                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                >
                  Don't have an account?{" "}
                  <a href="/register" className="font-medium text-gray-900">
                    <strong>Register</strong>
                  </a>
                </Typography>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  );
};

export default Login;
