import { describe, expect, it, vi } from "vitest";
import CartItem from "../cart-item";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const product = {
  id: 0,
  title: "test",
  quantity: 3,
  price: 99.99,
  image: "https://example.com/",
};

const removeItem = vi.fn();
const updateItem = vi.fn();
const props = { product, removeItem, updateItem };

const setup = (jsx) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

describe("Props are properly displayed", () => {
  it("uses the correct url for the product image", () => {
    render(<CartItem {...props} />);
    const image = screen.getByTestId("product-img");

    expect(image.src).toBe(props.product.image);
  });

  it("renders the product name", () => {
    render(<CartItem {...props} />);

    expect(screen.getByText(props.product.title)).toBeInTheDocument();
  });

  it("renders the correct price, the result having only two decimals", () => {
    render(<CartItem {...props} />);

    // 99.99 * 3 normally results in 299.96999999999997 which is not desired behavior
    expect(screen.getByTestId("product-price")).toHaveTextContent(
      new RegExp(299.97),
    );
  });

  it("always renders the price with two decimals", () => {
    const altProduct = { ...product, price: 1, quantity: 2 };
    render(<CartItem product={altProduct} />);

    expect(screen.getByTestId("product-price")).toHaveTextContent("$2.00");
  });

  it("renders the correct initial quantity", () => {
    render(<CartItem {...props} />);

    expect(screen.getByRole("spinbutton").value).toMatch(product.quantity);
  });
});

describe("User interactions", () => {
  it("calls removeItem when the remove button is pressed", async () => {
    const { user } = setup(<CartItem {...props} />);

    await user.click(screen.getByTestId("remove-btn"));
    expect(removeItem).toHaveBeenCalled();
  });

  it("calls updateItem when the quantity is changed", async () => {
    const { user } = setup(<CartItem {...props} />);

    await user.click(screen.getByTestId("increase-quantity-btn"));
    await user.click(screen.getByTestId("decrease-quantity-btn"));
    await user.type(screen.getByTestId("cart-item-quantity"), "1");
    expect(updateItem).toHaveBeenCalledTimes(3);
  });

  it("disables decrease button just when the quantity is 1", () => {
    render(<CartItem {...props} />);

    expect(screen.getByTestId("decrease-quantity-btn")).not.toBeDisabled();

    const justOneProduct = { ...product, quantity: 1 };

    cleanup();
    render(<CartItem product={justOneProduct} />);

    expect(screen.getByTestId("decrease-quantity-btn")).toBeDisabled();
  });
});
