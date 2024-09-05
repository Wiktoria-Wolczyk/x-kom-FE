import "./Orders.css";
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../context/loginContext/LoginContext";
import axios from "axios";
import { IOrderValues } from "../types";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

// interface IFormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }
const namesOfStatus = [
  {
    key: "in realization",
    pl: "W realizacji",
  },
  {
    key: "xyz",
    pl: "www",
  },
];

function Orders() {
  const [ordersArr, setOrdersArr] = useState([]);

  const { actualUser } = useContext(LoginContext);

  useForm({
    defaultValues: {
      firstName: actualUser?.firstName,
      lastName: actualUser?.lastName,
      email: actualUser?.email,
      password: "",
      confirmPassword: "",
    },
  });

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/orders/by/user`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         },
  //       );

  //       const userOrders = response.data.message;
  //       // console.log("xyzzzz", userOrders); // array obiektow

  //       // console.log("takki", userOrders[0].products.length);

  //       setOrdersArr(userOrders);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchOrders();
  // }, []);

  const fetchOrders = async () => {
    return axios.get("http://localhost:3000/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const { isPending, error, data, isLoading, refetch } = useQuery({
    queryKey: ["ordersInUserDetails"],
    queryFn: fetchOrders,
    select(data) {
      return data?.data?.message?.orders;
    },
  });

  const deleteOrderFn = (orderID: number) => {
    return axios.delete(`http://localhost:3000/orders/${orderID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const mutationDeleteOrder = useMutation({
    mutationKey: ["deleteOrderByID"],
    mutationFn: deleteOrderFn,
  });

  const deleteOrderHandler = async (orderID: number) => {
    await mutationDeleteOrder.mutateAsync(orderID);
    await refetch();
  };

  // console.log("d a t a", data?.message);

  // const onSubmit: SubmitHandler<IFormValues> = async (data) => {
  //   try {
  //     const updateUser = async () =>
  //       axios.put(
  //         `http://localhost:3000/users/${actualUser?.id}`,
  //         {
  //           firstName: data.firstName,
  //           lastName: data.lastName,
  //           email: data.email,
  //           // password: data.password,
  //           // confirmPassword: data.confirmPassword,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         },
  //       );

  //     await updateUser();

  //     localStorage.getItem("token");
  //     // reset();
  //     toast("account updated!", {
  //       icon: "👏",
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("server error - try again later");
  //   }
  // };

  const navigate = useNavigate();

  const groupedItems = data?.reduce(
    (accumulator: { [key in string]: IOrderValues[] }, item: IOrderValues) => {
      const { createDate } = item;
      const modifiedDate = createDate.slice(0, 7);

      accumulator[modifiedDate] = accumulator[modifiedDate] || [];
      accumulator[modifiedDate].push(item);

      return accumulator;
    },
    {},
  );

  const firstOrderInData = data?.[0];
  const firstProductInOrder = firstOrderInData?.products?.[0];

  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <div className="containerForUserInformations">
      <div className="containerForLastOrders">
        <button
          className="returnButtonInOrders"
          onClick={() => navigate("/list")}
        >
          <i className="fa-solid fa-chevron-left "></i>
          <p>Return</p>
        </button>
        <p className="textLastOrders">Orders</p>
        <div className="buttonsFilterAndSort">
          <button className="buttonFilterOrders">
            <i className="fa-solid fa-filter"></i>Filtruj
          </button>
          <button className="buttonSortOrders">
            <i className="fa-solid fa-up-down"></i> Sortuj
          </button>
        </div>

        <div className="displayLastOrders">
          {Object.keys(groupedItems).map((key) => {
            return (
              <>
                <div className="orderDateInOrder">{key}</div>
                <div>
                  {groupedItems[key].map((order: IOrderValues) => {
                    const nameOfStatusInPL = namesOfStatus.find(
                      (el) => el.key === order.status,
                    );

                    return (
                      <div
                        key={order.id}
                        className="containerForOrderWhenUserIsLoggedIn"
                        // TODO
                        onClick={() => navigate(`/order/${order.id}`)}
                      >
                        <div className="containerForOrderInfo">
                          <div className="divForStatusAndCreateDate">
                            <div className="orderStatusInDiv">
                              {nameOfStatusInPL?.pl}
                            </div>
                            <span>{key}</span>
                          </div>
                          <div className="divForIDAndPrice">
                            <div className="productIDInOrder">
                              nr {order.id}
                            </div>
                            <div className="divForPriceInOrder">
                              {order.price} zł
                            </div>
                          </div>
                        </div>
                        <div className="containerForProductsInfo">
                          <div className="productsLengthInOrder">
                            {/* Produkty: {order.products.length} */}
                            <img src={firstProductInOrder.img} />
                          </div>
                          <button
                            className="orderActionButton"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Menu>
                              <MenuButton
                                as={Button}
                                style={{
                                  paddingLeft: 0,
                                  paddingRight: 0,
                                  backgroundColor: "white",
                                }}
                              >
                                <i className="fa-solid fa-ellipsis-vertical orderActionButtonIcon"></i>
                              </MenuButton>
                              <MenuList>
                                <MenuItem>Anuluj zamówienie</MenuItem>
                                <MenuItem
                                  onClick={async () =>
                                    await deleteOrderHandler(order.id)
                                  }
                                >
                                  Usuń
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })}
          {/* {ordersArr?.map((order: IOrderValues) => {
            let fullDate = order.createDate;
            let date = fullDate.slice(0, 10);

            return (
              <>
                <div className="orderDateInOrder">{date}</div>
                
              </>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}

export default Orders;
