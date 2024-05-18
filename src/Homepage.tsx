import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import { Image, Heading } from "@chakra-ui/react";
import Navbar from "./navbar/Navbar";
import { useLocation } from "react-router";
import axios from "axios";

interface IProductsArrValues {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  available: number;
  category: string;
  brand: string;
}

function Homepage() {
  const [productsArr, setProductsArr] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");

        const products = response.data.message?.products;
        console.log("xyz", products);
        setProductsArr(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  console.log("cccc", productsArr);

  return (
    <>
      <div className="divScrollingContainer">
        <div className="divForActualCoupon">
          <div className="coupon couponName">tutaj NAZWA KUPONU</div>
          <div className="coupon couponCode">
            tutaj KOD DO OTRZYMANIA KUPONU
          </div>
        </div>
        <span className="ourProductsText">Nasze Produkty</span>
        <div className="containerForCardsWithProducts">
          {productsArr?.map((el: IProductsArrValues) => (
            <Card className="categoryCard" maxW="sm">
              <CardBody>
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Green double couch with wooden legs"
                  borderRadius="md"
                />

                <Heading className="categoryTitle" size="md">
                  {el.category}
                </Heading>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepage;
