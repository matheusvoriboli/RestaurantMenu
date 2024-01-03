import { ButtonSize } from "@/enums/ButtonSize";
import { updateOrderItem } from "@/redux/features/checkout-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { CheckoutItem } from "@/types/Checkout";
import { Minus, Plus } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import Button from "./Button";

export default function Basket() {
  const dispatch = useDispatch<AppDispatch>();
  const checkoutResponse = useAppSelector((state) => state.checkout.value);
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);

  const updateBasketItem = (item: CheckoutItem, quantity: number) => {
    if (item.selectedModifier) {
      dispatch(
        updateOrderItem({
          item: item.item,
          quantity: quantity,
          price: (item.item.price + item.selectedModifier.price) * quantity,
          selectedModifier: item.selectedModifier,
        })
      );
    } else {
      dispatch(
        updateOrderItem({
          item: item.item,
          quantity: quantity,
          price: item.item.price * quantity,
        })
      );
    }
  };

  const getTotalValue = () => {
    let totalValue = 0;
    checkoutResponse.forEach((item) => {
      totalValue += item.price;
    });
    return `${restaurantResponse.currency} ${totalValue.toFixed(2)}`;
  };

  return (
    <div className="lg:bg-background-default bg-white lg:shadow lg:h-fit h-full min-w-80 relative">
      <div className="p-5 flex justify-center border-b lg:border-b-0 border-b-inactive-background">
        <h1 className="text-main text-xl font-semibold">Carrinho</h1>
      </div>
      <div className="bg-white">
        {checkoutResponse.length === 0 ? (
          <p className="p-5">Seu carrinho está vazio</p>
        ) : (
          <ul>
            {checkoutResponse.map((order) => (
              <li
                className="flex justify-between items-center px-4 py-2 border-b border-inactive-background lg:border-b-0"
                key={
                  order?.selectedModifier
                    ? order?.selectedModifier.id
                    : order?.item.id
                }
              >
                <div className="flex flex-col p-1">
                  <span className="text-main">{order?.item?.name}</span>
                  <div className="flex">
                    {order?.selectedModifier && (
                      <>
                        <span className="text-inactive me-1">
                          {order?.selectedModifier?.name}
                        </span>
                        <span className="text-inactive">
                          (+{restaurantResponse.currency}{" "}
                          {order?.selectedModifier?.price.toFixed(2)})
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2 ms-1">
                    <Button
                      size={ButtonSize.Small}
                      circleButton
                      dataTestId="decrease-quantity"
                      onClick={() =>
                        updateBasketItem(order, order?.quantity - 1)
                      }
                    >
                      <Minus weight="bold" />
                    </Button>
                    <span className="px-2">{order?.quantity}</span>
                    <Button
                      size={ButtonSize.Small}
                      circleButton
                      dataTestId="increase-quantity"
                      onClick={() =>
                        updateBasketItem(order, order?.quantity + 1)
                      }
                    >
                      <Plus weight="bold" />
                    </Button>
                  </div>
                </div>
                <div className="">
                  {restaurantResponse.currency} {order?.price.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {checkoutResponse.length > 0 && (
        <div className="bg-background-default h-full">
          <div className="flex justify-between px-4 py-5 text-main">
            <span>Sub Total</span>
            <span className="font-semibold">{getTotalValue()}</span>
          </div>
          <div className="flex justify-between px-4 py-5 border-t border-inactive-background text-main text-2xl h-full">
            <span>Total</span>
            <span className="font-semibold">{getTotalValue()}</span>
          </div>
        </div>
      )}
      <div className="lg:hidden bg-[rgba(255,255,255,0.3)] fixed bottom-0 pb-6 backdrop-blur-sm flex flex-col justify-between pt-3 gap-4 w-full px-2 py-4">
        <Button fullScreen onClick={() => {}}>
          Checkout now
        </Button>
      </div>
    </div>
  );
}
