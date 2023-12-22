"use client";
import Menu from "./Menu/page";

export default function App({ children }: { children: React.ReactNode }) {
  // const dispatch = useDispatch<AppDispatch>();
  // const response = useAppSelector((state) => state.restaurant.value);

  // useEffect(() => {
  //   dispatch(fetchRestaurantDetails());
  // }, [dispatch]);

  return <Menu />;
}
