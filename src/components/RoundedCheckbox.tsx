import { Check } from "@phosphor-icons/react";
import { useState } from "react";

export default function RoundedCheckbox() {

   const [isActive, setIsActive] = useState(false)
   const toggleCheckbox = () => {
      setIsActive(state => !state);
   }

   return (
      <>
      {isActive ? (
         <div className="border-2 border-inactive rounded-full h-5 w-5 bg-inactive flex justify-center items-center" onClick={toggleCheckbox}>
            <Check color="white" weight="bold" size={12} />
         </div>
         ) : (
         <div className="border-2 border-inactive rounded-full h-5 w-5 bg-transparent" onClick={toggleCheckbox}/>
      )}
      </>
   )
}