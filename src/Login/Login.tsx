import React, { useContext } from "react";
import { Button, Input, useQuery } from "@chakra-ui/react";
import "./Login.css";
import axios from "axios";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/loginContext/LoginContext";
import { Mutation, useMutation } from "@tanstack/react-query";

interface IFormInput {
  email: string;
  password: string;
}

function Login({ destination }: { destination?: string }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields, errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutationLogin = useMutation({
    mutationFn: async (data: IFormInput) => {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: data.email,
        password: data.password,
      });
      return response?.data?.message;
    },
    onSuccess: (data) => {
      console.log("success", data);

      const token = data.token;
      const user = data.user;
      const userName = data.user.firstName;

      const userString = JSON.stringify(user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", userString);

      toast(`Hello ${userName} !`, {
        icon: "👏",
      });

      setUserIsLoggedIn(true);
      setActualUser(user);

      setTimeout(() => {
        navigate(`${destination || "/"}`);
      }, 1000);

      reset();
    },
    onError: () => {
      console.log("error");
    },
  });

  const { userIsLoggedIn, setUserIsLoggedIn, setActualUser } =
    useContext(LoginContext);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    mutationLogin.mutate(data);
  };

  return (
    <div className="divForLoginInputsInLogin">
      <div className="divForLogInText">Zaloguj się</div>
      <form onSubmit={handleSubmit(onSubmit)} className="formContainer">
        <div
          style={{
            height: 150,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field }) => (
              <div className="loginInput ">
                <Input
                  placeholder="Email lub login"
                  size="lg"
                  style={{
                    border: errors.email
                      ? "1px solid red"
                      : "1px solid lightgray",
                  }}
                  {...field}
                />
                {errors.email && (
                  <span role="alert" style={{ color: "red" }}>
                    Email lub login wymagany, min. 6 znaków
                  </span>
                )}
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field }) => (
              <div className="loginInput ">
                <Input
                  placeholder="Hasło"
                  size="lg"
                  style={{
                    border: errors.password
                      ? "1px solid red"
                      : "1px solid lightgray",
                  }}
                  {...field}
                />
                {errors.password && (
                  <span role="alert" style={{ color: "red" }}>
                    Hasło jest wymagane, min. 6 znaków
                  </span>
                )}
              </div>
            )}
          />
        </div>
        <div className="conatinerForUnderlineButton">
          <button
            type="button"
            className="underlineButton"
            onClick={() => console.log("nie pamiętam hasła")}
          >
            * Nie pamiętasz hasła?
          </button>
        </div>

        <div className="divForLoginButtonsInLogin">
          {mutationLogin.isError ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                height: 80,
              }}
            >
              <span style={{ display: "flex", color: "red", marginBottom: 10 }}>
                Dane logowania niepoprawne
              </span>
              <Input
                placeholder="Z"
                type="submit"
                className="buttonLoginInLogin"
                disabled={!isValid}
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: 80,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{ visibility: "hidden", color: "red", marginBottom: 10 }}
              >
                Dane logowania niepoprawne
              </span>
              <Button
                type="submit"
                className="buttonLoginInLogin"
                disabled={!isValid}
              >
                Zaloguj
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
