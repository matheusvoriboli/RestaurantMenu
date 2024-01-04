"use client"
import { addOrderItem, setCurrentCheckoutItemModalVisibility } from "@/redux/features/checkout-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { ModifierItem } from "@/types/Menu";
import { Dot, Minus, Plus } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Button from "./Button";
import Loader from "./Loader";
import ModifierContainer from "./ModifierContainer";


export default function SelectedItemContainer() {
  const { t } = useTranslation();
  const [selectedModifier, setSelectedModifier] = useState<ModifierItem>();
  const [quantity, setQuantity] = useState<number>(1);
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const checkoutResponse = useAppSelector((state) => state.checkout.value);
  const dispatch = useDispatch<AppDispatch>();
  

  const handleAddToOrder = () => {
    selectedModifier
      ? dispatch(
          addOrderItem({
            item: checkoutResponse.currentItem,
            quantity: quantity,
            selectedModifier: selectedModifier,
            price: (checkoutResponse.currentItem.price + selectedModifier.price) * quantity
          })
        )
      : dispatch(
          addOrderItem({
            item: checkoutResponse.currentItem,
            quantity: quantity,
            price: checkoutResponse.currentItem.price * quantity
          })
        );
    dispatch(setCurrentCheckoutItemModalVisibility(false));
  };

  const isAddOrderButtonDisabled = () => {
    return !selectedModifier && checkoutResponse.currentItem.modifiers && checkoutResponse.currentItem.modifiers.length > 0;
  }

  return (
    <>
      {Object.keys(checkoutResponse).length == 0 ? (
        <Loader />
      ) : (
        <div className="h-full w-full max-w-[480px] max-h-[720px] xsm:min-w-96 flex flex-col">
          {checkoutResponse.currentItem.images && (
            <div className="w-full h-64 lg:h-72 relative overflow-hidden">
              <Image
                src={checkoutResponse.currentItem.images[0].image}
                alt={checkoutResponse.currentItem.name}
                fill
                className="object-cover"
                priority
                sizes="100%"
              />
            </div>
          )}
          <div className="overflow-hidden overflow-y-auto scrollbar-hide pb-9 xsm:pb-[140px]">
            <div className="p-4">
              <h1 className="text-2xl font-semibold text-main">
                {t(checkoutResponse?.currentItem?.name)}
              </h1>
              <p className="font-light text-secondary">
                {t(checkoutResponse?.currentItem?.description)}
              </p>
            </div>
            {checkoutResponse?.currentItem?.modifiers?.map((modifier) => (
              <ModifierContainer
                setSelectedModifier={setSelectedModifier}
                selectedModifier={selectedModifier}
                modifier={modifier}
                key={modifier.id}
              />
            ))}
          </div>
          <div className="bg-[rgba(255,255,255,0.3)] absolute bottom-0 pb-6 backdrop-blur-sm flex flex-col justify-between pt-3 w-full px-4 gap-4">
            <div className="flex justify-center items-center gap-6">
              <Button
                onClick={() => {
                  if (quantity > 1) setQuantity(quantity - 1);
                }}
                disabled={quantity === 1}
              >
                <Minus weight="bold" />
              </Button>
              <h1 className="font-bold">{quantity}</h1>
              <Button onClick={() => setQuantity(state => state + 1)}>
                <Plus weight="bold" />
              </Button>
            </div>
            <Button fullScreen onClick={handleAddToOrder} disabled={isAddOrderButtonDisabled()}>
              {t('Add to order')}
              <Dot size={21} weight="bold" />
              {t(restaurantResponse.currency)} {(selectedModifier ? selectedModifier.price * quantity : checkoutResponse?.currentItem?.price * quantity).toFixed(2)}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
