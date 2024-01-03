import Button from "@/components/Button";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

it("applies background and text colors", () => {
  const mockRestaurantItems = {
    id: 7602,
    name: "BURGERS RESTAURANT",
    internalName: "BURGERS RESTAURANT",
    description: null,
    liveFlag: 1,
    demoFlag: 1,
    address1: "Rua XX-X, 1-11",
    address2: "XXX",
    address3: null,
    city: "Bauru",
    county: "BR",
    postcode: "17012-360",
    country: "BR",
    timezoneOffset: "-03:00",
    locale: "pt-BR",
    timeZone: "America/Sao_Paulo",
    webSettings: {
      id: 5854,
      venueId: 7602,
      bannerImage:
        "https://preodemo.gumlet.io/usr/venue/7602/web/646fbf3abf9d0.png",
      backgroundColour: "#ffffff",
      primaryColour: "#4f372f",
      primaryColourHover: "#4f372f",
      navBackgroundColour: "#4f372f",
    },
    ccy: "BRL",
    ccySymbol: "R$",
    currency: "R$",
  };

  const store = configureStore({
    reducer: () => ({
      restaurant: {
        value: mockRestaurantItems,
      },
    }),
  });

  const backgroundColor = "#123456";
  const textColor = "#abcdef";
  const { getByRole } = render(
    <Provider store={store}>
      <Button backgroundColor={backgroundColor} textColor={textColor} />
    </Provider>
  );
  const buttonElement = getByRole("button");
  expect(buttonElement).toHaveStyle(`background-color: ${backgroundColor}`);
  expect(buttonElement).toHaveStyle(`color: ${textColor}`);
});
