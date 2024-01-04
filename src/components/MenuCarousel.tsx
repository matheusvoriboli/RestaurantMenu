import { useAppSelector } from "@/redux/store";
import Loader from "./Loader";
import MenuCarouselCard from "./MenuCarouselCard";

type MenuCarouselProps = {
  className?: string;
  activeSectionId: number;
  handleCarouselCardClick: (id: number) => void;
};

export default function MenuCarousel({className, activeSectionId, handleCarouselCardClick}: MenuCarouselProps) {
  const response = useAppSelector((state) => state.menu.value);
  return (
    <div className={className}>
      {Object.keys(response).length === 0 ? (
        <Loader />
      ) : (
        <div className="flex w-full gap-8 overflow-x-auto scrollbar-hide">
          {response.sections.map((section) => (
            <MenuCarouselCard onClick={() => handleCarouselCardClick(section.id)} active={section.id === activeSectionId} title={section.name} image={section.images[0].image} key={section.id}/>
          ))}
        </div>
      )}
    </div>
  );
}
