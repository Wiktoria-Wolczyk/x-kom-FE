// {
//    <div className="divScrollingContainer">
//       {productsArray?.map((el: IProductsArray) => (
//         <>
//           <div className="containerForCardWithProduct">
//             <div className="containerForPhoto">
//               <img src={AppleIPhone} alt="Apple IPhone Photo" />
//             </div>
//             <div className="productDetails">
//               <p className="productName">{el.name}</p>
//               <p className="productAvailable">Dostępnych: {el.available}</p>
//             </div>
//             <div className="priceAndCartContainer">
//               <p className="Productprice">3499,00 zł</p>
//               <div className="divForCartInProductCard">
//                 <i
//                   className="fa-solid fa-cart-shopping"
//                   style={{ color: "rgb(15, 193, 63)" }}
//                 ></i>
//               </div>
//             </div>
//           </div>
//         </>
//       ))}
//     </div>
// }

// .containerForCardWithProduct {
//   width: 100%;
//   border-bottom: 1px solid lightgray;
//   background-color: white;
// }

// .containerForPhoto {
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   height: 240px;
// }

// .productDetails {
//   width: 100%;
//   height: 80px;
//   padding-left: 20px;
//   padding-top: 10px;
//   line-height: 25px;
// }

// .productName {
//   font-size: 22px;
// }

// .productAvailable {
//   font-size: 14px;
// }

// .priceAndCartContainer {
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   width: 100%;
//   height: 50px;
//   padding: 0px 20px;
// }

// .Productprice {
//   font-size: 25px;
// }

// .divForCartInProductCard {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 40px;
//   height: 40px;
//   border-radius: 5px;
//   border: 2px solid rgb(15, 193, 63);
// }

export {};
