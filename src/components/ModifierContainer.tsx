import { Modifier } from "@/types/Menu";
import RoundedCheckbox from "./RoundedCheckbox";

type ModifierContainerProps = {
  modifier: Modifier;
};

export default function ModifierContainer({
  modifier,
}: ModifierContainerProps) {
  return (
    <div className="flex flex-col border-background-subtle border-b-[1px] border-t-[1px]">
      <div className="bg-background-default py-4 px-6">
        <h1 className="font-semibold text-secondary">{modifier.name}</h1>
        <span className="text-inactive">
          select {modifier.maxChoices}{" "}
          {modifier.maxChoices > 1 ? "options" : "option"}
        </span>
      </div>
      <ul>
        {modifier.items.map((item) => (
          <li className="py-4 px-6 flex justify-between items-center">
            <div className="flex flex-col">
               <span className="text-main font-semibold">{item.name}</span>
               <span className="text-secondary">{item.price.toFixed(2)}</span>
            </div>
            <RoundedCheckbox />
          </li>
        ))}
      </ul>
    </div>
  );
}
