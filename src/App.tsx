import React from "react";
import "./App.css";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";
import Chat from "./chat/chatComponent";

function App() {
  const { state } = useLocation();

  return (
    <div className="App">
      <>
        <Navbar openAuthModal={state?.openAuthModal} />
        <Chat />
        <Outlet />
        <Footer />
      </>
    </div>
  );
}

export default App;
