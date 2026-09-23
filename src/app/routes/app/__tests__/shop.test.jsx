import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Shop from "../shop";

const shopItemsData = [
  { id: 0, title: "product0", price: "1", image: "testImage0" },
  { id: 1, title: "product1", price: "2", image: "testImage1" },
  { id: 2, title: "product2", price: "3", image: "testImage2" },
  { id: 3, title: "product2", price: "4", image: "testImage3" },
];

window.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(shopItemsData),
  }),
);

vi.mock("/src/components/shop/shop-item", () => {
  return {
    default: vi.fn(({ id, title, price, image }) => {
      return (
        <div data-testid={`${id}-${title}-${price}-${image}`}>Shop item</div>
      );
    }),
  };
});

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

  it("all props are properly being passed to the shop items", async () => {
    render(<Shop />);
    await waitForElementToBeRemoved(() => screen.getByTestId("shop-loading"));

    for (let itemData of shopItemsData) {
      const { id, title, price, image } = itemData;
      const shopItem = screen.getByTestId(`${id}-${title}-${price}-${image}`);

      expect(shopItem).toBeInTheDocument();
    }
  });
});
