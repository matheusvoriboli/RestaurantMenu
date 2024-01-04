import DesktopHeader from "@/components/DesktopHeader";
import { Pages } from "@/utils/Pages";
import { fireEvent, screen } from "@testing-library/react";
import render from "./helpers/ProviderRender";

describe("Desktop Header", () => {
  test("Can navigate correctly to other pages", () => {
    const activePage = Pages.MENU.name;
    render(<DesktopHeader activePage={activePage} />);
    Object.values(Pages).forEach((page) => {
      if (page.name !== activePage) {
        const linkElement = screen.getByText(page.name);
        fireEvent.click(linkElement);
        expect(linkElement).toHaveAttribute("href", page.path);
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
});
