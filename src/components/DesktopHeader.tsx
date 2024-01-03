import { Pages } from "@/utils/Pages";
import Link from "next/link";
import { useTranslation } from "react-i18next";

type DesktopHeaderProps = {
  activePage: string;
};

export default function DesktopHeader({ activePage }: DesktopHeaderProps) {
  const { t } = useTranslation();
  return (
    <header className="header main-bg flex justify-center gap-[6%]">
      {Object.values(Pages).map((page, index) => (
        <div key={index}>
          <Link
            href={page.path}
            className={`${
              activePage === page.name ? "font-bold" : "font-normal"
            }`}
          >
            {t(page.name)}
          </Link>
        </div>
      ))}
    </header>
  );
}
