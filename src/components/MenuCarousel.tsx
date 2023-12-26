import { useAppSelector } from "@/redux/store";
import Loader from "./Loader";
import MenuCarouselCard from "./MenuCarouselCard";

type MenuCarouselProps = {
  className?: string;
};

export default function MenuCarousel({className}: MenuCarouselProps) {
  const response = useAppSelector((state) => state.menu.value);
  return (
    <div className={className}>
      {Object.keys(response).length === 0 ? (
        <Loader />
      ) : (
        <div className="flex w-full gap-12 overflow-x-auto">
          {response.sections.map((section) => (
            <MenuCarouselCard title={section.name} image={section.images[0].image} key={section.id}/>
          ))}
        </div>
      )}
    </div>
  );
}
