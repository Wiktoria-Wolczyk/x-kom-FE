import React from "react";
import { ReactComponent as Computer } from "../src/HomepageIcons/laptopAndComputer.svg";
import { ReactComponent as Smartphones } from "../src/HomepageIcons/smartphoneAndWatch.svg";
import { ReactComponent as IC } from "../src/HomepageIcons/IC.svg";
import { ReactComponent as GamesAcc } from "../src/HomepageIcons/gameController.svg";
import { ReactComponent as Printer } from "../src/HomepageIcons/printer.svg";
import { ReactComponent as TV } from "../src/HomepageIcons/tvAndAudio.svg";
import { ReactComponent as Smarthome } from "../src/HomepageIcons/smarthome.svg";
import { ReactComponent as Accessories } from "../src/HomepageIcons/accessories.svg";
import { ReactComponent as Percent } from "../src/HomepageIcons/percent.svg";
import { ReactComponent as CouponSVG } from "../src/HomepageIcons/coupon.svg";
import { ReactComponent as Xkom } from "../src/HomepageIcons/xkom.svg";
// import { ReactComponent as User } from "../src/navbar/svgInMenu/user.svg";
import { ReactComponent as Order } from "../src/navbar/svgInMenu/order.svg";
import { ReactComponent as Return } from "../src/navbar/svgInMenu/return.svg";
import { ReactComponent as Saved } from "../src/navbar/svgInMenu/saved.svg";
import { ReactComponent as Opinions } from "../src/navbar/svgInMenu/opinions.svg";
// import { ReactComponent as OrderDetails } from "../src/navbar/svgInMenu/orderDetails.svg";
import { ReactComponent as AccountSettings } from "../src/navbar/svgInMenu/acountSettings.svg";
// import { ReactComponent as SalesMaster } from "../src/navbar/svgInMenu/salesMaster.svg";

const Icons = ({ name, style = {} }: { name: string; style: any }) => {
  switch (name) {
    case "Computer":
      return <Computer style={style} />;
    case "Smartphones":
      return <Smartphones style={style} />;
    case "IC":
      return <IC style={style} />;
    case "GamesAcc":
      return <GamesAcc style={style} />;
    case "Printer":
      return <Printer style={style} />;
    case "TV":
      return <TV style={style} />;
    case "Smarthome":
      return <Smarthome style={style} />;
    case "Accessories":
      return <Accessories style={style} />;
    case "Coupon":
      return <CouponSVG style={style} />;
    case "Percent":
      return <Percent style={style} />;
    case "Xkom":
      return <Xkom style={style} />;

    case "Order":
      return <Order style={style} />;
    case "Return":
      return <Return style={style} />;
    case "Saved":
      return <Saved style={style} />;
    case "Opinions":
      return <Opinions style={style} />;

    default:
      return <AccountSettings style={style} />;
  }
};

export default Icons;
