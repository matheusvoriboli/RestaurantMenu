import { setCurrentItem, toggleSelectedItemContainerVisibility } from "@/redux/features/order-slice";
import { AppDispatch } from "@/redux/store";
import { Item } from "@/types/Menu";
import { CaretDown } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

type MenuAccordionProps = {
  items: Item[];
  title: string;
  currency: string;
};

export default function MenuAccordion ({ items, title, currency = "R$" }: MenuAccordionProps) {
  const [accordionOpened, setAccordionOpened] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col gap-6" >
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <button
          onClick={() => setAccordionOpened(state => !state)}
        >
         <CaretDown className={`w-6 h-6 transform transition-all ${!accordionOpened ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {items &&
        accordionOpened &&
        items?.map((item) => (
          <div className="flex flex-col" key={item.id} onClick={() => {
            dispatch(toggleSelectedItemContainerVisibility())
            dispatch(setCurrentItem(item))
          } }>
            <div className="flex justify-between">
              <div className="flex flex-col w-6/12">
                <p className="text-main">{item.name}</p>
                <p className="text-sm text-secondary font-extralight overflow-hidden clip-item-description-text">
                  {item.description}
                </p>
                <p className="text-sm text-secondary font-semibold">{currency} {item.price.toFixed(2)}</p>
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
  );
};
