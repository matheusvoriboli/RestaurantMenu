import { Pages } from "@/utils/Pages";
import { List } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

type MobileHeaderProps = {
  activePage: string;
};

export default function MobileHeader({ activePage }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header className="flex relative items-center justify-center p-5 main-bg">
        <h1 className="text-white">{activePage}</h1>
        <button
          onClick={() => setIsOpen((state) => !state)}
          className="focus:outline-none absolute right-4"
        >
          <List color="white" size={24} />
        </button>
      </header>
      <nav
        className={`side-menu ${isOpen ? "side-menu-open" : ""} bg-white`}
      >
        <div className="flex flex-col w-full">
         {Object.values(Pages).map((page, index) => (
             <Link href={page.path} onClick={() => setIsOpen(false)} className={`flex items-center gap-2 border-b border-inactive-background w-full px-4 py-3 text-main text-lg ${page.name === activePage ? 'bg-inactive-background' : 'bg-white'}`} key={index}>
                <span>{page.name}</span>
             </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
