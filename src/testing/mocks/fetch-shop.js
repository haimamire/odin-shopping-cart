import { vi } from "vitest";

export const shopItemsData = [
  { id: 0, title: "product0", price: "1", image: "testImage0" },
  { id: 1, title: "product1", price: "2", image: "testImage1" },
  { id: 2, title: "product2", price: "3", image: "testImage2" },
  { id: 3, title: "product2", price: "4", image: "testImage3" },
];

export const fetchShopMock = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(shopItemsData),
  }),
);
