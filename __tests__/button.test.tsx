import Button from "@/components/Button";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent } from "@testing-library/react";
import render from './helpers/ProviderRender';
import { mockRestaurantData } from "./mocks/mockRestaurantData";

describe("Button", () => {
  const store = configureStore({
    reducer: () => ({
      restaurant: {
        value: mockRestaurantData,
      },
    }),
  });
  it("renders button", () => {
    const { getByRole } = render(<Button />);
    const buttonElement = getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Button onClick={handleClick} />);
    const buttonElement = getByRole("button");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalled();
  });
  it("applies background and text colors", () => {
    const backgroundColor = "#123456";
    const textColor = "#abcdef";
    const { getByRole } = render(<Button backgroundColor={backgroundColor} textColor={textColor} />);
    const buttonElement = getByRole("button");
    expect(buttonElement).toHaveStyle(`background-color: ${backgroundColor}`);
    expect(buttonElement).toHaveStyle(`color: ${textColor}`);
  });
});
