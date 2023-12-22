'use client';
import { getRestaurantDetails } from "@/services/restaurantService";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    getInitialRestaurantDetails();
  })

  const getInitialRestaurantDetails = async () => {
    const restaurantDetails = await getRestaurantDetails();
    console.log(restaurantDetails);
  };

  return (
    <div>
      <h1>Home</h1>
      <Link href="/Item">Navigate</Link>
    </div>
  )
}
