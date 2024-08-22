import React, { useContext } from "react";
import { Input } from "@chakra-ui/react";
import "./Login.css";
import axios from "axios";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/loginContext/LoginContext";

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

  const { userIsLoggedIn, setUserIsLoggedIn, setActualUser } =
    useContext(LoginContext);
  console.log(userIsLoggedIn);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("data is dirty", !data);
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: data.email,
        password: data.password,
      });

      const token = response.data.message?.token;
      const user = response.data.message?.user;
      const userName = response.data.message?.user.firstName;

      const userString = JSON.stringify(user);

      console.log(userString);

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
    } catch (err) {
      console.error(err);
    }
  };

  console.log("isDirty", !isDirty);

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
          <Input
            type="submit"
            className="buttonLoginInLogin"
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
