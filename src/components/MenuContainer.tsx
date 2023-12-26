import { useAppSelector } from "@/redux/store";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Input from "./Input";
import MenuAccordion from "./MenuAccordion";
import MenuCarousel from "./MenuCarousel";

export default function MenuContainer() {
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const menuResponse = useAppSelector((state) => state.menu.value);
  return (
    <div
      className="p-4 gap-8 lg:shadow w-full "
      style={{
        backgroundColor: restaurantResponse.webSettings?.backgroundColour,
      }}
    >
      <div className="my-2 block lg:hidden ">
        <Input
          placeholder="Search menu items"
          icon={<MagnifyingGlass className="text-custom-gray" />}
        />
      </div>
      <MenuCarousel className="mt-6 mb-10" />
      <div className="flex flex-col gap-8">
        {menuResponse?.sections?.map((section) => (
          <MenuAccordion
            key={section.id}
            title={section.name}
            items={section.items}
            currency={restaurantResponse?.currency}
          />
        ))}
      </div>
    </div>
  );
}
