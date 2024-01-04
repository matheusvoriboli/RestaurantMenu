import { Item } from "@/types/Menu";
import { Order } from "@/types/Order";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: {} as Order,
};

export const order = createSlice({
  name: "order",
  initialState,
  reducers: {
      setCurrentItem: (state, action) => {
          state.value.currentItem = action.payload as Item;
      },
      showSelectedItemModal: (state) => {
          state.value.selectedItemModalVisibility = true;
      }
  },
});


export const { setCurrentItem } = order.actions;
export default order.reducer;
