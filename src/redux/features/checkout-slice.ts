import { Checkout, CheckoutItem } from "@/types/Checkout";
import { Item } from "@/types/Menu";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Checkout = {
  checkoutItems: [],
  currentItem: {} as Item, // substitua por um valor inicial adequado para Item
  currentItemModalVisibility: false,
};

const addOrder = (index: number, stateValue: CheckoutItem[] , actionPayload: CheckoutItem) => {
  if (index !== -1) {
    stateValue[index].quantity += actionPayload.quantity;
  } else {
    stateValue.push(actionPayload);
  }
}

const updateOrder = (index: number, item: CheckoutItem, stateValue: CheckoutItem[] , actionPayload: CheckoutItem) => {
  if(actionPayload.quantity === 0) {
    stateValue.splice(index, 1);
  } else {
    item.quantity = actionPayload.quantity;
    item.price = actionPayload.price;
  }
}

export const checkout = createSlice({
  name: "checkout",
  initialState: { value: initialState },
  reducers: {
    addOrderItem: (state, action: PayloadAction<CheckoutItem>) => {
      if (state.value.checkoutItems.length === 0) {
        state.value.checkoutItems.push(action.payload as CheckoutItem);
      } else {
        if(action.payload.selectedModifier) {
          const index = state.value.checkoutItems.findIndex(
            (item) => item.selectedModifier?.id === action.payload.selectedModifier?.id
          );
          addOrder(index, state.value.checkoutItems, action.payload);
        } else {
          const index = state.value.checkoutItems.findIndex(
            (item) => item.item.id === action.payload.item.id
          );
          addOrder(index, state.value.checkoutItems, action.payload);
        }
      }
    },
    updateOrderItem: (state, action: PayloadAction<CheckoutItem>) => {
      state.value.checkoutItems.forEach((item, index) => {
        if(item.selectedModifier) {
          if (item.selectedModifier.id === action.payload.selectedModifier?.id) {
            updateOrder(index, item, state.value.checkoutItems, action.payload);
          }
        }
        else if (item.item.id === action.payload.item.id) {
          updateOrder(index, item, state.value.checkoutItems, action.payload);
        }
      });
    },
    setCurrentCheckoutItem: (state, action: PayloadAction<Item>) => {
      state.value.currentItem = action.payload;
    },
    setCurrentCheckoutItemModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.value.currentItemModalVisibility = action.payload;
    },
    clearCheckout: (state) => {
      state.value.checkoutItems = [];
      state.value.currentItem = {} as Item;
      state.value.currentItemModalVisibility = false;
    }
  },
});

export const { addOrderItem, updateOrderItem, setCurrentCheckoutItem, setCurrentCheckoutItemModalVisibility, clearCheckout } = checkout.actions;
export default checkout.reducer;
