import React from "react";
import "./CartLogin.css";
import Login from "../../Login/Login";

// Tailwind styles in this component
const CartLogin = () => {
  return (
    <div className="container">
      {/* destination="/cart/delivery" */}
      <Login />
      <div className="flex-col justify-start w-11/12 ml-5">
        <h1 className="text-2xl font-bold mt-8 mb-3">
          Załóż konto w 20 sekund
        </h1>
        <p className="mb-3">Śledź status zamówienia</p>
        <p className="mb-3">Korzystaj z rabatów i promocji</p>
        <button
          className=" w-11/12 bg-white hover:bg-lime-200 text-black font-bold py-2 px-4 rounded border-solid border border-black"
          onClick={() => console.log("nawiguj do rejestracji")}
        >
          Załóż konto <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>
    </div>
  );
};

export default CartLogin;
