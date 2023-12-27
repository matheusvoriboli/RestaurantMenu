import { addOrderItem } from "@/redux/features/checkout-slice";
import { toggleModalVisibility } from "@/redux/features/modal-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Dot, Minus, Plus } from "@phosphor-icons/react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import Button from "./Button";
import Loader from "./Loader";
import ModifierContainer from "./ModifierContainer";

export default function SelectedItemContainer() {
  const orderResponse = useAppSelector((state) => state.order.value);
  const dispatch = useDispatch<AppDispatch>();
  
   const handleAddToOrder = () => {
      dispatch(addOrderItem(orderResponse.currentItem));
      dispatch(toggleModalVisibility())
   }

  return (
    <>
      {Object.keys(orderResponse).length == 0 ? (
        <Loader />
      ) : (
        <div className="h-full w-full max-w-[480px] max-h-[720px] xsm:min-w-96 flex flex-col">
          {orderResponse.currentItem.images && (
            <div className="w-full h-64 lg:h-72 relative overflow-hidden">
               <Image
               src={orderResponse.currentItem.images[0].image}
               alt={orderResponse.currentItem.name}
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
                {orderResponse?.currentItem?.name}
              </h1>
              <p className="font-light text-secondary">
                {orderResponse?.currentItem?.description}
              </p>
            </div>
            {orderResponse?.currentItem?.modifiers?.map((modifier) => (
              <ModifierContainer modifier={modifier} key={modifier.id} />
            ))}
          </div>
          <div className="bg-[rgba(255,255,255,0.3)] absolute bottom-0 pb-6 backdrop-blur-sm flex flex-col justify-between pt-3 w-full px-4 gap-4">
            <div className="flex justify-center items-center gap-6">
              <Button
                onClick={() => console.log("minus")}
                backgroundColor="#DADADA"
              >
                <Minus weight="bold" />
              </Button>
              <h1 className="font-bold">1</h1>
              <Button onClick={() => console.log("plus")}>
                <Plus weight="bold" />
              </Button>
            </div>
            <Button fullScreen onClick={handleAddToOrder}>
              Add to Order
              <Dot size={21} weight="bold" />
              R$ {orderResponse?.currentItem?.price.toFixed(2)}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
