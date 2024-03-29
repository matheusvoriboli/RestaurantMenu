import { ReactNode } from "react";
import { useTranslation } from 'react-i18next';

type InputProps = {
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  id?: string;
  name?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type = "text",
  placeholder,
  icon,
  id,
  name,
  required,
  className,
  value,
  onChange,
}: InputProps) {
  const { t } = useTranslation();
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute top-0 left-0 h-full flex items-center pl-2">
          {icon}
        </div>
      )}
      <input
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder && t(placeholder)}
        className={` border-custom-gray border-[1px] rounded-md w-full p-2 focus:outline-none focus:ring-main focus:border-main ${
          icon && "pl-8"
        } ${className}`}
      />
    </div>
  );
}
