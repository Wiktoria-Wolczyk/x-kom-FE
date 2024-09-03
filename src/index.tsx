import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Register from "../src/register/Register";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./Homepage";
import Products from "./products/Products";
import Cart from "./Cart/Cart";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import { createContext } from "react";
import { LoginContextController } from "./context/loginContext/LoginContext";
import "./types";
import OrderDetails from "./OrderDetails/OrderDetails";
import List from "./List/List";
import Orders from "./Profile/Orders";
import UserDetails from "./Profile/UserDetails";
import ChangeUserName from "./Profile/Edition/ChangeUserName";
import { CartContextController } from "./context/loginContext/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartLogin from "./Cart/CartLogin/CartLogin";
import OrderAndPayment from "./products/Payment/OrderAndPayment";
import LoginPage from "./LoginPage/LoginPage";
import SummaryOrder from "./products/Summary_order/SummaryOrder";
import ProductDetails from "./products/ProductDetails/ProductDetails";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
const queryClient = new QueryClient();

export const TestContext = createContext({});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartContextController>
        <LoginContextController>
          <ChakraProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Homepage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/cart/login" element={<CartLogin />} />
                  <Route path="/cart/delivery" element={<OrderAndPayment />} />
                  <Route
                    path="/cart/delivery/summary"
                    element={<SummaryOrder />}
                  />
                  <Route path="/list" element={<List />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/user_details" element={<UserDetails />} />

                  <Route path="/order/:id" element={<OrderDetails />} />
                  <Route path="category">
                    <Route path=":categoryName" element={<Products />} />
                  </Route>
                  <Route path="/products/:id" element={<ProductDetails />} />
                </Route>
                <Route
                  path="/user_details/edit_name"
                  element={<ChangeUserName />}
                />
              </Routes>
            </BrowserRouter>
          </ChakraProvider>
        </LoginContextController>
      </CartContextController>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
