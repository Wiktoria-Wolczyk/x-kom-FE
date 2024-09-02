import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();

  const getProduct = async () => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  };

  const { data } = useQuery({
    queryKey: [`product_${id}`],
    queryFn: () => getProduct(),
  });

  return (
    <div>
      {data?.message && <span>{data?.message.name}</span>}
      <span>{id}</span>
    </div>
  );
};

export default ProductDetails;
