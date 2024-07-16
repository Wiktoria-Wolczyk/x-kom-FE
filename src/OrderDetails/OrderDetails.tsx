import "./OrderDetails.css";
import React, { useState, useEffect } from "react";
import { IOrderValues, IProduct } from "../types";
import axios from "axios";
import { useParams } from "react-router";
import toast from "react-hot-toast";

function OrderDetails() {
  const { id } = useParams();

  const [orderObject, setOrderObject] = useState<IOrderValues | null>(null);

  useEffect(() => {
    const orderRequest = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const order = response.data?.message;
        console.log("res", order);

        setOrderObject(order);
      } catch (error) {
        console.error(error);
      }
    };
    orderRequest();
  }, [id]);

  const orderID = orderObject?.id;

  const changeOrder = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/orders/${orderID}`,
        {
          status: "canceled", // body sluzy do zmieniania wartosci w zamowieniu
          userID: orderObject?.user.id,
          productsIDs: orderObject?.products.map((product) => product.id),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const updatedOrder = response.data?.message;

      if (updatedOrder && updatedOrder?.status === "canceled") {
        setOrderObject(updatedOrder);

        toast("Order Canceled", {
          icon: "👏",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // console.log("wiiii", orderObject);

  const productsArr = orderObject?.products;
  // console.log("ksksksk", productsArr);

  const createDate = orderObject?.createDate;
  const date = createDate?.slice(0, 10);
  const time = createDate?.slice(11, 19);

  return (
    <div className="ContainerForOrderDetails">
      <div className="divForOrderInformations">
        <div className="orderID">Order number: #{orderObject?.id}</div>
        <div className="createDate">Create Date: {date}</div>
        <div className="createTime">Create Time: {time}</div>
        <div className="orderStatus">Status: {orderObject?.status}</div>
        <span className="productsTextInOrder">Products: </span>
        <div className="scrollableTable">
          <table className="tableWithOrder">
            <tr className="trHeaders">
              <th colSpan={2}>Name:</th>
              <th>Brand:</th>
              <th>Price:</th>
            </tr>
            {productsArr?.map((product: IProduct) => {
              return (
                <tr key={product.id}>
                  <td colSpan={2}>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>
                    <div className="containerForPriceAndDiscountedPrice">
                      <div className="productPrice">{product.price}$</div>
                      <div>{product.discountedPrice}$</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="orderPrice">
          Price:
          <div>{orderObject?.price}$</div>
        </div>
        {orderObject?.status === "canceled" && (
          <div className="containerForCancelOrderButton">
            <button onClick={() => changeOrder()} className="cancelOrder">
              Cancel Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
