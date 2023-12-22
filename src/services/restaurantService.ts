const API_URL = "https://98d36ac94d36499f89398905f4d4f609.api.mockbin.io/";

// // Getting all products from fake store API
// export const getProducts = async () => {
//   const { data } = await axios.get(`${API_URL}/products`);
//   return data;
// };

export async function getRestaurantDetails() {
   const res = await fetch(API_URL )
   return res.json()
 }

// // Getting all categories from fake store API
// export const getCategories = async () => {
//   const { data } = await axios.get(`${API_URL}/products/categories`);
//   return data;
// };

// // Getting all produts in a specfic category from fake store API
// export const getCategoyProducts = async (categoryName: string) => {
//   const { data } = await axios.get(
//     `${API_URL}/products/category/${categoryName}`
//   );
//   return data;
// };

// // Getting specific product by id
// export const getProduct = async (id: number | string) => {
//   const { data } = await axios.get(`${API_URL}/products/${id}`);
//   return data;
// };