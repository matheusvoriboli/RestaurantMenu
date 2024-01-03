import { toggleModalVisibility } from "@/redux/features/modal-slice";
import { setCurrentItem } from "@/redux/features/order-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Item } from "@/types/Menu";
import { CaretDown } from "@phosphor-icons/react";
import Image from "next/image";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Modal from "./Modal";
import SelectedItemContainer from "./SelectedItemContainer";

type MenuAccordionProps = {
  items: Item[];
  title: string;
  currency: string;
};

const MenuAccordion = forwardRef<HTMLDivElement, MenuAccordionProps>(
  ({ items, title, currency = "R$" }: MenuAccordionProps, ref) => {
    const { t } = useTranslation();
    const [accordionOpened, setAccordionOpened] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const isModalVisible = useAppSelector((state) => state.modal.value);
    const checkoutResponse = useAppSelector((state) => state.checkout.value);
    const isLargeScreen = useMediaQuery({ minWidth: 481 }); // Min width of the modal is 480px

    const numberOfOrderedItems = (item: Item) => {
      if (checkoutResponse.length > 0) {
        if (item.modifiers && item.modifiers.length > 0) {
          var quantity = 0;
          checkoutResponse.forEach((checkoutItem) => {
            if (checkoutItem.item.id === item.id) {
              quantity += checkoutItem.quantity;
            }
          });
          if (quantity > 0) {
            return (
              <span className="main-bg text-white px-1 rounded text-sm me-2">
                {quantity.toString()}
              </span>
            );
          }
        } else {
          const itemInCheckout = checkoutResponse.find(
            (checkoutItem) => checkoutItem.item.id === item.id
          );
          if (itemInCheckout) {
            return (
              <span className="main-bg text-white px-1 rounded text-sm me-2">
                {itemInCheckout.quantity.toString()}
              </span>
            );
          }
        }
      }
    };

    return (
      <>
        <Modal
          isOpen={isModalVisible}
          onClose={() => dispatch(toggleModalVisibility())}
          fullScreen={!isLargeScreen}
        >
          <SelectedItemContainer />
        </Modal>
        <div className="flex flex-col gap-6" ref={ref}>
          <div className="flex justify-between cursor-pointer" onClick={() => setAccordionOpened((state) => !state)}>
            <h1 className="text-2xl font-semibold">{t(title)}</h1>
            <button>
              <CaretDown
                className={`w-6 h-6 transform transition-all ${
                  !accordionOpened ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {items &&
            accordionOpened &&
            items?.map((item) => (
              <div
                className="flex flex-col cursor-pointer"
                key={item.id}
                onClick={() => {
                  dispatch(toggleModalVisibility());
                  dispatch(setCurrentItem(item));
                }}
              >
                <div className="flex justify-between gap-8">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center">
                      {numberOfOrderedItems(item)}
                      <p className="text-main">{item.name}</p>
                    </div>
                    <p className="text-sm text-secondary font-extralight overflow-hidden clip-item-description-text">
                      {t(item.description)}
                    </p>
                    <p className="text-sm text-secondary font-semibold">
                      {t(currency)} {item.price.toFixed(2)}
                    </p>
                  </div>
                  {item?.images?.length > 0 && (
                    <div className="relative w-32 rounded overflow-hidden">
                      <Image
                        alt={item?.name}
                        src={item?.images[0].image}
                        fill
                        className="object-cover"
                        priority
                        sizes="100%"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }
);

export default MenuAccordion;
