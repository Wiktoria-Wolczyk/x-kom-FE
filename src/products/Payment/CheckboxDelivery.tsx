import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React from "react";

interface IProps {
  title: string;
  value: number;
  setValue: (arg: number) => void;
  elements: {
    id: number;
    name: string;
    img: string;
    alt: string;
    price?: number;
    valueName: string;
  }[];
}

const CheckboxDelivery = ({ title, value, setValue, elements }: IProps) => {
  return (
    <div className="containerForCheckboxAndText">
      <h2 className="textDeliveryMethod">{title}</h2>
      <div className="containerForDeliveryMethod">
        <RadioGroup onChange={(_id) => setValue(+_id)} value={`${value}`}>
          <Stack direction="column">
            {elements.map((el) => (
              <div
                key={el.id}
                onClick={() => setValue(el.id)}
                className={`radio-div ${value === el.id ? "selectedRadio" : ""}`}
              >
                <Radio value={`${el.id}`} className="radioElement">
                  {el.name}
                </Radio>
                <div className="divForPaymentLogoAndPrice">
                  <img
                    src={el.img}
                    alt={el.alt}
                    width={30}
                    height={30}
                    style={{
                      filter: value === el.id ? "grayscale(0)" : "grayscale(1)",
                    }}
                  />
                  {el.price && (
                    <span style={{ marginLeft: 10 }}> {el.price} zł</span>
                  )}
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
