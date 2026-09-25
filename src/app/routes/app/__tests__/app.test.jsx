import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../../../routes";
import { fetchShopMock } from "../../../../testing/mocks/fetch-shop";
import { describe, expect, it } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Swal from "sweetalert2";
import { swalMockCancel } from "../../../../testing/mocks/swal";

// Routers
const defaultRouter = createMemoryRouter(routes);
const getRouterFromShop = () =>
  createMemoryRouter(routes, {
    initialEntries: ["/shop"],
  });

const renderRouterWithUser = (router) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(<RouterProvider router={router} />),
  };
};

// Mocks
window.fetch = fetchShopMock;
// Cancel the alert as I don't want it to navigate to the shopping cart
Swal.fire = swalMockCancel;

describe("Navigation", () => {
  it("navigates from home to the shop when clicking on the shop link in the navbar", async () => {
    const { user } = renderRouterWithUser(defaultRouter);

    expect(screen.queryByTestId("home")).toBeInTheDocument();

    const shopLink = screen.getByTestId("go-to-shop");
    await user.click(shopLink);

    expect(screen.getByTestId("shop")).toBeInTheDocument();
    expect(screen.queryByTestId("home")).not.toBeInTheDocument();
  });

  it("navigates to the cart page (empty)", async () => {
    const { user } = renderRouterWithUser(defaultRouter);

    const cartLink = screen.getByTestId("go-to-cart");
    await user.click(cartLink);

    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
    expect(screen.queryByTestId("home")).not.toBeInTheDocument();
  });

  it("navigates to the home page (from the shop page)", async () => {
    const { user } = renderRouterWithUser(getRouterFromShop());

    expect(screen.getByTestId("shop")).toBeInTheDocument();
    expect(screen.queryByTestId("home")).not.toBeInTheDocument();

    const homeLink = screen.getByTestId("go-to-home");
    await user.click(homeLink);

    expect(screen.getByTestId("home")).toBeInTheDocument();
    expect(screen.queryByTestId("shop")).not.toBeInTheDocument();
  });

  it("navigates to the not found page on a bad route", async () => {
    const badRoute = createMemoryRouter(routes, { initialEntries: ["/aaaaa"] });
    render(<RouterProvider router={badRoute} />);

    expect(screen.getByTestId("not-found")).toBeInTheDocument();
    expect(screen.queryByTestId("home")).not.toBeInTheDocument();
    expect(screen.queryByTestId("shop")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cart")).not.toBeInTheDocument();
  });
});

describe("Full user interaction", () => {
  it("adds items to the cart", async () => {
    const { user } = renderRouterWithUser(getRouterFromShop());
    const cartLink = screen.getByTestId("go-to-cart");

    await waitForElementToBeRemoved(() => screen.getByTestId("shop-loading"));

    const addToCartBtns = screen.getAllByTestId("add-to-cart");

    expect(cartLink).toHaveTextContent("0");

    await user.click(addToCartBtns[0]);
    expect(cartLink).toHaveTextContent("1");

    await user.click(addToCartBtns[0]);
    expect(cartLink).toHaveTextContent("1");

    await user.click(addToCartBtns[1]);
    expect(cartLink).toHaveTextContent("2");

    await user.click(screen.getByTestId("go-to-cart"));

    const allCartItems = screen.getAllByTestId("cart-item");
    expect(allCartItems.length).toBe(2);

    // The first cart item was added two times
    expect(screen.getAllByTestId("cart-item-quantity")[0].value).toBe("2");
  });

  it("lets you delete items from the cart", async () => {
    const { user } = renderRouterWithUser(getRouterFromShop());
    const cartLink = screen.getByTestId("go-to-cart");

    await waitForElementToBeRemoved(() => screen.getByTestId("shop-loading"));

    const addToCartBtns = screen.getAllByTestId("add-to-cart");

    await user.click(addToCartBtns[0]);
    await user.click(addToCartBtns[1]);
    await user.click(cartLink);

    const allRemoveBtns = screen.getAllByTestId("remove-btn");

    await user.click(allRemoveBtns[0]);
    expect(cartLink).toHaveTextContent("1");
    await user.click(allRemoveBtns[1]);
    expect(cartLink).toHaveTextContent("0");

    expect(() => screen.getByTestId("cart-item")).toThrow();
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
  });

  it("should dynamically change the item and total price when the quantity changes", async () => {
    const { user } = renderRouterWithUser(getRouterFromShop());

    await waitForElementToBeRemoved(() => screen.getByTestId("shop-loading"));

    const addToCartBtns = screen.getAllByTestId("add-to-cart");

    await user.click(addToCartBtns[0]);
    await user.click(addToCartBtns[0]);
    await user.click(screen.getByTestId("go-to-cart"));

    const increaseBtn = screen.getByTestId("increase-quantity-btn");
    const decreaseBtn = screen.getByTestId("decrease-quantity-btn");

    await user.click(increaseBtn);
    expect(screen.getByTestId("product-price")).toHaveTextContent("$0.90");
    // Considering shipping
    expect(screen.getByTestId("total-price")).toHaveTextContent("$8.90");

    await user.click(decreaseBtn);
    expect(screen.getByTestId("product-price")).toHaveTextContent("$0.60");
    expect(screen.getByTestId("total-price")).toHaveTextContent("$8.60");
  });
});
