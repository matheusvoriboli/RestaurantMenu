jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: {
    type: "3rdParty",
    init: () => null,
  },
}));

import DesktopHeader from "@/components/DesktopHeader";
import { Pages } from "@/utils/Pages";
import { fireEvent, screen } from "@testing-library/react";
import { LinkProps } from "next/link";
import { format } from 'url';
import render from "./helpers/ProviderRender";

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: React.PropsWithChildren<LinkProps>) => {
    const hrefAsString = typeof href === 'string' ? href : format(href);
    return <a href={hrefAsString}>{children}</a>;
  },
}));

test("Can navigate correctly to other pages", () => {
  const activePage = Pages.MENU.name;
  render(<DesktopHeader activePage={activePage} />);
  Object.values(Pages).forEach((page) => {
    if(page.name !== activePage) {
      const linkElement = screen.getByText(page.name);
      fireEvent.click(linkElement);
      expect(linkElement).toHaveAttribute('href', page.path);
    }
  });
});

test("renders links for all pages", () => {
  const activePage = Pages.MENU.name;

  render(<DesktopHeader activePage={activePage} />);

    Object.values(Pages).forEach((page) => {
      const linkElement = screen.getByText(page.name);
      expect(linkElement).toBeInTheDocument();
    });
});