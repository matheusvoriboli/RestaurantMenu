import { Item, ModifierItem } from "./Menu";

export type CheckoutItem = {
   item: Item;
   quantity: number;
   selectedModifier?: ModifierItem;
   price: number;
}

export type VariantItem = {
   id: string;
   name: string;
   price: number;
   quantity: number;
}