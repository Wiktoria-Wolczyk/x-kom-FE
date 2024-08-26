import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";

interface IProps {
  title: string;
  value: string;
  setValue: (arg: string) => void;
  elements: {
    name: string;
    img: string;
    alt: string;
    price: string;
    valueName: string;
  }[];
}

const CheckboxDelivery = ({ title, value, setValue, elements }: IProps) => {
  return (
    <div className="containerForCheckboxAndText">
      <h2 className="textDeliveryMethod">{title}</h2>
      <div className="containerForDeliveryMethod">
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="column">
            {elements.map((el, index) => (
              <div
                key={index}
                onClick={() => setValue(el.valueName)}
                className={`radio-div ${value === el.valueName ? "selectedRadio" : ""}`}
              >
                <Radio value={el.valueName} className="radioElement">
                  {el.name}
                </Radio>
                <div className="divForPaymentLogoAndPrice">
                  <img
                    src={el.img}
                    alt={el.alt}
                    width={30}
                    height={30}
                    style={{
                      filter:
                        value === el.valueName
                          ? "grayscale(0)"
                          : "grayscale(1)",
                    }}
                  />
                  <span style={{ marginLeft: 10 }}> {el.price}</span>
                </div>
              </div>
            ))}
          </Stack>
        </RadioGroup>
      </div>
    </div>
  );
};

export default CheckboxDelivery;
