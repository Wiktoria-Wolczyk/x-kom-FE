import React from "react";
import Lottery from "./Lottery";
import Recommended from "./Recommended";

const LotteryAndRecommended = () => {
  return (
    <div className="containerForLotteryAndRecommendedProducts">
      <Lottery />
      <Recommended />
    </div>
  );
};

export default LotteryAndRecommended;
