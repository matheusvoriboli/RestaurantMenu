import MenuAccordion from "@/components/MenuAccordion";
import { fireEvent } from "@testing-library/react";
import render from "./helpers/ProviderRender";
import { mockItemsData } from "./mocks/mockItemsData";

describe("Menu Accordion", () => {
  test("accordion opens and closes correctly", () => {
    const { getByTestId, queryByText, getByText } = render(
      <MenuAccordion
        currency="R$"
        title="Test Accordion"
        items={mockItemsData}
      />
    );

    fireEvent.click(getByTestId("toggle-accordion")); // Close Accordion
    mockItemsData.forEach((item) => {
      expect(queryByText(item.name)).toBeNull();
    });

    fireEvent.click(getByTestId("toggle-accordion")); // Open Accordion
    mockItemsData.forEach((item) => {
      expect(getByText(item.name)).toBeInTheDocument();
    });
  });
});
