import Basket from "@/components/Basket";
import Input from "@/components/Input";
import MenuContainer from "@/components/MenuContainer";
import { useAppSelector } from "@/redux/store";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";

export default function Menu() {
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  // const menuResponse = useAppSelector((state) => state.menu.value);
  return (
    <div className="flex flex-col">
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
      <div className="custom-content-height flex flex-col items-center">
        <div className="lg:w-[1024px] h-full flex flex-col mb-8 w-full">
          <div className="lg:block hidden w-full lg:my-2">
            <Input
              placeholder="Search menu items"
              icon={<MagnifyingGlass className="text-custom-gray" />}
            />
          </div>
          <div className="bg-background-default lg:py-8 lg:px-10 flex gap-6 h-full">
            <MenuContainer />
            <div className="hidden lg:flex">
              <Basket />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:hidden w-full">
          <div className="bg-background-default border-background-subtle border-b-[1px] border-t-[1px] w-full p-6">
            <div className=" bg-white w-full flex justify-center rounded-lg">
              <h1
                style={{
                  color: restaurantResponse?.webSettings?.primaryColour,
                }}
                className="underline font-bold"
              >
                View Allergy Information
              </h1>
            </div>
          </div>
          <div className="bg-background-default p-8"></div>
        </div>
      </div>
    </div>
  );
}
