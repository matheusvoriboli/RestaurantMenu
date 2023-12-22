const API_URL = "https://98d36ac94d36499f89398905f4d4f609.api.mockbin.io/";

export async function getRestaurantDetails() {
   const res = await fetch(API_URL )
   return res.json()
 }
