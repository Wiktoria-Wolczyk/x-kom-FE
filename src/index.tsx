import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Register from "../src/register/Register";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./Homepage";
import JeansTrousers from "./products/JeansTrousers";
import TShirts from "./products/T-Shirts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Homepage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jeanstrousers" element={<JeansTrousers />} />
            <Route path="/t-shirts" element={<TShirts />} />
            {/* <Route path="/skirts" element={<Skirts />} /> */}
            {/* <Route path="/trousers" element={<Trousers />} /> */}
            {/* <Route path="/long-sleeves" element={<Long-Sleeves />} /> */}
            {/* <Route path="/gloves" element={<Gloves />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
