import Basket from "@/components/Basket";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";

// Teste 1: Verificar se o componente Basket renderiza sem falhas
it("renders without crashing", () => {
  const mockCheckoutItems = [
    {
      item: {
        id: 1625701,
        name: "Hard Core",
        description:
          "180g angus beef burger, with shredded ribs, gruyere cheese, caramelized onions, lettuce, confit tomato, special house bread, served with fried cassava and passion fruit chipotle.",
        alcoholic: 0,
        price: 33,
        position: 0,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1625701",
        images: [
          {
            id: 108305,
            image:
              "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbdc8cecca.png",
          },
        ],
        available: true,
      },
      quantity: 1,
      price: 33,
    },
    {
      item: {
        id: 1625705,
        name: "Caipirinha",
        alcoholic: 0,
        price: 13,
        position: 0,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1625705",
        available: true,
      },
      quantity: 1,
      price: 13,
    },
    {
      item: {
        id: 1625704,
        name: "Nutella",
        alcoholic: 0,
        price: 18.9,
        position: 0,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        images: [
          {
            id: 108310,
            image:
              "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbf0bec8fe.png",
          },
        ],
        available: true,
      },
      quantity: 1,
      price: 18.9,
    },
    {
      item: {
        id: 1625703,
        name: "Ogro Burger",
        description:
          "180g angus beef burger, homemade molasses barbecue with golden bacon cubes, mozzarella cheese and homemade roasted garlic mayonnaise.",
        alcoholic: 0,
        price: 33,
        position: 2000,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1625703",
        images: [
          {
            id: 108309,
            image:
              "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbe292998e.png",
          },
        ],
        available: true,
      },
      quantity: 2,
      price: 66,
    },
  ];
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
      checkout: {
        value: mockCheckoutItems,
      },
      restaurant: {
        value: mockRestaurantItems,
      },
    }),
  });

  const { getByText } = render(
    <Provider store={store}>
      <Basket />
    </Provider>
  );

  // Substitua 'Basket' pelo texto que você espera encontrar no componente Basket
  expect(getByText("Carrinho")).toBeInTheDocument();
});

// Teste 2: Verificar se a função updateBasketItem é chamada quando um botão é clicado
it("calls updateBasketItem when button is clicked", () => {
  const mockCheckoutItems = [
    {
      item: {
        id: 1625701,
        name: "Hard Core",
        description:
          "180g angus beef burger, with shredded ribs, gruyere cheese, caramelized onions, lettuce, confit tomato, special house bread, served with fried cassava and passion fruit chipotle.",
        alcoholic: 0,
        price: 33,
        position: 0,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1625701",
        images: [
          {
            id: 108305,
            image:
              "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbdc8cecca.png",
          },
        ],
        available: true,
      },
      quantity: 1,
      price: 33,
    },
    {
      item: {
        id: 1625705,
        name: "Caipirinha",
        alcoholic: 0,
        price: 13,
        position: 0,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1625705",
        available: true,
      },
      quantity: 1,
      price: 13,
    },
    {
      item: {
        id: 1625704,
        name: "Nutella",
        alcoholic: 0,
        price: 18.9,
        position: 0,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        images: [
          {
            id: 108310,
            image:
              "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbf0bec8fe.png",
          },
        ],
        available: true,
      },
      quantity: 1,
      price: 18.9,
    },
    {
      item: {
        id: 1625703,
        name: "Ogro Burger",
        description:
          "180g angus beef burger, homemade molasses barbecue with golden bacon cubes, mozzarella cheese and homemade roasted garlic mayonnaise.",
        alcoholic: 0,
        price: 33,
        position: 2000,
        visible: 1,
        availabilityType: "AVAILABLE_NOW",
        sku: "I1625703",
        images: [
          {
            id: 108309,
            image:
              "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbe292998e.png",
          },
        ],
        available: true,
      },
      quantity: 2,
      price: 66,
    },
  ];
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
      checkout: {
        value: mockCheckoutItems,
      },
      restaurant: {
        value: mockRestaurantItems,
      },
    }),
  });

  // Crie um espião na função dispatch
  const dispatchSpy = jest.spyOn(store, "dispatch");

  const { getAllByTestId } = render(
    <Provider store={store}>
      <Basket />
    </Provider>
  );

  const increaseButtons = getAllByTestId("increase-quantity");

  increaseButtons.forEach((button) => {
    fireEvent.click(button);
  });

  // Verifique se a ação updateOrderItem foi despachada
  // Substitua 'updateOrderItem' pelo nome da ação que você espera que seja despachada
  expect(dispatchSpy).toHaveBeenCalledWith({
    type: "checkout/updateOrderItem",
    payload: expect.anything(),
  });
});
