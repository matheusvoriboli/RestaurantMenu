"use client";
import { fetchMenuDetails } from "@/redux/features/menu-slice";
import { fetchRestaurantDetails } from "@/redux/features/restaurant-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Loader from "./Loader";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const response = useAppSelector((state) => state.restaurant.value);
  useEffect(() => {
    dispatch(fetchRestaurantDetails());
    dispatch(fetchMenuDetails());
  }, [dispatch]);

  return (
    <>
      {Object.keys(response).length === 0 ? (
        <Loader />
      ) : (
         <div
          style={
            {
              "--primary": `${response.webSettings.primaryColour}`,
              "--primary-hover": `${response.webSettings.primaryColourHover}`,
              "--nav-bg": `${response.webSettings.navBackgroundColour}`,
              "--main-bg": `${response.webSettings.backgroundColour}`,
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
