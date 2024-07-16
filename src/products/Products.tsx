import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Card,
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
import { IProductsArray } from "../types";
import { ProductsContext } from "../context/loginContext/ProductsInCartContext";

interface IElement {
  id: number;
}

function Products() {
  const { categoryName } = useParams();
  const [productsArray, setProductsArray] = useState<IProductsArray[]>([]);

  const category = categoryName?.replaceAll("_", " ");
  const [cart, setCart] = useState<IProductsArray[]>(
    JSON.parse(localStorage.getItem("cart") || "[]") || [],
  );

  const { setArrayWithActualProducts } = useContext(ProductsContext);

  // 1. Muszę pobierać z localStorage (tym: getItem) po kluczu "cart".
  // i wyświetlać w koszyku tylko elementy które zostały dodane.

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const categoryName = request.params.categoryname;
        const response = await axios.post(
          "http://localhost:3000/products/filter/page/1/limit/50",
          {
            category: [category],
          },
        );

        const allProductsArray = response.data.message?.data;
        setProductsArray(allProductsArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  function addProductsToCart(el: IProductsArray) {
    const arrWithProductsInCart = [...cart]; // to bedzie cart z usestate'a
    const foundProduct = arrWithProductsInCart.find(
      (element: IElement) => element.id === el.id,
    );

    if (foundProduct && foundProduct.quantity) {
      foundProduct.quantity += 1;

      const index = arrWithProductsInCart.findIndex(
        (product: IElement) => product.id === foundProduct!.id,
      );

      arrWithProductsInCart[index] = foundProduct;
    } else {
      el.quantity = 1;
      arrWithProductsInCart.push(el);
    }

    setCart(arrWithProductsInCart);
    setArrayWithActualProducts(arrWithProductsInCart);
    const saveArray = JSON.stringify(arrWithProductsInCart);
    localStorage.setItem("cart", saveArray);

    toast.success("Added to cart!");
  }

  useEffect(() => {
    setArrayWithActualProducts(cart);
    // console.log("arractprod", arrayWithActualProducts);
  }, []);

  return (
    <div className="containerForAllJeansTrousers">
      <div className="containerForTrousersCards">
        {productsArray.map((el: IProductsArray) => (
          <Card key={el.id} maxW="sm" className="categoryCard">
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
                  onClick={() => addProductsToCart(el)}
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
