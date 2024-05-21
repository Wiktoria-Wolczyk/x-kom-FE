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
        <span onClick={() => navigate("/")} className="shopTitle">
          Zara
        </span>
        <div className="divForCart">
          <i
            onClick={() => navigate("/cart")}
            className="fa-solid fa-cart-shopping"
            style={{ color: "#383838" }}
          ></i>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default Navbar;
