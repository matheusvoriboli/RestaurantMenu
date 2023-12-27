import { useState } from "react";

export default function RoundedCheckbox() {

   const [isActive, setIsActive] = useState(false)
   const toggleCheckbox = () => {
      setIsActive(state => !state);
   }

   return (
      <>
      {isActive ? (
         <div className="border-8 border-inactive rounded-full h-5 w-5 bg-white flex justify-center items-center" onClick={toggleCheckbox}>
         </div>
         ) : (
         <div className="border-2 border-inactive rounded-full h-5 w-5 bg-transparent" onClick={toggleCheckbox}/>
      )}
      </>
   )
}