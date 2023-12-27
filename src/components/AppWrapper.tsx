"use client";
import { fetchMenuDetails } from "@/redux/features/menu-slice";
import { fetchRestaurantDetails } from "@/redux/features/restaurant-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Header from "./Header";
import Loader from "./Loader";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const isModalVisible = useAppSelector((state) => state.modal.value);
  const isLargeScreen = useMediaQuery({ minWidth: 481 }); // Min width of the modal is 480px
  useEffect(() => {
    dispatch(fetchRestaurantDetails());
    dispatch(fetchMenuDetails());
  }, [dispatch]);

  return (
    <>
      {Object.keys(restaurantResponse).length === 0 ? (
        <Loader />
      ) : (
        <div
          style={
            {
              "--primary": `${restaurantResponse.webSettings.primaryColour}`,
              "--primary-hover": `${restaurantResponse.webSettings.primaryColourHover}`,
              "--nav-bg": `${restaurantResponse.webSettings.navBackgroundColour}`,
              "--main-bg": `${restaurantResponse.webSettings.backgroundColour}`,
            } as React.CSSProperties
          }
        >
          <Header title="Menu" />
          {children}
        </div>
      )}
    </>
  );
}
