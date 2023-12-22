// import { BookingState } from "@/interfaces/BookingState";
import { getRestaurantDetails } from "@/services/restaurantService";
import { Restaurant } from "@/types/Restaurant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Swal from "sweetalert2";

// type InitialState = {
//   value: BookingState[];
// };

// const initialState = {
//   value: [] as BookingState[],
//   value: [] as BookingState[],
// } as InitialState;

export const fetchRestaurantDetails = createAsyncThunk(
  "restaurant/getRestaurantDetails",
  async () => {
    const response = await getRestaurantDetails();
    return response;
  }
);

const initialState = {
  value: {} as Restaurant,
};

export const restaurant = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(fetchRestaurantDetails.fulfilled, (state, action) => {
         state.value = action.payload;
      });
  }
});

export default restaurant.reducer;
