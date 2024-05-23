import React, { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import "./Login.css";
import axios from "axios";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface IFormInput {
  email: string;
  password: string;
}

function Login() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log("data", data);

      let response = await axios.post("http://localhost:3000/auth/login", {
        email: data.email,
        password: data.password,
      });

      let token = response.data.message?.token;
      let user = response.data.message?.user;
      let userName = response.data.message?.user.firstName;

      let userString = JSON.stringify(user);

      console.log(userString);

      localStorage.setItem("token", token);
      localStorage.setItem("user", userString);

      toast(`Hello ${userName} !`, {
        icon: "👏",
      });

      // setUserIsLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);

      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="containerForLogin">
      <div className="divForLoginInputsInLogin">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                className="loginEmail"
                placeholder="Email"
                size="lg"
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                className="loginEmail"
                placeholder="Password"
                size="lg"
                {...field}
              />
            )}
          />

          <div className="divForLoginButtonsInLogin">
            <Input type="submit" className="buttonLoginInLogin" />
            <button className="buttonForgotPasswordInLogin">
              Forgot password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
