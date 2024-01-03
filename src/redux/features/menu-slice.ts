import { getMenuDetails } from "@/services/menuService";
import { Menu } from "@/types/Menu";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMenuDetails = createAsyncThunk(
  "menu/getMenuDetails",
  async () => {
    const response = await getMenuDetails();
    return response;
  }
);

const initialState = {
  value: {} as Menu,
};

export const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(fetchMenuDetails.fulfilled, (state, action) => {
         state.value = action.payload;
      });
  }
});

export default menu.reducer;
