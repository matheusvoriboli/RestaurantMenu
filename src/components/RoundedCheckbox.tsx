
type RoundedCheckboxProps = {
   checked?: boolean;
   onToggle?: () => void;
}

export default function RoundedCheckbox({checked = false, onToggle}: RoundedCheckboxProps) {
   return (
      <>
      {checked ? (
         <div className="border-8 border-inactive rounded-full h-5 w-5 bg-white flex justify-center items-center" onClick={onToggle}>
         </div>
         ) : (
         <div className="border-2 border-inactive rounded-full h-5 w-5 bg-transparent" onClick={onToggle}/>
      )}
      </>
   )
}