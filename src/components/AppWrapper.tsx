"use client";
import { fetchMenuDetails } from "@/redux/features/menu-slice";
import { fetchRestaurantDetails } from "@/redux/features/restaurant-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Pages } from "@/utils/Pages";
import i18n from 'i18next';
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { initReactI18next } from 'react-i18next';
import { useDispatch } from "react-redux";
import enTranslations from '../locales/en/translations.json';
import ptBRTranslations from '../locales/pt/translations.json';
import DesktopHeader from "./DesktopHeader";
import Loader from "./Loader";
import MobileHeader from "./MobileHeader";

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      'pt-BR': {
        translation: ptBRTranslations
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Use English if the current language translations are not available
    interpolation: {
      escapeValue: false
    }
  });

  
export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const [activePage, setActivePage] = useState<string>(Pages.MENU.name);

  useEffect(() => {
    if (restaurantResponse.locale) {
      i18n.changeLanguage(restaurantResponse.locale); // Change the language when the restaurant response is received
    }
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
