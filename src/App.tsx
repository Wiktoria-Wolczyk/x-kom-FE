import React, { useEffect } from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { Image, Heading } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";

function App() {
  const { state } = useLocation();

  return (
    <div className="App">
      <>
        <Navbar openAuthModal={state?.openAuthModal} />
        <Outlet />
      </>
    </div>
  );
}

export default App;
