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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{ required: true, minLength: 6 }}
          render={({ field }) => (
            <div className="loginInput flex flex-col">
              <Input placeholder="Email lub login" size="lg" {...field} />
              {errors.email?.type === "required" && (
                <span role="alert">Email lub login wymagany</span>
              )}
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 6 }}
          render={({ field }) => (
            <div className="loginInput flex flex-col">
              <Input placeholder="Hasło" size="lg" {...field} />
              {errors.password?.type === "required" && (
                <span role="alert">Hasło jest wymagane</span>
              )}
            </div>
          )}
        />
        <button
          type="button"
          className="underlineButton"
          onClick={() => console.log("nie pamiętam hasła")}
        >
          Nie pamiętasz hasła?
        </button>

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
