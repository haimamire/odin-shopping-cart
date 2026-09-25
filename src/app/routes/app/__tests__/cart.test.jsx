import { describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Cart from "../cart";
import { useOutletContext } from "react-router";

const cartProductsMock = [
  {
    id: 0,
    quantity: 3,
    title: "test0",
    price: 100,
    image: "https://example.com/0/",
  },
  {
    id: 1,
    quantity: 1,
    title: "test1",
    price: 55.9,
    image: "https://example.com/1/",
  },
  {
    id: 2,
    quantity: 1,
    title: "test2",
    price: 2.01,
    image: "https://example.com/2/",
  },
];

vi.mock("react-router", () => ({
  useOutletContext: vi.fn(() => ({
    cartProducts: cartProductsMock,
    removeCartItem: () => {},
    updateCartItem: () => {},
  })),
  Link: () => <></>,
}));

vi.mock("/src/components/cart/cart-item", () => ({
  default: () => <div></div>,
}));

describe("Shopping cart", () => {
  it("renders the correct amount of products", () => {
    render(<Cart />);

    expect(screen.getByRole("list").children.length).toBe(
      cartProductsMock.length,
    );

    cleanup();

    useOutletContext.mockImplementationOnce(() => ({
      cartProducts: [{ id: 0 }],
    }));
    render(<Cart />);

    expect(screen.getByRole("list").children.length).toBe(1);
  });

  it("renders the empty cart page when no products are added", () => {
    useOutletContext.mockImplementationOnce(() => ({
      cartProducts: [],
    }));

    render(<Cart />);
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();

    cleanup();
    render(<Cart />);
    expect(screen.queryByTestId("empty-cart")).not.toBeInTheDocument();
  });
});

describe("Order summary", () => {
  it("renders the correct price", () => {
    render(<Cart />);
    expect(screen.getByTestId("total-price")).toHaveTextContent("$357.91");
  });

  it("adds the shipping fee to the total price", () => {
    useOutletContext.mockImplementationOnce(() => ({
      cartProducts: [{ ...cartProductsMock[0], quantity: 1, price: 1 }],
    }));

    render(<Cart />);
    expect(screen.getByTestId("total-price")).toHaveTextContent("$9.00");
  });

  it("renders the checkout button", () => {
    render(<Cart />);
    expect(
      screen.getByRole("button", { name: /checkout/i }),
    ).toBeInTheDocument();
  });

  it("renders the correct shipping price", () => {
    render(<Cart />);
    expect(screen.getByTestId("shipping-free")).toBeInTheDocument();

    cleanup();

    useOutletContext.mockImplementationOnce(() => ({
      cartProducts: [{ id: 0, quantity: 1, price: 19 }],
    }));
    render(<Cart />);
    expect(screen.getByTestId("shipping-price")).toBeInTheDocument();
    expect(screen.queryByTestId("shipping-free")).not.toBeInTheDocument();
  });
});
