'use client';
import { fetchRestaurantDetails } from "@/redux/features/restaurant-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const response = useAppSelector((state) => state.restaurant.value);

  useEffect(() => {
    dispatch(fetchRestaurantDetails());
  }, [dispatch]);

  return (
    <div>
      <h1>{response?.id}</h1>
      <Link href="/Item">Navigate</Link>
    </div>
  )
}
