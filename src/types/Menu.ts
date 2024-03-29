type Image = {
   id: number;
   image: string;
 };
 
 export type ModifierItem = {
   id: number;
   name: string;
   price: number;
   maxChoices: number;
   position: number;
   visible: number;
   availabilityType: string;
   qty?: number;
   available: boolean;
 };
 
 export type Modifier = {
   id: number;
   name: string;
   minChoices: number;
   maxChoices: number;
   items: ModifierItem[];
 };
 
 export type Item = {
   id: number;
   name: string;
   description: string;
   alcoholic: number;
   price: number;
   position: number;
   visible: number;
   availabilityType: string;
   sku: string;
   modifiers?: Modifier[];
   images: Image[];
   available: boolean;
 };
 
 export type Section = {
   id: number;
   name: string;
   description: string | null;
   position: number;
   visible: number;
   images: Image[];
   items: Item[];
 };
 
 export type Menu = {
   id: number;
   name: string;
   type: string;
   collapse: number;
   sections: Section[];
 };