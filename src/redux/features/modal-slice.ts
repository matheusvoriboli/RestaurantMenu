import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: false as boolean,
};

export const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
      toggleModalVisibility: (state) => {
         state.value = !state.value;
      }
  },
});


export const { toggleModalVisibility } = modal.actions;
export default modal.reducer;
