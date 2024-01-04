import { useAppSelector } from "@/redux/store";
import {
  RefObject,
  createRef,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useTranslation } from "react-i18next";
import MenuAccordion from "./MenuAccordion";
import MenuCarousel from "./MenuCarousel";
import SearchMenuItems from "./SearchMenuItems";

export default function MenuContainer() {
  const { t } = useTranslation();
  const restaurantResponse = useAppSelector((state) => state.restaurant.value);
  const menuResponse = useAppSelector((state) => state.menu.value);
  const [intersectingSections, setIntersectingSections] = useState<number[]>(
    []
  ); // Need to create an array of intersecting sections to determine which section is active in the carousel and to know wich one was the last one intersected to scroll to it
  const sectionRefs = useRef<{
    [key: string]: RefObject<HTMLDivElement>;
  }>({});

  useLayoutEffect(() => {
    menuResponse?.sections?.forEach((section) => {
      if (!sectionRefs.current[section.id]) {
        sectionRefs.current[section.id] = createRef();
      }

      const ref = sectionRefs.current[section.id];

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIntersectingSections((state) => [...state, section.id]);
          } else {
            setIntersectingSections((state) =>
              state.filter((id) => id !== section.id)
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
    intersectingSections[intersectingSections.length - 1];

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
      <div className="my-2 block lg:hidden relative">
        <SearchMenuItems />
      </div>
      <MenuCarousel
        className="mt-6 mb-10"
        activeSectionId={lastIntersectingSection}
        handleCarouselCardClick={handleCarouselCardClick}
      />
      <div className="flex flex-col gap-8">
        {menuResponse?.sections?.map((section) => {
          return (
            <MenuAccordion
              key={section.id}
              title={section.name}
              items={section.items}
              currency={t(restaurantResponse?.currency)}
              ref={sectionRefs.current[section.id]}
            />
          );
        })}
      </div>
    </div>
  );
}
