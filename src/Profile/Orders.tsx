import "./Orders.css";
import { useForm } from "react-hook-form";
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../context/loginContext/LoginContext";
import axios from "axios";
import { IOrderValues } from "../types";
import { useNavigate } from "react-router-dom";

// interface IFormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/by/user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const userOrders = response.data.message;
        // console.log("xyzzzz", userOrders); // array obiektow

        // console.log("takki", userOrders[0].products.length);

        setOrdersArr(userOrders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

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

  const groupedItems = ordersArr?.reduce(
    (accumulator: { [key in string]: IOrderValues[] }, item: IOrderValues) => {
      const { createDate } = item;
      const modifiedDate = createDate.slice(0, 7);

      accumulator[modifiedDate] = accumulator[modifiedDate] || [];
      accumulator[modifiedDate].push(item);

      return accumulator;
    },
    {},
  );

  return (
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
            <i className="fa-solid fa-filter"></i>Filter
          </button>
          <button className="buttonSortOrders">
            <i className="fa-solid fa-up-down"></i> Sort
          </button>
        </div>

        <div className="displayLastOrders">
          {Object.keys(groupedItems).map((key) => {
            return (
              <>
                <div className="orderDateInOrder">{key}</div>
                <div>
                  {groupedItems[key].map((order) => (
                    <div
                      key={order.id}
                      className="containerForOrderWhenUserIsLoggedIn"
                      onClick={() => navigate(`/order/${order.id}`)}
                    >
                      <div className="containerForOrderInfo">
                        <div className="divForStatusAndCreateDate">
                          <div className="orderStatusInDiv">{order.status}</div>
                          <span>{key}</span>
                        </div>
                        <div className="divForIDAndPrice">
                          <div className="productIDInOrder">
                            Product nr {order.id}
                          </div>
                          <div className="divForPriceInOrder">
                            Price: {order.price}$
                          </div>
                        </div>
                      </div>
                      <div className="containerForProductsInfo">
                        <div className="productsLengthInOrder">
                          Products: {order.products.length}
                        </div>
                        <button className="moreDetails">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                      </div>
                    </div>
                  ))}
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
