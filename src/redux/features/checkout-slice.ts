import { Item } from "@/types/Menu";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: [] as Item[],
};

export const checkout = createSlice({
  name: "checkout",
  initialState,
  reducers: {
      addOrderItem: (state, action) => {
          state.value.push(action.payload as Item);
      }
  },
});


export const { addOrderItem } = checkout.actions;
export default checkout.reducer;
