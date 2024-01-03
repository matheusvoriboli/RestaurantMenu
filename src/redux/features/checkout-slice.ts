import { CheckoutItem } from "@/types/Checkout";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [] as CheckoutItem[],
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
  initialState,
  reducers: {
    addOrderItem: (state, action: PayloadAction<CheckoutItem>) => {
      if (state.value.length === 0) {
        state.value.push(action.payload as CheckoutItem);
      } else {
        if(action.payload.selectedModifier) {
          const index = state.value.findIndex(
            (item) => item.selectedModifier?.id === action.payload.selectedModifier?.id
          );
          addOrder(index, state.value, action.payload);
        } else {
          const index = state.value.findIndex(
            (item) => item.item.id === action.payload.item.id
          );
          addOrder(index, state.value, action.payload);
        }
      }
    },
    updateOrderItem: (state, action: PayloadAction<CheckoutItem>) => {
      state.value.forEach((item, index) => {
        if(item.selectedModifier) {
          if (item.selectedModifier.id === action.payload.selectedModifier?.id) {
            updateOrder(index, item, state.value, action.payload);
          }
        }
        else if (item.item.id === action.payload.item.id) {
          updateOrder(index, item, state.value, action.payload);
        }
      });
    },
  },
});

export const { addOrderItem, updateOrderItem } = checkout.actions;
export default checkout.reducer;
