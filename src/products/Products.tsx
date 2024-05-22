import React, { useEffect, useState } from "react";
import "./Products.css";
import { Routes, Route, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

interface IProductsArray {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  available: number;
  brand: string;
}

function Products() {
  const [productsArray, setProductsArray] = useState([]);

  let { categoryName } = useParams();

  const category = categoryName?.replaceAll("_", " ");

  const [cart, setCart] = useState<any>(
    JSON.parse(localStorage.getItem("cart") || "[]") || []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const categoryName = request.params.categoryname;
        const response = await axios.post(
          "http://localhost:3000/products/filter/page/1/limit/50",
          {
            category: [category],
          }
        );

        let allProductsArray = response.data.message?.data;
        setProductsArray(allProductsArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  function productsToCart(el: any) {
    let arrWithProductsInCart = cart;
    arrWithProductsInCart.push(el);
    setCart(arrWithProductsInCart);

    let saveArray = JSON.stringify(arrWithProductsInCart);
    localStorage.setItem("cart", saveArray);

    toast.success("Added to cart!");
  }

  return (
    <div className="containerForAllJeansTrousers">
      <div className="containerForTrousersCards">
        {productsArray.map((el: IProductsArray) => (
          <Card maxW="sm" className="categoryCard">
            <CardBody>
              <Image
                src="https://c.stocksy.com/a/jpm700/z9/1856015.jpg"
                alt="jeans picture"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{el.name}</Heading>
                <Text color="blue.600" fontSize="2xl">
                  {el.discountedPrice}$
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button
                  onClick={() => productsToCart(el)}
                  variant="solid"
                  colorScheme="blue"
                >
                  Add to cart
                </Button>
                <div className="availableJeans">
                  Available: <b className="available">{el.available}</b>
                </div>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
