const API_URL = "https://2486713dae314753ae6b0ff127002d12.api.mockbin.io/"

export async function getMenuDetails() {
   const res = await fetch(API_URL )
   return res.json()
}