import Basket from "@/components/Basket";
import Input from "@/components/Input";
import MenuContainer from "@/components/MenuContainer";
import { useAppSelector } from "@/redux/store";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";

export default function Menu() {
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const menuResponse = useAppSelector((state) => state.menu.value);
  return (
    <div>
      <div className="relative w-full h-36">
        <Image
          src={restaurantResponse?.webSettings?.bannerImage}
          alt="menu-image"
          fill
          className="object-cover"
          priority
          sizes="100%"
        />
      </div>
      <div className="flex justify-center bg-background-subtle">
        <div className="bg-background-default lg:py-8 lg:px-10 w-full lg:max-w-[1024px]">
          <div className="flex flex-col bg-custom">
            <div className="lg:my-2 lg:block hidden ">
              <Input
                placeholder="Search menu items"
                icon={<MagnifyingGlass className="text-custom-gray" />}
              />
            </div>
            <div className="lg:flex gap-6">
              <MenuContainer />
              <div className="hidden lg:flex">
                <Basket />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
