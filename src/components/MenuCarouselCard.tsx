import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useTranslation } from 'react-i18next';

type MenuCarouselCardProps = {
  title: string;
  image: string;
  active?: boolean;
  onClick?: () => void;
};

export default function MenuCarouselCard({
  title,
  image,
  active = true,
  onClick,
}: MenuCarouselCardProps) {
  const { t } = useTranslation();
  const response = useAppSelector((state) => state.restaurant.value);

  return (
    <div
      style={
        active
          ? { borderBottom: `2px solid ${response.webSettings?.primaryColour}` }
          : {}
      }
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div style={
        active
          ? { border: `2px solid ${response.webSettings?.primaryColour}` }
          : {}
      } className="rounded-full p-[2px]">
        <div className="relative overflow-hidden rounded-full bg-black h-20 w-20 ">
          <Image
            src={image}
            alt="section-image"
            className="object-cover border border-black"
            fill
            priority
            sizes="100%"
          />
        </div>
      </div>
      <p className="mt-2 mb-4 text-main" style={{fontWeight: active ? 'bold' : 'normal'}}>{t(title)}</p>
    </div>
  );
}
