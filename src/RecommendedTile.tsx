import React, { useContext } from "react";
import "./RecommendedTile.css";
import { IProduct } from "./types";
import { ICartProduct } from "./types";
import toast from "react-hot-toast";
import { CartContext } from "./context/loginContext/CartContext";

const RecommendedProduct = ({ product }: { product: IProduct }) => {
  const { setArrayWithActualProducts, products } = useContext(CartContext);

  const addProductsToCart = (el: IProduct) => {
    const product: ICartProduct = { ...el, quantity: 1 };
    const newProducts = [...products];

    const foundProduct = newProducts.find((element) => element.id === el.id);

    if (foundProduct && foundProduct.quantity) {
      foundProduct.quantity += 1;

      const index = newProducts.findIndex(
        (product) => product.id === foundProduct!.id,
      );

      if (index !== -1) {
        newProducts[index] = foundProduct;
      }
    } else {
      newProducts.push(product);
    }

    setArrayWithActualProducts(newProducts);
    toast.success("Added to cart!");
  };

  return (
    <div className="containerForProduct">
      {product.tag && (
        <span className="infoAboutRecommendedProductInRecommended">
          {product.tag}
        </span>
      )}

      <img
        className="imgRecommended"
        src={product.img}
        alt={product.name}
        width={150}
        height={150}
      />
      <span>{product.name}</span>

      <div className="containerForPriceInRecommended">
        {product.discountedPrice ? (
          <div className="containerForTextLowestPrice">
            Najniższa cena <span className="oldPrice">{product.price} zł</span>
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div className="actualPriceUnderLowestPrice">
            {product.discountedPrice || product.price} zł
          </div>
          <div
            className="cartOnHover"
            onClick={() => addProductsToCart(product)}
          >
            <i className="fa-solid fa-cart-shopping fa-lg cartInProductsContainer"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProduct;
