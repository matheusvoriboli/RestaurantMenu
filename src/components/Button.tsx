import { useAppSelector } from "@/redux/store";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  backgroundColor?: string;
  textColor?: string;
  fullScreen?: boolean;
};

export default function Button({ children, onClick, backgroundColor, textColor = '#FFFFFF', fullScreen = false }: ButtonProps) {
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  if(!backgroundColor) backgroundColor = restaurantResponse.webSettings.primaryColour;
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: textColor}}
      className={`text-white rounded-[40px] py-3 px-3 flex justify-center items-center ${fullScreen && 'w-full'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
