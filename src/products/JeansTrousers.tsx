import React, { useEffect, useState } from "react";
import "./JeansTrousers.css";
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

interface IJeansArray {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  available: number;
  brand: string;
}

function JeansTrousers() {
  const [jeansArray, setJeansArray] = useState([]);

  useEffect(() => {
    const fetchJeans = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/products/filter/page/1/limit/50",
          {
            category: ["jeans trousers"],
          }
        );

        let allJeansArray = response.data.message?.data;
        setJeansArray(allJeansArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJeans();
  }, []);

  return (
    <div className="containerForAllJeansTrousers">
      <div className="containerForTrousersCards">
        {jeansArray.map((el: IJeansArray) => (
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
                  discounted price: {el.discountedPrice}$
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default JeansTrousers;
