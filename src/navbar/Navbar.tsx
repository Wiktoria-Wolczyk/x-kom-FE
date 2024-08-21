import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { LoginContext } from "../context/loginContext/LoginContext";
import { CartContext } from "../context/loginContext/CartContext";
import imageToAdd from "./xKom.png";

interface IProps {
  openAuthModal: boolean | null;
}

function Navbar({ openAuthModal }: IProps) {
  const [menuLoginIsOpen, setMenuLoginIsOpen] = useState(
    openAuthModal || false,
  );
  const { userIsLoggedIn, actualUser } = useContext(LoginContext);

  const { setButtonLoginIsClicked } = useContext(CartContext);

  useEffect(() => {
    if (openAuthModal) {
      setMenuLoginIsOpen(true);
    }
  }, [openAuthModal]);

  const navigate = useNavigate();

  const handleChangeAuthMenuOpen = () => {
    setMenuLoginIsOpen((prev) => !prev);
  };

  const { products } = useContext(CartContext);

  return (
    <ChakraProvider>
      <div className="containerForNavbar">
        <div className="title-User-Cart-Navbar">
          <img
            className="LogoIMG"
            src={imageToAdd}
            alt="X-kom Logo"
            width={120}
            onClick={() => navigate("/")}
          />
          <div className="chwilowy">
            <input
              className="searchInputForDesktop"
              type="search"
              placeholder="Czego szukasz?"
            ></input>
            <div className="containerForBorderDivAndActions">
              <div className="borderDiv"></div>
              <div className="containerForDropdownInSearch">
                <Menu id="test">
                  <MenuButton
                    className="searchInCategory"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Actions
                  </MenuButton>
                  <MenuList className="menuListInDesktop">
                    <MenuItem>Download</MenuItem>
                    <MenuItem>Create a Copy</MenuItem>
                    <MenuItem>Mark as Draft</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Attend a Workshop</MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
            <div className="DivForButtonSearch">
              <i className="fa-solid fa-magnifying-glass fa-sm"></i>
            </div>
          </div>

          <div className="divForUserAndCart">
            <div className="hiUser">
              <p>Cześć,</p>
              <p>zaloguj się</p>{" "}
            </div>
            <i className="fa-regular fa-user fa-xl"></i>
            <i className="fa-solid fa-headset fa-xl"></i>
            <div className="divForCart" onClick={() => navigate("/cart")}>
              <div className="countProductsInCart">{products.length}</div>
              <i
                className="fa-solid fa-cart-shopping fa-xl"
                style={{ color: "#383838" }}
              ></i>
            </div>
          </div>
        </div>
        <div className="Navbar">
          <Menu isOpen={menuLoginIsOpen}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              onClick={() => {
                setMenuLoginIsOpen((prev) => !prev);
                setButtonLoginIsClicked(!menuLoginIsOpen);
              }}
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
              <div className="containerForLoginAndRegister">
                {userIsLoggedIn ? (
                  <button
                    onClick={() => {
                      navigate("/list");
                      setMenuLoginIsOpen(false);
                    }}
                  >
                    {actualUser?.firstName} Zalogowana
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMenuLoginIsOpen(false);
                        navigate("/login");
                      }}
                      className="buttonLoginInNavbar"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        handleChangeAuthMenuOpen();
                        navigate("/register");
                      }}
                      className="buttonRegisterInNavbar"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </MenuList>
          </Menu>
          <div className="containerForMagnifierAndSearchInput">
            <i className="fa-solid fa-magnifying-glass glass2 fa-sm"></i>
            <input
              className="searchInput"
              type="search"
              placeholder="Czego szukasz?"
            ></input>
          </div>
        </div>
        <div className="navbarContainerForCategoriesOfProductsDesktop">
          <button>Laptopy i komputery</button>
          <button>Smartfony i smatwatche</button>
          <button>Pozdespoły komputerowe</button>
          <button>Gaming i streaming</button>
          <button>Urządzenia peryferyjne</button>
          <button>TV i audio</button>
          <button>Smarthome i lifestyle</button>
          <button>Akcesoria</button>
          <button>Promocje i nowości</button>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default Navbar;
