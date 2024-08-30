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
import {
  Box,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from "@chakra-ui/react";
import CategoryTile from "../CategoryTile";
import { categories } from "../constants";
import Icons from "../Icons";

interface IProps {
  openAuthModal: boolean | null;
}

const steps = [
  { title: "Koszyk", id: "cart" },
  { title: "Logowanie lub rejestracja", id: "auth" },
  { title: "Dostawa i płatność", id: "delivery" },
  { title: "Podsumowanie", id: "summary" },
];

function Navbar({ openAuthModal }: IProps) {
  const [menuLoginIsOpen, setMenuLoginIsOpen] = useState(
    openAuthModal || false,
  );
  const { userIsLoggedIn, actualUser } = useContext(LoginContext);

  const { setButtonLoginIsClicked } = useContext(CartContext);

  const actualPath = window.location.pathname;

  // const shouldBeOnlyLogoInNavbar = actualPath.startsWith("/cart/login");
  const shouldBeOnlyLogoInNavbar = actualPath.startsWith("/cart/delivery");
  // const shouldBeStepsInNavbar = actualPath.endsWith("/order-and-payment");
  const shouldBeStepsInNavbar =
    actualPath.endsWith("/cart/delivery") ||
    actualPath.endsWith("/cart/delivery/summary");

  const { activeStep, setActiveStep } = useSteps({
    index: 3,
    count: steps.length,
  });

  useEffect(() => {
    if (actualPath.endsWith("/cart/delivery/summary")) {
      setActiveStep(4);
    } else {
      setActiveStep(3);
    }
  });

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
      <div
        className="containerForNavbar"
        style={{
          height: shouldBeOnlyLogoInNavbar ? 130 : 110,
          paddingBottom: shouldBeOnlyLogoInNavbar ? 0 : 10,
        }}
      >
        {shouldBeOnlyLogoInNavbar ? (
          <div
            className="containerForLogoAndButtonReturnInCartLogin"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(247, 247, 247)",
              paddingLeft: 10,
              paddingBottom: 20,
            }}
          >
            <div style={{ marginTop: 10 }} onClick={() => navigate("/")}>
              <Icons name={"Xkom"} style={{}} />
            </div>

            {shouldBeStepsInNavbar ? (
              <div
                style={{
                  width: "100%",
                  height: 50,
                  marginTop: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: 10,
                }}
              >
                {actualPath.endsWith("/cart/delivery/summary") ? (
                  <Stepper
                    index={activeStep}
                    size="sm"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginRight: 30,
                    }}
                  >
                    {steps.map((step, index) => (
                      <>
                        <Step
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            position: "relative",
                          }}
                        >
                          <StepIndicator
                            onClick={() => {
                              if (step.id === "cart") {
                                navigate("/cart");
                              } else if (step.id === "auth") {
                                navigate("/cart/login");
                              } else if (step.id === "delivery") {
                                navigate("/cart/delivery");
                              } else {
                                navigate("/cart/delivery/summary");
                              }
                            }}
                          >
                            <StepStatus
                              complete={<StepIcon />}
                              incomplete={<StepNumber />}
                              active={<StepNumber />}
                            />
                          </StepIndicator>
                          <div
                            style={{
                              fontSize: 10,
                              whiteSpace: "nowrap",
                              position: "absolute",
                              top: 30,
                            }}
                          >
                            {step.title}
                          </div>
                        </Step>
                        <StepSeparator
                          style={{
                            color: "#3182ce",
                            border: "1px solid #3182ce",
                          }}
                        />
                      </>
                    ))}
                  </Stepper>
                ) : (
                  <Stepper
                    index={activeStep}
                    size="sm"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      marginRight: 30,
                    }}
                  >
                    {steps.map((step, index) => (
                      <>
                        <Step
                          key={index}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            position: "relative",
                          }}
                        >
                          <StepIndicator
                            onClick={() => {
                              if (step.id === "cart") {
                                navigate("/cart");
                              } else if (step.id === "auth") {
                                navigate("/cart/login");
                              } else {
                                return;
                              }
                            }}
                          >
                            <StepStatus
                              complete={<StepIcon />}
                              incomplete={<StepNumber />}
                              active={<StepNumber />}
                            />
                          </StepIndicator>
                          <div
                            style={{
                              fontSize: 10,
                              whiteSpace: "nowrap",
                              position: "absolute",
                              top: 30,
                            }}
                          >
                            {step.title}
                          </div>
                        </Step>
                        <StepSeparator
                          style={{
                            color: "#3182ce",
                            border: "1px solid #3182ce",
                          }}
                        />
                      </>
                    ))}
                  </Stepper>
                )}
              </div>
            ) : (
              <div
                className="containerForButtonReturnToCart"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 85,
                  height: 35,
                  backgroundColor: "rgb(235, 235, 235)",
                  border: "0.5px solid lightgray",
                  borderRadius: 10,
                  marginBottom: 20,
                  marginLeft: 5,
                }}
              >
                <button
                  onClick={() => navigate("/cart")}
                  style={{ width: "100%", height: "100%" }}
                >
                  <i className="fa-solid fa-chevron-left "></i> Wróć
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="title-User-Cart-Navbar">
              <div style={{ marginTop: 10 }} onClick={() => navigate("/")}>
                <Icons name={"Xkom"} style={{}} />
              </div>
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
                <div
                  className="hiUser"
                  style={{ color: "black", width: "100%" }}
                >
                  <p>Cześć, {actualUser?.firstName}</p>
                  <p>zaloguj się</p>{" "}
                </div>
                <i
                  onClick={() => {
                    // mutation.mutate()

                    if (localStorage.getItem("user")) {
                      navigate("/user_details");
                    } else {
                      navigate("/cart/login");
                    }
                  }}
                  className="fa-regular fa-user fa-xl"
                ></i>
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
          </>
        )}
      </div>
    </ChakraProvider>
  );
}

export default Navbar;
