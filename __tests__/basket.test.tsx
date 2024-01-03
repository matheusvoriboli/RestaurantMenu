import Basket from "@/components/Basket";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import render from "./helpers/ProviderRender";
import { mockCheckoutData } from "./mocks/mockCheckoutData";
import { mockRestaurantData } from "./mocks/mockRestaurantData";

describe("Basket", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Basket />)
    expect(getByText("Carrinho")).toBeInTheDocument();
  });

  it("calls updateBasketItem when button is clicked", () => {
    const store = configureStore({
      reducer: () => ({
        checkout: {
          value: mockCheckoutData,
        },
        restaurant: {
          value: mockRestaurantData,
        },
      }),
    });
    const dispatchSpy = jest.spyOn(store, "dispatch");
    // On this example i need to pass this exact store to the Provider
    const { getAllByTestId } = render(
      <Provider store={store}>
        <Basket />
      </Provider>
    );
    const increaseButtons = getAllByTestId("increase-quantity");
    increaseButtons.forEach((button) => {
      fireEvent.click(button);
    });
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: "checkout/updateOrderItem",
      payload: expect.anything(),
    });
  });
});
