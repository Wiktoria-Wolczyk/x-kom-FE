import React, { useState } from "react";
import "./Register.css";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: string;
}

function Register() {
  const [show, setShow] = useState(false);
  // const [isClicked, setIsClicked] = useState(false);
  // const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  // const registerClick = () => {
  //   setIsClicked(!isClicked);
  // };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: "",
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    try {
      const createNewUserQuery = async () =>
        axios.post("http://localhost:3000/auth/register", {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });

      await createNewUserQuery();
      reset();
      toast("account created!", {
        icon: "👏",
      });
      alert(JSON.stringify(data));
      setTimeout(() => {
        navigate("/", { state: { openAuthModal: true } });
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error("server error - try again later");
    }
  };

  return (
    <div className="containerForRegister">
      <div className="registerText">Register</div>
      <div className="divForRegisterInputs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="userRegisterInputs">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  className="firstName"
                  placeholder="FirstName"
                  size="lg"
                  bgColor={"white"}
                  {...field}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  className="lastName"
                  placeholder="LastName"
                  size="lg"
                  bgColor={"white"}
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  className="email"
                  placeholder="Email"
                  size="lg"
                  bgColor={"white"}
                  {...field}
                />
              )}
            />
          </div>

          <div className="InputGroupForPassword">
            <div className="containerForPasswordInputs">
              <InputGroup size="ml">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      bgColor={"white"}
                      className="inputRegisterPassword"
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                  )}
                />
                <InputRightElement></InputRightElement>
              </InputGroup>
              <InputGroup size="ml">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input
                      size="lg"
                      bgColor={"white"}
                      className="inputConfirmPassword"
                      type={show ? "text" : "password"}
                      placeholder="Confirm password"
                      {...field}
                    />
                  )}
                />
              </InputGroup>
            </div>
            <div className="ContainerForButtonHideShow">
              <Button
                colorScheme="teal"
                className="showOrHidePasswordInRegister"
                size="sm"
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </div>
          </div>

          <div className="divForAcceptTermsConatiner">
            <div className="containerForAcceptTerms">
              <Controller
                name="termsAccepted"
                control={control}
                render={({ field }) => (
                  <input className="checkboxTerms" type="checkbox" {...field} />
                )}
              />
              <span>I Accept</span>
              <a className="termsHref" href="">
                Terms
              </a>
            </div>
          </div>

          <input
            className="buttonAcceptRegister"
            type="submit"
            value="Register"
          />
        </form>
      </div>
    </div>
  );
}

export default Register;
