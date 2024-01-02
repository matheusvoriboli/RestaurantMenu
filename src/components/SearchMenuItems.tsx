import { toggleModalVisibility } from "@/redux/features/modal-slice";
import { setCurrentItem } from "@/redux/features/order-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Item } from "@/types/Menu";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";
import Input from "./Input";

type SearchItemsResult = {
  sectionName: string;
  sectionId: number;
  items: Item[];
};

export default function SearchMenuItems() {
  const [inputValue, setInputValue] = useState<string>("");
  const menuResponse = useAppSelector((state) => state.menu.value);
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const dispatch = useDispatch<AppDispatch>();
  const [searchItemsResult, setSearchItemsResult] = useState<
    SearchItemsResult[]
  >([]);

  const searchMenuItems = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setInputValue(searchValue);
    var newSearchItems = [] as SearchItemsResult[];
    if (searchValue !== "") {
      menuResponse?.sections?.forEach((section) => {
        if (!section.items) return;
        else {
          section.items.forEach((item) => {
            if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
              const existingSection = newSearchItems.find(
                (searchItem) => searchItem.sectionId === section.id
              );
              if (existingSection) {
                existingSection.items.push(item);
              } else {
                newSearchItems.push({
                  sectionName: section.name,
                  sectionId: section.id,
                  items: [item],
                });
              }
            }
          });
        }
      });
    }
    setSearchItemsResult(newSearchItems);
  };

  const clearInput = () => {
    const event = {
      target: {
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>;
    setInputValue("");
    searchMenuItems(event);
  };

  return (
    <div className="relative">
      <div className="flex gap-3">
        <Input
          placeholder="Search menu items"
          icon={<MagnifyingGlass className="text-custom-gray" />}
          onChange={searchMenuItems}
          value={inputValue}
        />
        {inputValue?.length > 0 && (
          <Button
            backgroundColor="transparent"
            textColor="#121212"
            className="w-fit"
            onClick={clearInput}
            icon={<X weight="bold" color="#121212"/>}
          >
            Clear
          </Button>
        )}
      </div>
      {searchItemsResult?.length > 0 && (
        <div className="bg-background-subtle left-0 w-full z-10 mt-2 px-2 absolute max-h-96 overflow-y-auto rounded-lg shadow-lg">
          {searchItemsResult?.map((section, index) => {
            return (
              <div
                key={section.sectionId}
                className={`${
                  index !== 0 && "border-t border-inactive-background mt-2"
                }`}
              >
                <div className="p-3 flex w-full items-center font-semibold">
                  <h1>{section.sectionName}</h1>
                </div>
                {section.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between p-3 border-t border-inactive-background w-full"
                    onClick={() => {
                      dispatch(toggleModalVisibility());
                      dispatch(setCurrentItem(item));
                    }}
                  >
                    <div>
                      <h1>{item.name}</h1>
                      <h1>
                        {restaurantResponse.currency} {item.price.toFixed(2)}
                      </h1>
                    </div>
                    <div className="relative overflow-hidden rounded h-12 w-28 ">
                      {item?.images?.length > 0 && (
                        <Image
                          src={item?.images[0]?.image}
                          alt="section-image"
                          className="object-cover border border-black"
                          fill
                          priority
                          sizes="100%"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
