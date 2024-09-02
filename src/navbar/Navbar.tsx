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
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          boxShadow: "8px 7px 24px 0px rgba(66, 68, 90, 0.2)",
          backgroundColor: shouldBeStepsInNavbar
            ? "rgb(247, 247, 247)"
            : "white",
          marginBottom: 30,
          overflow: menuLoginIsOpen ? "hidden" : "scroll",
        }}
      >
        <div
          className="containerForNavbar"
          style={{
            height: shouldBeOnlyLogoInNavbar ? 130 : 110,
            paddingBottom: shouldBeOnlyLogoInNavbar ? 0 : 10,
            boxShadow: shouldBeOnlyLogoInNavbar
              ? "0px 0px 0px 0px transparent"
              : "8px 7px 24px 0px rgba(66, 68, 90, 0.2);",
            backgroundColor: shouldBeOnlyLogoInNavbar
              ? "rgb(247, 247, 247)"
              : "white",
          }}
        >
          {shouldBeOnlyLogoInNavbar ? (
            <div className="containerForLogoAndButtonReturnInCartLogin">
              <div
                className="containerForNavbarLogo"
                onClick={() => navigate("/")}
              >
                <Icons name={"Xkom"} style={{}} />
              </div>

              {shouldBeStepsInNavbar ? (
                <div className="containerForSteps">
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
                  <i className="fa-solid fa-headset headset fa-xl"></i>
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
                      console.log("is closed", menuLoginIsOpen);
                    }}
                  />
                  <MenuList className="menuList">
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        color: "gray",
                        fontWeight: 500,
                        marginTop: 10,
                      }}
                    >
                      Kategorie
                    </div>
                    <div className="divForMenuCategories">
                      {categories.map((category, index) => {
                        return (
                          <>
                            {category.name === "Xkom" ? (
                              <></>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginTop: 10,
                                  width: "100%",
                                }}
                                key={index}
                              >
                                <Icons
                                  name={category.img}
                                  style={{ height: 40, marginRight: 20 }}
                                />

                                <div className="category">{category.name}</div>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    paddingRight: 20,
                                  }}
                                >
                                  <i className="fa-solid fa-chevron-right fa-sm"></i>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                    {/* <div className="containerForLoginAndRegister">
                      {userIsLoggedIn ? (
                        <button
                          onClick={() => {
                            navigate("/list");
                            setMenuLoginIsOpen(false);
                          }}
                        ></button>
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
                    </div> */}

                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        height: 50,
                        marginTop: 20,
                        paddingTop: 20,
                        marginBottom: 20,
                        paddingRight: 20,
                        alignItems: "center",
                        borderTop: "1px solid lightgray",
                      }}
                    >
                      <i
                        className="fa-solid fa-headset fa-sm"
                        style={{ marginRight: 20 }}
                      ></i>
                      <div className="category">
                        <span style={{ marginLeft: 5 }}>Pomoc i kontakt</span>
                      </div>
                      <div
                        style={{
                          width: 80,
                          height: "100%",
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="fa-solid fa-chevron-right fa-sm"
                          aria-hidden="false"
                          style={{ display: "flex" }}
                        ></i>
                      </div>
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
      </div>
    </ChakraProvider>
  );
}

export default Navbar;
