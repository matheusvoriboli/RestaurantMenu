import { getRestaurantDetails } from "@/services/restaurantService";
import { Restaurant } from "@/types/Restaurant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
