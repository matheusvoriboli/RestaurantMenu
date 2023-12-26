import { ReactNode } from "react";

type InputProps = {
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
};

export default function Input({
  type = "text",
  placeholder,
  icon
}: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute top-0 left-0 h-full flex items-center pl-2">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={` border-custom-gray border-[1px] rounded-md w-full p-2 ${icon && "pl-8"}`}
      />
    </div>
  );
}
