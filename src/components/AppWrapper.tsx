"use client";
import { fetchMenuDetails } from "@/redux/features/menu-slice";
import { toggleSelectedItemContainerVisibility } from "@/redux/features/order-slice";
import { fetchRestaurantDetails } from "@/redux/features/restaurant-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Header from "./Header";
import Loader from "./Loader";
import Modal from "./Modal";
import SelectedItemContainer from "./SelectedItemContainer";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const orderResponse = useAppSelector((state) => state.order.value);
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
        <>
          <Modal
            isOpen={orderResponse?.isSelectedItemContainerVisible}
            onClose={() => dispatch(toggleSelectedItemContainerVisibility())}
            fullScreen={!isLargeScreen}
          >
            <SelectedItemContainer />
          </Modal>
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
        </>
      )}
    </>
  );
}
