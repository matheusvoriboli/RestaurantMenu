"use client";
import Basket from "@/components/Basket";
import Button from "@/components/Button";
import MenuContainer from "@/components/MenuContainer";
import Modal from "@/components/Modal";
import SearchMenuItems from "@/components/SearchMenuItems";
import { useAppSelector } from "@/redux/store";
import { Dot } from "@phosphor-icons/react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from "react-responsive";

export default function MenuWrapper() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const checkoutResponse = useAppSelector((state) => state.checkout.value);
  const isLargeScreen = useMediaQuery({ minWidth: 481 }); // Min width of the modal is 480px
  return (
    <>
    <Head>
        <title>My page title</title>
      </Head>
      <div className="flex flex-col relative">
        <div className="relative w-full h-36">
          <Image
            src={restaurantResponse?.webSettings?.bannerImage}
            alt="menu-image"
            fill
            className="object-cover"
            priority
            sizes="100%"
          />
        </div>
        <div className="custom-content-height flex flex-col items-center">
          <div className="lg:w-[1024px] h-full flex flex-col mb-8 w-full">
            <div className="lg:block hidden w-full lg:my-2">
              <SearchMenuItems />
            </div>
            <div className="bg-background-default lg:py-8 lg:px-10 flex gap-6 h-full">
              <MenuContainer />
              <div className="hidden lg:flex">
                <Basket />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:hidden w-full">
            <div className="bg-background-default border-background-subtle border-b-[1px] border-t-[1px] w-full p-6">
              <div className=" bg-white w-full flex justify-center rounded-lg">
                <h1
                  style={{
                    color: restaurantResponse?.webSettings?.primaryColour,
                  }}
                  className="underline font-bold"
                >
                  {t('View allergy information')}
                </h1>
              </div>
            </div>
            <div className="bg-background-default p-10"></div>
          </div>
        </div>
        {checkoutResponse?.checkoutItems?.length > 0 && (
          <div className="lg:hidden bg-[rgba(255,255,255,0.3)] fixed bottom-0 pb-6 backdrop-blur-sm flex flex-col justify-between pt-3 w-full px-4 gap-4">
            <Button onClick={() => setIsModalOpen(true)}>
              <h1 className="text-white text-xl font-semibold">{t('Your basket')}</h1>
              <Dot color="white" weight="bold" size={24} />
              <h1 className="text-white text-xl font-semibold">
                {checkoutResponse?.checkoutItems?.length}{" "}
                {checkoutResponse?.checkoutItems?.length === 1 ? "item" : "items"}
              </h1>
            </Button>
          </div>
        )}
      </div>
      <Modal fullScreen={!isLargeScreen} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Basket onCheckout={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
