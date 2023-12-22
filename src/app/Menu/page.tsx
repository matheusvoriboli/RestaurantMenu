import Input from "@/components/Input";
import { useAppSelector } from "@/redux/store";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";

export default function Menu() {
  const response = useAppSelector((state) => state.restaurant.value);
  return (
    <div>
      <div className="relative w-full h-24">
        <Image
          src={response?.webSettings?.bannerImage}
          alt="menu-image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
         <Input placeholder="Search menu items" icon={<MagnifyingGlass className="text-custom-gray" />} />
      </div>
    </div>
  );
}
