import { useAppSelector } from "@/redux/store";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { createRef, useLayoutEffect, useRef, useState } from "react";
import Input from "./Input";
import MenuAccordion from "./MenuAccordion";
import MenuCarousel from "./MenuCarousel";

export default function MenuContainer() {
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const menuResponse = useAppSelector((state) => state.menu.value);
  const sectionRefs = useRef<{
    [key: string]: React.RefObject<HTMLDivElement>;
  }>({});

  const [intersectingSections, setIntersectingSections] = useState<number[]>(
    []
  );

  useLayoutEffect(() => {
    menuResponse?.sections?.forEach((section) => {
      if (!sectionRefs.current[section.id]) {
        sectionRefs.current[section.id] = createRef();
      }

      const ref = sectionRefs.current[section.id];

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIntersectingSections((prev) => [...prev, section.id]);
          } else {
            setIntersectingSections((prev) =>
              prev.filter((id) => id !== section.id)
            );
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.1,
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    });
  }, [menuResponse?.sections]);

  const lastIntersectingSection =
    intersectingSections.length > 0
      ? intersectingSections[intersectingSections.length - 1]
      : null;

  const handleCarouselCardClick = (sectionId: number) => {
    const ref = sectionRefs.current[sectionId];
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="p-4 gap-8 lg:shadow w-full h-fit"
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
      <MenuCarousel
        className="mt-6 mb-10"
        activeSectionId={
          lastIntersectingSection !== null ? lastIntersectingSection : undefined
        }
        handleCarouselCardClick={handleCarouselCardClick}
      />
      <div className="flex flex-col gap-8">
        {menuResponse?.sections?.map((section) => {
          return (
            <MenuAccordion
              key={section.id}
              title={section.name}
              items={section.items}
              currency={restaurantResponse?.currency}
              ref={sectionRefs.current[section.id]}
            />
          );
        })}
      </div>
    </div>
  );
}
