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
    default:
      return <Percent style={style} />;
  }
};

export default Icons;
