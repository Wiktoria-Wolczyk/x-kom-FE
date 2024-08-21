import React from "react";
import "./App.css";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { useLocation } from "react-router";
import { Outlet } from "react-router-dom";
import Chat from "./chat/chatComponent";

function App() {
  const { state } = useLocation();

  const cartPath = "/cart";
  const actualPath = window.location.pathname;

  // bg-gray
  return (
    <>
      {/* <div className="App"> */}
      <div className={cartPath === actualPath ? "App bg-gray" : "App"}>
        <>
          <Navbar openAuthModal={state?.openAuthModal} />
          <div className="appWithMargin">
            <Chat />
            <Outlet />
            {cartPath === actualPath ? (
              <div style={{ display: "none" }}>
                <Footer />
              </div>
            ) : (
              <Footer />
            )}
          </div>
        </>
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
