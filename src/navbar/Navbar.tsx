import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@chakra-ui/react";
import { response } from "express";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  openAuthModal: boolean | null;
}

interface IFormValues {
  email: string;
  password: string;
}

function Navbar({ openAuthModal }: IProps) {
  const [menuLoginIsOpen, setMenuLoginIsOpen] = useState(
    openAuthModal || false
  );
  const [buttonLoginIsClicked, setButtonLoginIsClicked] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    try {
      const login = async () => {
        const checkUser = await axios.post("http://localhost:3000/auth/login", {
          email: data.email,
          password: data.password,
        });

        let response = checkUser.data.message;
        console.log(response);
        localStorage.setItem("token", response);
        return checkUser;
      };

      await login();
      reset();
      setButtonLoginIsClicked(true);
      toast("successfully logged in!", {
        icon: "👏",
      });

      setTimeout(() => {
        setMenuLoginIsOpen(false);
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error("server error - try again later");
    }
  };

  useEffect(() => {
    if (openAuthModal) {
      setMenuLoginIsOpen(true);
    }
  }, [openAuthModal]);

  const navigate = useNavigate();

  const handleClick = () => navigate("/register");

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setMenuLoginIsOpen((prev) => !prev);
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [menuLoginIsOpen]);

  const handleChangeAuthMenuOpen = () => {
    setMenuLoginIsOpen((prev) => !prev);
  };

  return (
    <ChakraProvider>
      <div className="Navbar">
        <div className="divForHamburgerMenu">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList className="menuList">
              <div className="divForMenuCategories">
                <MenuItem className="category Products">Produkty</MenuItem>
                <MenuItem className="category ForHer">Dla niej</MenuItem>
                <MenuItem className="category ForHim">Dla niego</MenuItem>
                <MenuItem className="category AboutUs">O nas</MenuItem>
                <MenuItem className="category Contact">Kontakt</MenuItem>
                <MenuItem className="category Statue">Regulamin</MenuItem>
              </div>
            </MenuList>
          </Menu>
        </div>
        <span className="shopTitle">Clothes Shop</span>
        <div className="divForCart">
          <i
            className="fa-solid fa-cart-shopping"
            style={{ color: "#383838" }}
          ></i>
        </div>
        <div className="divForUser">
          <Menu isOpen={menuLoginIsOpen}>
            <>
              <MenuButton
                onClick={handleChangeAuthMenuOpen}
                className="loginButtonClass"
                as={IconButton}
                variant="outline"
                aria-label="Options"
                icon={
                  <Avatar
                    className="avatar"
                    size="sm"
                    name="Penguin"
                    // src="https://i.pinimg.com/736x/ac/5a/ba/ac5abaa60fc9b50ca8764221f3787dfc.jpg"
                    src="p"
                  />
                }
              />

              <MenuList className="loginList">
                <div className="loginContainer">
                  <span className="loginText">Log In</span>
                  <div className="divForLoginBy">
                    <input
                      className="logInByGoogle"
                      type="button"
                      value="Google"
                    />
                    <div className="lineBetweenLogin"></div>
                  </div>
                  <div className="divForLoginInputs">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            className="email"
                            placeholder="email"
                            size="lg"
                            bgColor={"white"}
                            {...field}
                          />
                        )}
                      />
                      {/* <input className="emailInput" placeholder="email" /> */}
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <Input
                            className="password"
                            placeholder="password"
                            size="lg"
                            bgColor={"white"}
                            {...field}
                          />
                        )}
                      />

                      {/* <input className="passwordInput" placeholder="password" /> */}

                      <div className="divForForgotPasswordButton">
                        <button className="forgotPasswordButton">
                          Forgot Password
                        </button>
                      </div>

                      <input
                        type="submit"
                        className="buttonLogIn"
                        style={{
                          color: buttonLoginIsClicked ? "green" : "red",
                        }}
                      />
                    </form>
                  </div>
                  <div className="divForRegister">
                    <input
                      className="buttonRegister"
                      type="button"
                      value="Register"
                      onClick={() => {
                        navigate("/register");
                        setMenuLoginIsOpen(false);
                      }}
                    />
                  </div>
                </div>
              </MenuList>
            </>
          </Menu>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default Navbar;
