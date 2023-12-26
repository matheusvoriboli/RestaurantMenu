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
      toggleSelectedItemContainerVisibility: (state) => {
         state.value.isSelectedItemContainerVisible = !state.value.isSelectedItemContainerVisible;
      },
      setCurrentItem: (state, action) => {
          state.value.currentItem = action.payload as Item;
      }
  },
});


export const { toggleSelectedItemContainerVisibility, setCurrentItem } = order.actions;
export default order.reducer;
