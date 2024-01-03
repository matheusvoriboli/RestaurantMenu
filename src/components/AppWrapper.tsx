"use client";
import { fetchMenuDetails } from "@/redux/features/menu-slice";
import { fetchRestaurantDetails } from "@/redux/features/restaurant-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Pages } from "@/utils/Pages";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import "../services/i18n";
import DesktopHeader from "./DesktopHeader";
import Loader from "./Loader";
import MobileHeader from "./MobileHeader";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const [activePage, setActivePage] = useState<string>(Pages.MENU.name);
  const { i18n, ready } = useTranslation();

  useEffect(() => {
    restaurantResponse.locale && changeLanguage(restaurantResponse.locale);
  }, [restaurantResponse]);

  useEffect(() => {
    dispatch(fetchRestaurantDetails());
    dispatch(fetchMenuDetails());
  }, [dispatch]);

  const pathname = usePathname();
  useEffect(() => {
    Object.values(Pages).forEach((page) => {
      if (page.path === pathname) {
        setActivePage(page.name);
      }
    });
  }, [pathname]);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  if (!ready) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
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
          <div className="lg:hidden">
            <MobileHeader activePage={activePage} />
          </div>
          <div className="lg:block hidden">
            <DesktopHeader activePage={activePage} />
          </div>
          {children}
        </div>
      )}
    </Suspense>
  );
}
