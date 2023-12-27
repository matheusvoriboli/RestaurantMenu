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
    if(item.selectedModifier) {
      dispatch(
        updateOrderItem({
          item: item.item,
          quantity: quantity,
          price: (item.item.price + item.selectedModifier.price) * quantity,
          selectedModifier: item.selectedModifier
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
  }

  return (
    <div className="bg-background-default shadow h-fit min-w-80">
      <div className="p-5 flex justify-center">
        <h1 className="text-main text-xl font-semibold">Carrinho</h1>
      </div>
      <div className="bg-white">
        {checkoutResponse.length === 0 ? (
          <p className="p-5">Seu carrinho está vazio</p>
        ) : (
          <ul>
            {checkoutResponse.map((order) => (
              <li className="flex justify-between px-4 py-2" key={order?.selectedModifier ? order?.selectedModifier.id : order?.item.id}>
                <div className="flex flex-col p-1">
                  <span className="text-main">
                    {order?.item?.name}
                  </span>
                  <span className="text-inactive">
                    {order?.selectedModifier?.name}
                  </span>
                  <div className="flex items-center gap-1 mt-2">
                    <Button size={ButtonSize.Small} circleButton onClick={() => updateBasketItem(order, order?.quantity - 1)}>
                      <Minus weight="bold"/>
                    </Button>
                    <span className="px-2">{order?.quantity}</span>
                    <Button size={ButtonSize.Small} circleButton onClick={() => updateBasketItem(order, order?.quantity + 1)}>
                      <Plus weight="bold"/>
                    </Button>
                  </div>
                </div>
                <div className="p-5">{restaurantResponse.currency} {order?.price.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
