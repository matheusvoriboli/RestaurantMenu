// import { BookingState } from "@/interfaces/BookingState";
import { getMenuDetails } from "@/services/menuService";
import { Menu } from "@/types/Menu";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Swal from "sweetalert2";

// type InitialState = {
//   value: BookingState[];
// };

// const initialState = {
//   value: [] as BookingState[],
//   value: [] as BookingState[],
// } as InitialState;

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
