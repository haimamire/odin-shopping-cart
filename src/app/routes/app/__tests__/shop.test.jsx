import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Shop from "../shop";
import {
  shopItemsData,
  fetchShopMock,
} from "../../../../testing/mocks/fetch-shop";

window.fetch = fetchShopMock;

vi.mock("/src/components/shop/shop-item", () => ({
  default: () => <div>Shop item</div>,
}));

describe("Error and loading screens", () => {
  it("shows loading screen while fetching", async () => {
    render(<Shop />);

    expect(screen.getByTestId("shop-loading")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId("shop-loading"));
  });

  it("shows an error if the response status is over 400", async () => {
    window.fetch.mockImplementationOnce(() => Promise.resolve({ status: 400 }));

    render(<Shop />);

    const errorElement = await screen.findByTestId("shop-fetching-error");
    expect(errorElement).toBeInTheDocument();
  });

  it("shows the error screen when the fetch fails", async () => {
    window.fetch.mockImplementationOnce(() => {
      throw new Error();
    });

    render(<Shop />);

    const errorElement = await screen.findByTestId("shop-fetching-error");
    expect(errorElement).toBeInTheDocument();
  });
});

describe("Shop items", () => {
  it("should display all the fetched shop items", async () => {
    render(<Shop />);

    const shopItems = await screen.findAllByText(/shop item/i);

    expect(shopItems.length).toBe(shopItemsData.length);
  });
});
